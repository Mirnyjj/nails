"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "./ImageWithFallback";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import type { Image } from "@/lib/types";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface PortfolioProps {
  images: Image[];
}

export function Portfolio({ images }: PortfolioProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const getSectionRu = (section: string): string => {
    const sections: Record<string, string> = {
      hero: "Эксклюзив",
      services: "Услуги",
      gallery: "Галерея",
      portfolio: "Портфолио",
      general: "Общее",
    };
    return sections[section] || section;
  };

  const portfolioImages =
    images.length > 0
      ? images.map((img) => ({
          ...img,
          sectionRu: getSectionRu(img.section),
        }))
      : [
          {
            id: "1",
            alt_text: "Дизайн nail-арт",
            image_url:
              "https://images.unsplash.com/photo-1737214475335-8ed64d91f473?w=1080",
            section: "portfolio",
            sectionRu: "Портфолио",
            order: 1,
            created_at: "",
            updated_at: "",
          },
        ];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? portfolioImages.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === portfolioImages.length - 1 ? 0 : prev + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = portfolioImages[currentIndex];

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
    preventScrollOnSwipe: true,
    swipeDuration: 500,
  });

  const popularIndices = [1, 3, 5];

  return (
    <section
      id="portfolio"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          y: [0, 15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-24 w-48 h-48 bg-gradient-to-br from-purple-500/5 to-orange-500/5 rounded-full blur-2xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 lg:mb-28"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6 mx-auto max-w-max">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-white/90 text-sm tracking-wider uppercase font-medium">
              Галерея работ
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
              ПОРТФОЛИО
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Лучшие работы с использованием премиум материалов
          </p>
        </motion.div>

        <div {...handlers} className="relative mb-20 lg:mb-28">
          <motion.div
            key={currentImage?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-5xl lg:max-w-6xl cursor-pointer group"
            onClick={() => setSelectedImage(currentImage)}
          >
            <div
              className={`relative w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl ${
                popularIndices.includes(currentIndex)
                  ? "border-2 border-pink-500/50 shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)]"
                  : "border border-white/10 hover:border-pink-400/50"
              } transition-all duration-500 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-xl`}
            >
              <ImageWithFallback
                src={currentImage?.image_url || ""}
                alt={currentImage?.alt_text || ""}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />

              <div className="absolute top-8 right-8 z-20 bg-gradient-to-r from-white/95 to-slate-100/95 backdrop-blur-2xl border border-white/50 rounded-2xl px-5 py-3 shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105">
                <span className="text-xs lg:text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <Crown className="w-4 h-4 lg:w-5 lg:h-5 text-pink-500 fill-current" />
                  {currentImage?.sectionRu}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-600" />

              <div className="absolute bottom-12 left-8 right-8 z-10 pointer-events-none">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-tight drop-shadow-3xl mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {currentImage?.alt_text}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
              </div>
            </div>
          </motion.div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-8 lg:-left-16 flex -translate-x-full lg:translate-x-0 z-30 pointer-events-auto">
            <motion.button
              onClick={goToPrevious}
              className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/20 hover:border-pink-400/60 rounded-3xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 shadow-2xl hover:shadow-pink-500/30 transition-all duration-400 hover:scale-110 hover:rotate-180"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-16 flex translate-x-full lg:translate-x-0 z-30 pointer-events-auto">
            <motion.button
              onClick={goToNext}
              className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/20 hover:border-pink-400/60 rounded-3xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 shadow-2xl hover:shadow-pink-500/30 transition-all duration-400 hover:scale-110 hover:rotate-180"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />
            </motion.button>
          </div>

          <div className="absolute bottom-[-60px] sm:bottom-[-70px] lg:bottom-[-80px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
            {portfolioImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-400 shadow-md sm:shadow-lg ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] scale-110 border border-white/50 w-10 h-10 sm:w-12 sm:h-12"
                    : popularIndices.includes(index)
                      ? "bg-gradient-to-r from-pink-400/60 to-orange-400/60 border border-pink-500/50 hover:shadow-pink-500/30 w-8 h-8 sm:w-10 sm:h-10"
                      : "bg-white/30 border border-white/40 hover:bg-white/50 hover:shadow-white/20 w-7 h-7 sm:w-9 sm:h-9"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
              >
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-lg sm:rounded-xl blur-[2px] animate-ping" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                className="absolute top-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/30 hover:border-pink-400/60 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 shadow-2xl hover:shadow-pink-400/30 transition-all duration-300 hover:scale-110 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="w-7 h-7" />
              </motion.button>

              <motion.div
                layoutId={`modal-${selectedImage.id}`}
                initial={{ scale: 0.85, rotate: -3 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.85, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="relative max-w-[95vw] max-h-[90vh] w-full h-fit flex flex-col lg:flex-row items-center gap-6 lg:gap-10 p-6 lg:p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 shadow-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full lg:w-1/2 lg:max-w-md h-[50vh] sm:h-[60vh] lg:h-[65vh] relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                  <ImageWithFallback
                    src={selectedImage.image_url}
                    alt={selectedImage.alt_text}
                    fill
                    className="object-contain w-full h-full"
                  />

                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-white/95 to-white/80 backdrop-blur-xl border border-white/60 rounded-xl px-4 py-2 shadow-2xl">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-pink-500 fill-current" />
                      {getSectionRu(selectedImage.section)}
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left text-white space-y-4 lg:space-y-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight bg-gradient-to-r from-white via-pink-200 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
                    {selectedImage.alt_text}
                  </h2>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-gradient-to-br from-white/5 via-white/2 to-black/50 backdrop-blur-3xl rounded-3xl p-12 lg:p-16 border border-white/10 shadow-2xl hover:shadow-[0_0_50px_rgba(236,72,153,0.3)] transition-all duration-500 hover:scale-105">
            <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center border-2 border-blue-500/40 backdrop-blur-xl shadow-xl">
              <Send className="w-10 h-10 lg:w-12 lg:h-12 text-blue-400 drop-shadow-lg" />
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-pink-200 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
              Больше работ в Telegram
            </h3>
            <p className="text-xl md:text-2xl text-white/85 mb-10 lg:mb-12 max-w-xl mx-auto leading-relaxed">
              Новые работы, тренды и эксклюзивные предложения
            </p>
            <a
              href="https://t.me/avdeevanailssmr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 lg:px-16 py-6 lg:py-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 text-white rounded-3xl font-bold text-xl lg:text-2xl shadow-2xl hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-purple-500/50 hover:border-pink-400/70"
            >
              <Send className="w-6 h-6 lg:w-7 lg:h-7" />
              <span>Открыть канал</span>
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
