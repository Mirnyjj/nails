"use client";

import { motion } from "framer-motion";
import { Sparkles, Send, ArrowDown } from "lucide-react";
import Link from "next/link";

interface HeroClientProps {
  heroTitle: string;
  heroSubtitle: string;
}

export function HeroClient({ heroTitle, heroSubtitle }: HeroClientProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
          <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
          <span className="text-white/90 text-sm tracking-wider uppercase font-medium">
            Ногтевая студия
          </span>
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
      >
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          {heroTitle}
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-8"
      >
        <p className="text-2xl md:text-4xl text-white font-light tracking-wide mb-4">
          Анастасия Авдеева
        </p>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          {heroSubtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
      >
        <Link
          href="#contact"
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
        >
          <span className="relative z-10">Записаться онлайн</span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        <a
          href="https://t.me/prrriveeet"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white rounded-full font-semibold hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-2"
        >
          <Send className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
          <span>@prrriveeet</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
        className="flex flex-col items-center gap-2 mt-12"
      >
        <div className="w-1 h-12 bg-gradient-to-b from-white/30 to-transparent rounded-full animate-pulse"></div>
        <ArrowDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </>
  );
}
