"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            На главную
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Политика конфиденциальности
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Авдеева Анастасия Евгеньевна, мастера маникюра
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 space-y-8"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Общие положения
              </h2>
              <p className="text-white/80 leading-relaxed">
                1.1. Настоящая Политика конфиденциальности персональных данных
                (далее — Политика) действует в отношении всей информации,
                которую сайт <strong>https://nails-avdeeva.vercel.app</strong> (далее — Сайт)
                расположенный на доменном имени nails-avdeeva.vercel.app (а также его
                субдоменах), может получить о Пользователе во время
                использования сайта.
              </p>
              <p className="text-white/80 leading-relaxed">
                1.2. Использование сайта означает безоговорочное согласие
                Пользователя с настоящей Политикой и указанными в ней условиями
                обработки его персональных данных.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Какие данные собираются
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-pink-400">
                    Персональные данные:
                  </h3>
                  <ul className="text-white/80 space-y-2 list-disc list-inside">
                    <li>Фамилия, имя</li>
                    <li>Номер телефона</li>
                    <li>Выбранная услуга</li>
                    <li>Желаемая дата записи</li>
                    <li>Дополнительный комментарий (по желанию)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-400">
                    Технические данные:
                  </h3>
                  <ul className="text-white/80 space-y-2 list-disc list-inside">
                    <li>Cookies Яндекс.Метрика</li>
                    <li>IP-адрес</li>
                    <li>Данные браузера</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Цели сбора данных
              </h2>
              <p className="text-white/80 leading-relaxed">
                3.1. Персональные данные используются исключительно для:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 mt-4">
                <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 text-white/80">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Обработки заявок на запись на маникюр</span>
                </li>
                <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 text-white/80">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Подтверждения записи по телефону</span>
                </li>
                <li className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 text-white/80">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Аналитики посещаемости (Яндекс.Метрика)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Передача данных третьим лицам
              </h2>
              <p className="text-white/80 leading-relaxed">
                4.1. Персональные данные{" "}
                <strong>НЕ передаются третьим лицам</strong>.
              </p>
              <p className="text-white/80 leading-relaxed">
                4.2. Заявки из форм отправляются напрямую в Telegram-бот
                Авдеевой Анастасии Евгеньевны для оперативной обработки.
              </p>
              <p className="text-white/80 leading-relaxed">
                4.3. Cookies Яндекс.Метрика обрабатываются в соответствии с{" "}
                <a
                  href="https://yandex.ru/support/metrica/ru/general/confidential-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 underline font-medium"
                >
                  политикой Яндекса
                </a>
                .
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Хранение и защита данных
              </h2>
              <ul className="space-y-3 text-white/80">
                <li>
                  • Данные из форм хранятся только в Telegram-чаты Авдеевой А.А.
                </li>
                <li>• Cookies Яндекс.Метрика — согласно политике Яндекса</li>
                <li>• На сайте данные не сохраняются в базах данных</li>
                <li>
                  • Данные удаляются после выполнения записи или по запросу
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Права Пользователя
              </h2>
              <p className="text-white/80 leading-relaxed">
                Вы имеете право в любой момент запросить удаление своих данных,
                написав в Telegram: <strong>@prrriveeet</strong> или по телефону
                <strong>+79276136513</strong>.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Управление cookies
              </h2>
              <p className="text-white/80 leading-relaxed">
                Вы можете отключить cookies Яндекс.Метрика в настройках
                браузера. Это не повлияет на работу форм записи.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Контакты и реквизиты
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-white/80">
                <div>
                  <p>
                    <strong>Самозанятый Авдеева Анастасия Евгеньевна</strong>
                  </p>
                  <p>ИНН: 631405677493</p>
                  <p>
                    Статус: Плательщик НПД (налог на профессиональный доход)
                  </p>
                  <p>Регистрация: ФНС России</p>
                  <p>Адрес деятельности: г. Самара, Самарская область</p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Контакты для запросов:</strong>
                  </p>
                  <p>
                    Telegram:{" "}
                    <a
                      href="https://t.me/prrriveeet"
                      className="text-pink-400 hover:text-pink-300"
                    >
                      @prrriveeet
                    </a>
                  </p>
                  <p>
                    Телефон:{" "}
                    <a
                      href="tel:+79276136513"
                      className="text-pink-400 hover:text-pink-300"
                    >
                      +79276136513
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-300 hover:scale-105"
          >
            Записаться на маникюр
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
