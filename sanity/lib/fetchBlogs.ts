import { sanityClient } from '@/sanity/lib/client';
import type { Blog } from '@/types/blog';

const BLOG_FIELDS = `
  _id,
  blogNumber,
  title,
  category,
  publishedAt,
  arabicAyah,
  translation,
  media[] {
    _type,
    ...,
    asset->{ url, mimeType },
    url
  },
  introduction,
  scientificValidation,
  reflection,
  conclusion,
  tags
`;

// Fetch single blog by number
export async function fetchBlogByNumber(blogNumber: number): Promise<Blog | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "blog" && blogNumber == $blogNumber][0] { ${BLOG_FIELDS} }`,
      { blogNumber }
    );
  } catch (error) {
    console.error(`Failed to fetch blog ${blogNumber}:`, error);
    return null;
  }
}

// Fetch ALL blogs ordered by blogNumber
export async function fetchAllBlogs(): Promise<Blog[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "blog"] | order(blogNumber asc) { ${BLOG_FIELDS} }`
    );
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return [];
  }
}