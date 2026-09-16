"use client";

import Giscus from "@giscus/react";

export default function Comments({ slug }) {
  if (!slug) return null;

  return (
    <div className="mt-16 pt-10 border-t border-charcoal/15 max-w-4xl mx-auto px-6">
      <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">
        Comments & Community
      </h3>
      <Giscus
        id="comments"
        repo="bolusunday/pegtywellness"
        repoId="PASTE_YOUR_REPO_ID_HERE"
        category="General"
        categoryId="PASTE_YOUR_CATEGORY_ID_HERE"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
