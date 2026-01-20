import type { SiteSettings, Service } from '@/lib/types';

interface StructuredDataProps {
  settings: SiteSettings | null;
  services: Service[];
}

export function StructuredData({ settings, services }: StructuredDataProps) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings?.hero_title || 'AVDEEVA',
    description: settings?.hero_subtitle || 'Ногтевая студия',
    image: settings?.background_gif_url || '',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Тель-Авив',
      addressCountry: 'IL',
    },
    telephone: '+972-50-123-4567',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
  };

  const serviceList = services.map((service) => ({
    '@type': 'Service',
    serviceType: service.title,
    description: service.description,
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'ILS',
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {serviceList.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: serviceList,
            }),
          }}
        />
      )}
    </>
  );
}
