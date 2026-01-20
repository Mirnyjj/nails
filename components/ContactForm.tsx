"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import type { Service } from "@/lib/types";
import {
  submitContactForm,
  type ContactActionResult,
} from "@/app/actions/contact";
import { sendAppointmentMessage } from "@/telegram";

interface ContactFormProps {
  services: Service[];
}

export function ContactForm({ services }: ContactFormProps) {
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        setResult(null);

        const data = {
          name: formData.get("name") as string,
          phone: formData.get("phone") as string,
          service: formData.get("service") as string,
          date: formData.get("date") as string,
          message: formData.get("message") as string,
          source: "Форма записи",
        };

        await sendAppointmentMessage(data);

        setResult({
          success: true,
          message:
            "Заявка отправлена! Скоро свяжусь с Вами для подтверждения записи.",
        });

        setTimeout(() => {
          setResult(null);
          const form = document.getElementById(
            "contact-form",
          ) as HTMLFormElement;
          if (form) form.reset();
        }, 3000);
      } catch (error) {
        setResult({
          success: false,
          message:
            "Ошибка отправки. Попробуйте еще раз или свяжитесь напрямую.",
        });
        console.error("Telegram error:", error);
      }
    });
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              ЗАПИСЬ
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Свяжитесь со мной удобным способом или заполните форму онлайн-записи
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">
                Быстрая связь
              </h3>

              <a
                href="https://vk.com/avdeeevanails"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.41c-.13.37-.58.64-1.07.64-.19 0-.38-.03-.58-.1-.76-.26-1.58-1.08-2.26-1.79-.5-.52-.93-.96-1.27-.96-.17 0-.38.08-.64.48-.31.48-.47 1.01-.47 1.01s-.04.37-.44.37h-.96c-.44 0-2.71-.17-4.65-2.18-2.18-2.25-4.11-6.74-4.11-6.74s-.1-.25.01-.38c.12-.14.45-.15.45-.15h2.03c.38 0 .52.17.62.35 0 0 .59 1.45 1.35 2.76.99 1.71 1.43 2.08 1.76 2.08.23 0 .42-.1.42-.68v-2.68c-.06-1.17-.69-1.27-.69-1.68 0-.16.13-.31.33-.31h3.18c.32 0 .43.17.43.32v3.63c0 .32.14.43.23.43.23 0 .41-.14.82-.56 1.26-1.42 2.16-3.61 2.16-3.61s.12-.24.31-.35c.19-.11.45-.07.45-.07h2.13c.64 0 .78.32.64.76-.3 1.03-2.64 4.38-2.64 4.38-.19.32-.23.46 0 .77.17.24.74.73 1.12 1.18.69.81 1.22 1.49 1.36 1.96z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">
                    ВКонтакте
                  </h4>
                  <p className="text-blue-300 text-sm">
                    Быстрая запись и консультация
                  </p>
                </div>
              </a>
              <a
                href="https://dikidi.net/1772013?p=0.pi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-gradient-to-br from-orange-500/20 to-pink-600/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">
                    Онлайн-запись
                  </h4>
                  <p className="text-orange-300 text-sm">
                    Записаться через DIKIDI
                  </p>
                </div>
              </a>
              <a
                href="https://t.me/avdeevanailssmr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">
                    Telegram
                  </h4>
                  <p className="text-cyan-300 text-sm">Мой канал</p>
                </div>
              </a>
              <a
                href="tel:+79276136513"
                className="group flex items-center gap-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">Телефон</h4>
                  <p className="text-purple-300 text-sm">+79276136513</p>
                </div>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                {result?.success ? (
                  <div className="flex flex-col items-center justify-center py-20 px-8 text-center max-w-md mx-auto">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20 rounded-3xl blur-xl -z-10"
                    />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 400,
                      }}
                      className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl mb-8 border-4 border-white/20 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-105"
                    >
                      <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-4xl md:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl"
                    >
                      Заявка отправлена!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl md:text-2xl text-white/90 mb-8 max-w-sm leading-relaxed font-medium tracking-wide"
                    >
                      {result.message}
                    </motion.p>

                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-8 shadow-lg"
                    />

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-green-400 text-lg font-bold tracking-wider"
                    >
                      Автозакрытие через 3...2...1...
                    </motion.div>
                  </div>
                ) : (
                  <form
                    id="contact-form"
                    action={handleSubmit}
                    className="space-y-6"
                  >
                    {result && !result.success && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm font-medium">
                          {result.message}
                        </p>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold text-white mb-2"
                      >
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none backdrop-blur-xl disabled:opacity-50"
                        placeholder="Анастасия"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-bold text-white mb-2"
                      >
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none backdrop-blur-xl disabled:opacity-50"
                        placeholder="+79276136513"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-bold text-white mb-2"
                      >
                        Выберите услугу
                      </label>
                      <select
                        id="service"
                        name="service"
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none backdrop-blur-xl disabled:opacity-50"
                      >
                        <option value="">Выберите услугу</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-bold text-white mb-2"
                      >
                        Желаемая дата
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none backdrop-blur-xl disabled:opacity-50
  appearance-none
  [&::-webkit-calendar-picker-indicator]:hidden
  [&::-webkit-calendar-picker-indicator]:bg-transparent
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-clear-button]:hidden
  [&::-webkit-search-decoration]:hidden"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-bold text-white mb-2"
                      >
                        Комментарий
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none resize-none backdrop-blur-xl disabled:opacity-50"
                        placeholder="Напишите пожелания по дизайну или задайте вопрос..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full px-8 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-lg rounded-xl font-bold hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-6 h-6" />
                      {isPending ? "Отправка..." : "Отправить заявку"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
