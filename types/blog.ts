// types/blog.ts
import { PortableTextBlock } from '@portabletext/types';


export interface SanityAsset {
  _type: string;
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string;
    mimeType?: string;
  };
}

export interface SanityImage extends SanityAsset {
  _type: 'image';
  alt?: string;
}

export interface SanityFile extends SanityAsset {
  _type: 'file';
}

export interface SanityYoutube {
  _type: 'youtube';
  url: string;
}

export type MediaItem = SanityImage | SanityFile | SanityYoutube;

export interface Blog {
  _id: string;
  _createdAt: string;
  blogNumber: number;
  title: string;
  arabicAyah?: string;
  translation?: string;
  media?: MediaItem[];
  category: string;
  tags?: string[];
  publishedAt: string;
  introduction?: PortableTextBlock[];
  scientificValidation?: PortableTextBlock[];
  reflection?: PortableTextBlock[];
  conclusion?: PortableTextBlock[];
}