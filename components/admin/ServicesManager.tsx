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
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Управление услугами</h2>
        <button
          onClick={() => {
            setIsCreating(true);
            resetForm();
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Добавить услугу
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Новая услуга</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Название"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40"
            />
            <input
              type="text"
              placeholder="Цена (например: 180 ₪)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40"
            />
            <textarea
              placeholder="Описание"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 md:col-span-2"
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
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40"
            />
            <input
              type="number"
              placeholder="Порядок"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40"
            />
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="rounded"
              />
              Активна
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                resetForm();
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white font-medium flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            {editingId === service.id ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                />
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white md:col-span-2"
                  rows={2}
                />
                <div className="flex gap-2 md:col-span-2">
                  <button
                    onClick={() => handleUpdate(service.id)}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white font-medium flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                    {!service.is_active && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                        Неактивна
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 mb-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>Цена: {service.price}</span>
                    <span>Длительность: {service.duration_hours} ч</span>
                    <span>Порядок: {service.order}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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
