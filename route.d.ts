// route.d.ts
import type { ReadonlyURLSearchParams } from 'next/navigation';

declare namespace JSX {
  interface IntrinsicAttributes {
    params?: Promise<{
      [key: string]: string;
    }>;
    searchParams?: Promise<ReadonlyURLSearchParams> | 
                  Promise<{ [key: string]: string | string[] | undefined }>;
  }
}