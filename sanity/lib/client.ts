import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '2itx3onn',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-11-16', 
});