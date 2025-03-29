import { sanityClient } from '@/sanity/lib/client';

export async function fetchBlogs() {
  const query = `*[_type == "blog"] | order(blogNumber asc) {
    _id,
    blogNumber,
    title,
    arabicAyah,
    translation,
    media[]{
      ...,
      asset -> { url }
    },
    body,
    category,
    tags,
    publishedAt,
    views,
    likes,
    comments
  }`;
  
  return await sanityClient.fetch(query);
}

export async function fetchBlogsByCategory(category: string) {
  const query = `*[_type == "blog" && category == $category] | order(blogNumber asc) {
    _id,
    blogNumber,
    title,
    arabicAyah,
    translation,
    media[]{
      ...,
      asset -> { url }
    },
    body,
    category,
    tags,
    publishedAt,
    views,
    likes,
    comments
  }`;
  
  return await sanityClient.fetch(query, { category });
}

export async function fetchBlogById(id: string) {
  const query = `*[_type == "blog" && _id == $id][0]{
    _id,
    blogNumber,
    title,
    arabicAyah,
    translation,
    media[]{
      ...,
      asset -> { url }
    },
    body,
    category,
    tags,
    publishedAt,
    views,
    likes,
    comments
  }`;
  
  return await sanityClient.fetch(query, { id });
}