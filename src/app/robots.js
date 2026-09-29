export const dynamic = "force-static"; // <-- Add this exact line right here

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://pegtywellness.com/sitemap.xml",
  };
}
