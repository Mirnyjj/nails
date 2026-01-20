"use client";

import { motion } from "framer-motion";
import { Clock, Sparkles, Zap } from "lucide-react";
import type { Service } from "@/lib/types";
import Link from "next/link";

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  const popularIndices = [1, 3, 5];

  return (
    <section
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-white/90 text-sm tracking-wider uppercase font-medium">
              Услуги и цены
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              ПРАЙС-ЛИСТ
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Все процедуры выполняются с использованием премиум материалов в
            комфортной атмосфере
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isPopular = popularIndices.includes(index);
            const gradientClasses = [
              "from-purple-500/20 to-pink-500/20",
              "from-pink-500/20 to-orange-500/20",
              "from-orange-500/20 to-purple-500/20",
            ];
            const gradient = gradientClasses[index % gradientClasses.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div
                  className={`relative bg-gradient-to-br ${gradient} backdrop-blur-xl rounded-3xl p-6 border ${
                    isPopular
                      ? "border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]"
                      : "border-white/10"
                  } hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:-translate-y-2`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full text-white text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Zap className="w-4 h-4 fill-current" />
                      ХИТ
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center text-white/60 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {service.duration_hours}{" "}
                      {service.duration_hours === 1 ? "час" : "часа"}
                    </div>
                    <div className="text-3xl font-black bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                      {service.price}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/70 text-lg mb-8">
            💝 При первом посещении скидка 10% на все услуги
          </p>
          <Link
            href="#contact"
            className="inline-block px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-lg rounded-full font-bold hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-300 hover:scale-105"
          >
            Записаться сейчас
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
