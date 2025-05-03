// types/globals.d.ts
interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }