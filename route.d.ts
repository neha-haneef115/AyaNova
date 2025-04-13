// This file helps define types for dynamic routes in Next.js App Router
declare namespace JSX {
    interface IntrinsicAttributes {
      params?: {
        [key: string]: string;
      };
      searchParams?: {
        [key: string]: string | string[] | undefined;
      };
    }
  }