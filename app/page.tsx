import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { getServices, getSiteSettings, getImages } from "@/lib/db";
import { StructuredData } from "@/components/StructuredData";
import { LocationMap } from "@/components/LocationMap";

export default async function HomePage() {
  let services: Awaited<ReturnType<typeof getServices>> = [];
  let settings: Awaited<ReturnType<typeof getSiteSettings>> = null;
  let portfolioImages: Awaited<ReturnType<typeof getImages>> = [];

  try {
    [services, settings, portfolioImages] = await Promise.all([
      getServices(),
      getSiteSettings(),
      getImages(),
    ]);
  } catch (error) {
    console.error("Error loading page data:", error);
  }

  return (
    <>
      <StructuredData settings={settings} services={services} />
      <main className="relative min-h-screen">
        <Hero settings={settings} />
        <About />
        <Services services={services} />
        <Portfolio images={portfolioImages} />
        <ContactForm services={services} />
        <LocationMap />
        <Footer />
      </main>
    </>
  );
}
export const revalidate = 30;
