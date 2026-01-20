import { Heart, MessageCircle, Phone, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-pink-900/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                AVDEEVA
              </span>
            </h3>
            <p className="text-white/70 leading-relaxed mb-4">
              Ногтевая студия Анастасии Авдеевой в Самаре. Создаю уникальные
              дизайны и забочусь о здоровье ваших ногтей.
            </p>
            <div className="flex items-center gap-2 text-white/60">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-sm">С любовью к маникюру с 2018 года</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-white/70 hover:text-pink-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Услуги и цены
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/70 hover:text-pink-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Записаться онлайн
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-white/70 hover:text-pink-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Портфолио работ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+972501234567"
                  className="flex items-center gap-3 text-white/70 hover:text-pink-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Телефон</div>
                    <div className="font-medium">+79276136513</div>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://t.me/prrriveeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Telegram</div>
                    <div className="font-medium">@prrriveeet</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm text-center md:text-left">
            © {currentYear} Анастасия Авдеева. Все права защищены.
          </p>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span>Создано с</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            <span>и вниманием к деталям</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
