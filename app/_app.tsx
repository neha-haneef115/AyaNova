// app/_app.tsx
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

const GA_TRACKING_ID = "G-ZXRH6CD3XM";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}