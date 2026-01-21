"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (saved === "true") {
      setConsentGiven(true);
    } else {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");

    if ((window as any).__METRIKA_CONSENT === false) {
      delete (window as any).__METRIKA_CONSENT;
      (window as any).ym(106364517, "init", {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        accurateTrackBounce: true,
        trackLinks: true,
      });
    }

    setConsentGiven(true);
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "false");
    setConsentGiven(false);
    setIsVisible(false);
  };

  if (!isVisible || consentGiven) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <div className="flex-1 text-white/90 text-sm sm:text-base leading-relaxed max-w-prose">
          <p>
            Мы используем сервис <strong>Яндекс.Метрика</strong> для улучшения
            работы сайта. Это включает cookies и сбор анонимной статистики о
            посещениях.
          </p>
          <p className="mt-2">
            Подробнее в{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 underline font-medium transition-colors"
            >
              Политике конфиденциальности
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={declineCookies}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] flex-1 sm:flex-none"
          >
            Отклонить
          </button>
          <button
            onClick={acceptCookies}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] text-white text-sm font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] flex-1 sm:flex-none"
          >
            Принять cookies
          </button>
        </div>
      </div>
    </motion.div>
  );
}
