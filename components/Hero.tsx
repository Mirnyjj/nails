import type { SiteSettings } from "@/lib/types";
import { HeroClient } from "./HeroClient";

interface HeroProps {
  settings: SiteSettings | null;
}

export function Hero({ settings }: HeroProps) {
  const heroTitle = settings?.hero_title || "AVDEEVA";
  const heroSubtitle =
    settings?.hero_subtitle ||
    "Анастасия Авдеева | Создаю искусство на ваших ногтях";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <HeroClient heroTitle={heroTitle} heroSubtitle={heroSubtitle} />
      </div>
    </section>
  );
}
