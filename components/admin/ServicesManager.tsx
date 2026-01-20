"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/database.types";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

type Service = Database["public"]["Tables"]["services"]["Row"];

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration_hours: 1.5,
    image_url: "",
    order: 0,
    is_active: true,
  });
  const supabase = createClient();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .insert([formData] as unknown as never)
        .select()
        .single();

      if (error) throw error;
      setServices([...services, data]);
      setIsCreating(false);
      resetForm();
    } catch (error) {
      console.error("Error creating service:", error);
      alert("Ошибка при создании услуги");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const { error } = await supabase
        .from("services")
        .update(formData as unknown as never)
        .eq("id", id);

      if (error) throw error;
      setServices(
        services.map((s) => (s.id === id ? { ...s, ...formData } : s)),
      );
      setEditingId(null);
      resetForm();
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Ошибка при обновлении услуги");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить эту услугу?")) return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      setServices(services.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Ошибка при удалении услуги");
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration_hours: service.duration_hours,
      image_url: service.image_url || "",
      order: service.order,
      is_active: service.is_active,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      duration_hours: 1.5,
      image_url: "",
      order: 0,
      is_active: true,
    });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10">
        <p className="text-white/70">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 lg:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          Управление услугами
        </h2>
        <button
          onClick={() => {
            setIsCreating(true);
            resetForm();
          }}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          Добавить услугу
        </button>
      </div>

      {isCreating && (
        <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
            Новая услуга
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Название"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 text-base sm:text-lg w-full focus:outline-none focus:border-pink-500/50 transition-all"
            />
            <input
              type="text"
              placeholder="Цена (например: 180 ₪)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 text-base sm:text-lg w-full focus:outline-none focus:border-pink-500/50 transition-all"
            />
            <textarea
              placeholder="Описание"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 text-base sm:text-lg w-full sm:col-span-2 focus:outline-none focus:border-pink-500/50 transition-all resize-none"
              rows={3}
            />
            <input
              type="number"
              step="0.5"
              placeholder="Длительность (часы)"
              value={formData.duration_hours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration_hours: parseFloat(e.target.value),
                })
              }
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 text-base sm:text-lg w-full focus:outline-none focus:border-pink-500/50 transition-all"
            />
            <input
              type="number"
              placeholder="Порядок"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
              className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 text-base sm:text-lg w-full focus:outline-none focus:border-pink-500/50 transition-all"
            />
            <label className="flex items-center gap-2 text-base sm:text-lg text-white col-span-1 sm:col-span-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="w-4 h-4 rounded border-white/30 bg-white/10 focus:ring-pink-500 text-pink-500"
              />
              Активна
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 border-t border-white/10">
            <button
              onClick={handleCreate}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 font-medium flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto transition-all"
            >
              <Save className="w-4 h-4 flex-shrink-0" />
              Сохранить
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                resetForm();
              }}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white font-medium flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto transition-all"
            >
              <X className="w-4 h-4 flex-shrink-0" />
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
          >
            {editingId === service.id ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white text-base sm:text-lg w-full focus:outline-none focus:border-pink-500/50 transition-all"
                />
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white text-base sm:text-lg w-full focus:outline-none focus:border-pink-500/50 transition-all"
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white text-base sm:text-lg w-full sm:col-span-2 focus:outline-none focus:border-pink-500/50 transition-all resize-none"
                  rows={2}
                />
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10 sm:col-span-2">
                  <button
                    onClick={() => handleUpdate(service.id)}
                    className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 font-medium flex items-center justify-center gap-2 text-sm sm:text-base transition-all"
                  >
                    <Save className="w-4 h-4 flex-shrink-0" />
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      resetForm();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white font-medium flex items-center justify-center gap-2 text-sm sm:text-base transition-all"
                  >
                    <X className="w-4 h-4 flex-shrink-0" />
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                      {service.title}
                    </h3>
                    {!service.is_active && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs sm:text-sm rounded-full whitespace-nowrap">
                        Неактивна
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-white/60">
                    <span className="bg-black/20 px-2 py-1 rounded-md">
                      Цена: {service.price}
                    </span>
                    <span className="bg-black/20 px-2 py-1 rounded-md">
                      Длительность: {service.duration_hours} ч
                    </span>
                    <span className="bg-black/20 px-2 py-1 rounded-md">
                      Порядок: {service.order}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-0">
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all flex-shrink-0"
                    title="Редактировать"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 sm:p-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all flex-shrink-0"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
