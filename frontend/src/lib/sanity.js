// import { createClient } from 'next-sanity'

// export const client = createClient({
//   projectId: '3kntgucg', // from sanity.json or sanity studio dashboard
//   dataset: 'production',
//   apiVersion: '2025-01-01', // use current date or version
//   useCdn: true, // use CDN for faster, cached responses (set false to get fresh data)
// })


import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "3kntgucg", // from Sanity.io dashboard
  dataset: "production",        // default dataset
  useCdn: true,                  // `true` for faster reads, `false` if you need fresh data
  apiVersion: "2025-01-01",      // use the latest date you are coding this
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
