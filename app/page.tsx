import { siteConfig } from "@/config/site";
import { Benefits } from "@/components/Benefits";
import { Conversion } from "@/components/Conversion";
import { Devices } from "@/components/Devices";
import { Entertainment } from "@/components/Entertainment";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Plans } from "@/components/Plans";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: `${siteConfig.siteUrl}/icons/icon-512.png`,
      description: siteConfig.description,
      slogan: siteConfig.slogan,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.whatsapp.number}`,
        contactType: "sales",
        areaServed: "BR",
        availableLanguage: "Portuguese",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      url: siteConfig.siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/#faq`,
      mainEntity: siteConfig.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <Entertainment />
      <Benefits />
      <Devices />
      <Plans />
      <Conversion />
      <FAQ />
    </>
  );
}
