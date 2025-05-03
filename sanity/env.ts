// Remove NEXT_PUBLIC_ prefix for server-side environment variables
export const apiVersion = process.env.SANITY_API_VERSION || '2025-03-23';

export const dataset = assertValue(
  process.env.SANITY_DATASET,
  'Missing environment variable: SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.SANITY_PROJECT_ID,
  'Missing environment variable: SANITY_PROJECT_ID'
);

// Keep the type-safe assertion helper
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}