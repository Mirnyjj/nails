"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Plus, Image as ImageIcon, Upload } from "lucide-react";
import { Database } from "@/lib/supabase/database.types";
import Image from "next/image";

type ImageRow = Database["public"]["Tables"]["images"]["Row"];

type NewImageState = {
  alt_text: string;
  section: string;
};

export default function ImagesManager() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState<NewImageState>({
    alt_text: "",
    section: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const loadImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("order", { ascending: true });

    if (!error) setImages(data ?? []);
    else console.error(error);
    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const uploadImage = async (file: File) => {
    if (!file || !newImage.alt_text || !newImage.section) {
      alert("Заполните alt текст, секцию и выберите файл");
      return null;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Поддерживаются только JPG и GIF");
      return null;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `gallery/${newImage.section}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      const maxOrder = images.reduce(
        (max, img) => Math.max(max, img.order ?? 0),
        -1,
      );

      const { error: insertError } = await supabase.from("images").insert({
        alt_text: newImage.alt_text,
        image_url: publicUrlData.publicUrl,
        section: newImage.section,
        order: maxOrder + 1,
      } as unknown as never);

      if (insertError) throw insertError;

      setNewImage({ alt_text: "", section: "" });
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      loadImages();
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Ошибка при загрузке изображения");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (image: ImageRow) => {
    if (!confirm("Удалить изображение?")) return;

    try {
      const fileName = image.image_url.split("/").pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from("images")
          .remove([fileName]);

        if (storageError) {
          console.warn("Не удалось удалить из Storage:", storageError);
        }
      }

      const { error: dbError } = await supabase
        .from("images")
        .delete()
        .eq("id", image.id);

      if (dbError) throw dbError;

      loadImages();
      alert("Изображение удалено");
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Ошибка при удалении изображения");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const createImage = async () => {
    if (fileInputRef.current?.files?.[0]) {
      await uploadImage(fileInputRef.current.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 flex items-center justify-center h-64">
        <div className="text-white/70">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <ImageIcon className="w-7 h-7" />
          Изображения ({images.length})
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-3 bg-white/5 p-4 rounded-2xl">
            <input
              placeholder="Alt текст"
              value={newImage.alt_text}
              onChange={(e) =>
                setNewImage({ ...newImage, alt_text: e.target.value })
              }
              className="px-4 py-2 bg-white/10 rounded-xl text-white w-full sm:w-48"
            />

            <select
              value={newImage.section}
              onChange={(e) =>
                setNewImage({ ...newImage, section: e.target.value })
              }
              className="px-4 py-2 bg-white/10 rounded-xl text-gray-500 w-full sm:w-48"
            >
              <option value="">Секция</option>
              <option value="hero">Эксклюзив</option>
              <option value="services">Услуги</option>
              <option value="gallery">Галерея</option>
              <option value="general">Общее</option>
            </select>

            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/gif"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <Upload className="w-4 h-4" />
                Выбрать файл
              </label>

              <button
                onClick={createImage}
                disabled={uploading || !newImage.alt_text || !newImage.section}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                {uploading ? "Загрузка..." : "Добавить"}
              </button>
            </div>
          </div>

          {previewUrl && (
            <div className="flex items-center gap-3">
              <Image
                src={previewUrl}
                alt="Предпросмотр"
                className="w-16 h-16 object-cover rounded-xl border-2 border-white/20"
              />
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-red-400 hover:text-red-300 p-1 -m-1 rounded-full hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white/5 hover:bg-white/10 rounded-2xl p-6 flex gap-4 transition-all"
          >
            <Image
              src={image.image_url}
              alt={image.alt_text}
              className="w-24 h-24 object-cover rounded-xl border-2 border-white/20"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
              }}
            />

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold truncate pr-2">
                {image.alt_text}
              </h3>
              <p className="text-white/60 text-sm truncate">{image.section}</p>
              <p className="text-xs text-white/40 mt-1">
                #{String(image.order ?? 0).padStart(2, "0")}
              </p>
            </div>

            <button
              onClick={() => deleteImage(image)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all"
              title="Удалить"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
