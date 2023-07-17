import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "6nw5dbn5",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// Run this to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000

export default client;
