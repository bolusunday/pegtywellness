export const dynamic = "force-static"; //

import { getAllPosts } from "@/lib/posts";

export default async function sitemap() {
  const baseUrl = "https://pegtywellness.com";
  const posts = getAllPosts();

  // 2. Define a single static date string for the build execution instance
  const currentDate = new Date().toISOString();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
  }));

  return [{ url: baseUrl, lastModified: currentDate }, ...postUrls];
}
