// This declaration file helps with Next.js 15 App Router typings
import 'next';

declare module 'next' {
  export interface PageProps {
    params?: { [key: string]: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}