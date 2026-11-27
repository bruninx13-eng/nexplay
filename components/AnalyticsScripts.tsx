"use client";

import Script from "next/script";
import { useConsent } from "@/lib/useConsent";

function sanitizeId(value: string): string {
  return /^[A-Za-z0-9-]+$/.test(value) ? value : "";
}

/**
 * Scripts de mensuração opcionais. Só são renderizados após consentimento
 * explícito e quando as respectivas IDs estão configuradas no ambiente.
 */
export function AnalyticsScripts() {
  const consent = useConsent();

  if (consent !== "granted") return null;

  const gaId = sanitizeId(process.env.NEXT_PUBLIC_GA_ID ?? "");
  const gtmId = sanitizeId(process.env.NEXT_PUBLIC_GTM_ID ?? "");
  const pixelId = sanitizeId(process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "");

  return (
    <>
      {gtmId && (
        <Script id="nexplay-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {gaId && (
        <>
          <Script
            id="nexplay-ga-source"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="nexplay-ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {pixelId && (
        <Script id="nexplay-meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
