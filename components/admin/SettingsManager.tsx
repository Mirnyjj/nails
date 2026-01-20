"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Upload, Trash2 } from "lucide-react";
import { Database } from "@/lib/supabase/database.types";
import NextImage from "next/image";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export function SettingsManager() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    hero_title: "",
    hero_subtitle: "",
    background_image_url: "",
  });

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();

      img.onload = () => {
        const maxWidth = 1920;
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                new File([blob], `background-${Date.now()}.jpg`, {
                  type: "image/jpeg",
                }),
              );
            } else {
              reject(new Error("Не удалось сжать изображение"));
            }
          },
          "image/jpeg",
          0.9,
        );
      };

      img.onerror = () => reject(new Error("Ошибка загрузки изображения"));
      img.src = URL.createObjectURL(file);
    });
  };

  const loadSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Ошибка загрузки настроек:", error);
      setLoading(false);
      return;
    }

    const settingsData = data as SiteSettings | null;
    if (settingsData) {
      setSettings(settingsData);
      setFormData({
        hero_title: settingsData.hero_title,
        hero_subtitle: settingsData.hero_subtitle,
        background_image_url: settingsData.background_gif_url ?? "",
      });
      if (settingsData.background_gif_url) {
        setImagePreview(settingsData.background_gif_url);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const uploadBackgroundImage = async (file: File) => {
    if (!settings?.id || !file) {
      alert("Настройки не загружены или файл не выбран");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Выберите JPG, PNG или WebP изображение");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      alert(`Файл слишком большой: ${sizeMB}MB (макс. 10MB)`);
      return;
    }

    setUploadingImage(true);
    setFileSizeError(null);

    try {
      console.log(`Оригинал: ${(file.size / 1024 / 1024).toFixed(1)}MB`);

      const compressedFile = await compressImage(file);
      console.log(`Сжато: ${(compressedFile.size / 1024 / 1024).toFixed(1)}MB`);

      const fileName = `backgrounds/hero-${Date.now()}-${crypto.randomUUID()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, compressedFile, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      const { error: updateError, data: updatedSettings } = await supabase
        .from("site_settings")
        .update({
          background_gif_url: publicUrlData.publicUrl,
          updated_at: new Date().toISOString(),
        } as unknown as never)
        .eq("id", settings.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setSettings(updatedSettings);
      setFormData((prev) => ({
        ...prev,
        background_image_url: publicUrlData.publicUrl,
      }));
      setImagePreview(publicUrlData.publicUrl);

      alert("✅ Фон успешно загружен!");
      return publicUrlData.publicUrl;
    } catch (error: any) {
      console.error("Ошибка загрузки:", error);
      alert(`Ошибка: ${error.message}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const deleteBackgroundImage = async () => {
    if (!settings?.id || !confirm("Удалить фоновое изображение?")) return;

    try {
      const fileName = formData.background_image_url.split("/").pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from("images")
          .remove([fileName]);
        if (storageError) console.warn("Storage delete error:", storageError);
      }

      const { error: dbError, data: updatedSettings } = await supabase
        .from("site_settings")
        .update({
          background_gif_url: null,
          updated_at: new Date().toISOString(),
        } as unknown as never)
        .eq("id", settings.id)
        .select()
        .single();

      if (dbError) throw dbError;

      setSettings(updatedSettings);
      setFormData((prev) => ({ ...prev, background_image_url: "" }));
      setImagePreview(null);

      alert("✅ Фон удален");
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Ошибка при удалении");
    }
  };

  const updateSettings = async () => {
    if (!settings?.id) {
      alert("Настройки не загружены");
      return;
    }

    setSaving(true);
    const { data, error } = await supabase
      .from("site_settings")
      .update({
        hero_title: formData.hero_title,
        hero_subtitle: formData.hero_subtitle,
        background_gif_url: formData.background_image_url || null,
        updated_at: new Date().toISOString(),
      } as unknown as never)
      .eq("id", settings.id)
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Ошибка сохранения");
      setSaving(false);
      return;
    }

    setSettings(data);
    alert("✅ Настройки сохранены!");
    setSaving(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileSizeError(null);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(
          `Файл слишком большой: ${(file.size / 1024 / 1024).toFixed(1)}MB`,
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (fileInputRef.current?.files?.[0]) {
      await uploadBackgroundImage(fileInputRef.current.files[0]);
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
        <h2 className="text-2xl font-bold text-white">Настройки сайта</h2>
        <button
          onClick={updateSettings}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Заголовок баннера
            </label>
            <input
              type="text"
              value={formData.hero_title}
              onChange={(e) =>
                setFormData({ ...formData, hero_title: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-base sm:text-lg placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors"
              placeholder="Введите заголовок"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Подзаголовок баннера
            </label>
            <textarea
              value={formData.hero_subtitle}
              onChange={(e) =>
                setFormData({ ...formData, hero_subtitle: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-base sm:text-lg placeholder-white/50 focus:outline-none focus:border-pink-500 transition-colors resize-none"
              placeholder="Введите подзаголовок"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-4">
              Фоновое изображение (JPG/PNG, макс. 10MB)
            </label>

            {fileSizeError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-xl mb-4">
                {fileSizeError}
              </div>
            )}

            <div className="flex flex-col gap-3 mb-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <Upload className="w-4 h-4" />
                {uploadingImage ? "Загрузка..." : "Выбрать изображение"}
              </label>

              <button
                onClick={handleImageUpload}
                disabled={uploadingImage || !fileInputRef.current?.files?.[0]}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                {uploadingImage ? "Загружаем..." : "Загрузить"}
              </button>
            </div>

            {(imagePreview || formData.background_image_url) && (
              <div className="relative max-w-sm mx-auto">
                <div className="relative w-full h-32 rounded-xl border-2 border-white/20 overflow-hidden">
                  <NextImage
                    src={imagePreview || formData.background_image_url!}
                    alt="Фон"
                    fill
                    className="object-cover"
                  />
                </div>
                {formData.background_image_url && (
                  <button
                    onClick={deleteBackgroundImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
