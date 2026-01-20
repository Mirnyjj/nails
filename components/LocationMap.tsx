"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function LocationMap() {
  return (
    <section
      id="location"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.4)]"
            >
              <MapPin className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              КАК ДОБРАТЬСЯ
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Найдите мою студию на карте и постройте удобный маршрут
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>

          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-3 sm:p-6 border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.2)] overflow-hidden">
            <div className="relative w-full h-[70vh] sm:h-[60vh] lg:aspect-video rounded-2xl overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A71a83378fa628a8a543bc675771dbcb075520157480b2e2531e5b0c5e5e4afda&source=constructor"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                title="Карта расположения студии"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 text-center"
        >
          <p className="text-white/60 text-sm sm:text-base px-4">
            Точный адрес и подробные инструкции отправлю после подтверждения
            записи
          </p>
        </motion.div>
      </div>
    </section>
  );
}
