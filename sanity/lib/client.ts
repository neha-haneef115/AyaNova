import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '2itx3onn',  // Replace with your actual Project ID
  dataset: 'production',         // Use 'production' or your dataset name
  useCdn: true,                  // Enables caching for faster responses
  apiVersion: '2023-01-01',       // Use the latest API version
});
