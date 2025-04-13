import { defineLive } from "next-sanity";
import { sanityClient } from '@/sanity/lib/client';

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient.withConfig({
    apiVersion: 'vX',
    useCdn: false, 
    token: process.env.SANITY_API_TOKEN 
  })
});