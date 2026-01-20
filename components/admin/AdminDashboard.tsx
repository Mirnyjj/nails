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
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Админ-панель
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/"
                target="_blank"
                className="px-3 py-2 sm:px-4 sm:py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Просмотр сайта</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent gap-2 sm:gap-4 -mx-4 sm:-mx-0 px-4 sm:px-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-shrink-0 px-3 py-3 sm:px-6 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            Обзор
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-shrink-0 px-3 py-3 sm:px-6 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "services"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Услуги</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("images")}
            className={`flex-shrink-0 px-3 py-3 sm:px-6 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "images"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Изображения</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-shrink-0 px-3 py-3 sm:px-6 sm:py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "settings"
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Настройки</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Добро пожаловать!
              </h2>
              <p className="text-white/70 mb-6 text-sm sm:text-base">
                Используйте вкладки выше для управления контентом сайта.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                  <Package className="w-8 h-8 text-pink-400 mb-3 mx-auto sm:mx-0" />
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 text-center sm:text-left">
                    Услуги
                  </h3>
                  <p className="text-white/70 text-sm text-center sm:text-left">
                    Управление услугами и ценами
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                  <ImageIcon className="w-8 h-8 text-purple-400 mb-3 mx-auto sm:mx-0" />
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 text-center sm:text-left">
                    Изображения
                  </h3>
                  <p className="text-white/70 text-sm text-center sm:text-left">
                    Управление галереей и изображениями
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                  <Settings className="w-8 h-8 text-orange-400 mb-3 mx-auto sm:mx-0" />
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 text-center sm:text-left">
                    Настройки
                  </h3>
                  <p className="text-white/70 text-sm text-center sm:text-left">
                    Настройки сайта и фона
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && <ServicesManager />}
          {activeTab === "images" && <ImagesManager />}
          {activeTab === "settings" && <SettingsManager />}
        </div>
      </div>
    </div>
  );
}
