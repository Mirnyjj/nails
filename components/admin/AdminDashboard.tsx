"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Settings,
  Package,
  Image as ImageIcon,
  LogOut,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { ServicesManager } from "./ServicesManager";
import ImagesManager from "./ImageManager";
import { SettingsManager } from "./SettingsManager";

export function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<
    "overview" | "services" | "images" | "settings"
  >("overview");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Админ-панель
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Просмотр сайта
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "overview"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            Обзор
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "services"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Услуги
            </div>
          </button>
          <button
            onClick={() => setActiveTab("images")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "images"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Изображения
            </div>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "settings"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </div>
          </button>
        </div>

        <div>
          {activeTab === "overview" && (
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">
                Добро пожаловать!
              </h2>
              <p className="text-white/70 mb-6">
                Используйте вкладки выше для управления контентом сайта.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Package className="w-8 h-8 text-pink-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Услуги</h3>
                  <p className="text-white/70 text-sm">
                    Управление услугами и ценами
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <ImageIcon className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Изображения
                  </h3>
                  <p className="text-white/70 text-sm">
                    Управление галереей и изображениями
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Settings className="w-8 h-8 text-orange-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Настройки
                  </h3>
                  <p className="text-white/70 text-sm">
                    Настройки сайта и фона
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div>
              <ServicesManager />
            </div>
          )}

          {activeTab === "images" && (
            <div>
              <ImagesManager />
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <SettingsManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
