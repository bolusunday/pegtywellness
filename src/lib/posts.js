import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Map URL slugs to exact frontmatter category strings
const categoryMap = {
  "nutrition-health": "Nutrition & Health",
  "workstation-wellness": "Workstation Wellness",
  "nighttime-optimization": "Nighttime Optimization",
  "body-motion": "Body & Motion",
  "mind-acoustics": "Mind & Acoustics",
  "mens-health": "Men's Health & Longevity",
};

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
        thumbnail: data.thumbnail || data.image || null,
      };
    });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function normalizeCategory(str = "") {
  // Resolve slug alias from categoryMap if present
  const resolvedStr = categoryMap[str] || str;

  return resolvedStr
    .toLowerCase()
    .replace(/['’]/g, "") // Strips apostrophes ("men's" -> "mens")
    .replace(/&/g, "")
    .replace(/\band\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPostsByCategory(categorySlug) {
  const allPosts = getAllPosts();
  const targetSlug = normalizeCategory(categorySlug);

  return allPosts.filter((post) => {
    if (!post.category) return false;

    const postNormalized = normalizeCategory(post.category);

    return (
      postNormalized === targetSlug ||
      postNormalized.startsWith(targetSlug) ||
      targetSlug.startsWith(postNormalized)
    );
  });
}

export function getPostBySlug(slug) {
  if (!slug) return null;

  const cleanSlug = slug.replace(/\.mdx?$/, "");

  let fullPath = path.join(postsDirectory, `${cleanSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${cleanSlug}.md`);
  }

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: cleanSlug,
    content,
    ...data,
    thumbnail: data.thumbnail || data.image || null,
  };
}
