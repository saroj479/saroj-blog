import "server-only";

import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion: "2024-08-01",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (src) => {
  if (!src) return null;

  return builder.image(src).url();
};

export const sanityFetch = ({ query, params = {}, tags }) => {
  return client.fetch(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
      tags,
    },
  });
};
