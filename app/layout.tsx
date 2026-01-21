import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { getSiteSettings } from "@/lib/db";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ),

    title: {
      default: settings?.hero_title || "AVDEEVA - Ногтевая студия",
      template: `%s | ${settings?.hero_title || "AVDEEVA"}`,
    },

    description:
      settings?.hero_subtitle ||
      "Профессиональный маникюр и дизайн ногтей в Самаре. Наращивание, педикюр, гель-лак.",

    keywords: [
      "маникюр",
      "педикюр",
      "наращивание ногтей",
      "дизайн ногтей",
      "ногтевая студия",
      "Самара",
      "Аврора Самара",
      "гель-лак",
      "маникюр Самара",
    ],

    authors: [{ name: "Анастасия Авдеева" }],
    creator: "Анастасия Авдеева",
    publisher: "AVDEEVA Nails",

    openGraph: {
      title: settings?.hero_title || "AVDEEVA - Ногтевая студия",
      description:
        settings?.hero_subtitle || "Профессиональный маникюр и дизайн ногтей",
      url: process.env.NEXT_PUBLIC_APP_URL,
      siteName: settings?.hero_title || "AVDEEVA",
      images: settings?.background_gif_url
        ? [
            {
              url: settings.background_gif_url,
              width: 1200,
              height: 630,
              alt: settings.hero_title || "AVDEEVA Nails",
            },
          ]
        : [],
      locale: "ru_RU",
      type: "website",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    verification: {
      yandex: 106364517,
    },

    manifest: "/manifest.json",
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "AVDEEVA - Ногтевая студия",
  description:
    "Профессиональный маникюр, педикюр, наращивание и дизайн ногтей в Самаре",
  url: process.env.NEXT_PUBLIC_APP_URL,
  telephone: "+79276136513",
  priceRange: "₪",
  areaServed: ["Самара", "Аврора"],
  openingHours: "Mo-Su 09:00-21:00",
  image: "/icon-512x512.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Самара",
    addressCountry: "Ru",
  },
  sameAs: [
    "https://t.me/avdeevanailssmr",
    "https://vk.com/avdeeevanails",
    "https://dikidi.net/1772013",
  ],
  serviceType: ["Маникюр", "Педикюр", "Наращивание ногтей", "Дизайн ногтей"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null;

  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.error("Error loading site settings:", error);
  }

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106364517', 'ym');
      
      window.__METRIKA_CONSENT = localStorage.getItem('cookie-consent') === 'true';
      if (!window.__METRIKA_CONSENT) {
        window.ym = function(){};
      } else {
        ym(106364517, 'init', {
          ssr:true, webvisor:true, clickmap:true, 
          ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true
        });
      }
    `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${inter.className} h-full antialiased font-sans`}
      >
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106364517"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <div
          className="fixed inset-0 z-[-2] bg-no-repeat"
          style={{
            backgroundImage: settings?.background_gif_url
              ? `url(${settings.background_gif_url})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundColor: "#111",
          }}
        />

        <div className="fixed inset-0 z-[-1] bg-black/50" />

        <div className="relative z-0 min-h-screen">
          <ErrorBoundary>{children}</ErrorBoundary>
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
// <html lang="ru" className="h-full">
//   <head>
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//     />

//     <meta
//       name="viewport"
//       content="width=device-width, initial-scale=1, maximum-scale=5"
//     />
//     <meta name="theme-color" content="#000000" />
//     <link rel="manifest" href="/manifest.json" />
//   </head>

//   <body
//     className={`${inter.variable} ${inter.className} h-full antialiased font-sans`}
//   >
//     <div
//       className="fixed inset-0 z-[-2] bg-no-repeat"
//       style={{
//         backgroundImage: settings?.background_gif_url
//           ? `url(${settings.background_gif_url})`
//           : "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//         backgroundColor: "#111",
//       }}
//     />

//     <div className="fixed inset-0 z-[-1] bg-black/50" />

//     <div className="relative z-0 min-h-screen">
//       <ErrorBoundary>{children}</ErrorBoundary>
//     </div>

//     <CookieConsent />
//   </body>
// </html>
