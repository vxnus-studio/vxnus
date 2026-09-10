import type { MetadataRoute } from "next";

import { getPublicArticle, getPublicTopics, getPublicWork } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const articles = await getPublicArticle();
  const topics = await getPublicTopics();
  const works = await getPublicWork();
  const staticRoutes = ["/", "/about", "/article", "/topics", "/open-source", "/projects"];

  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...articles.map((article) => ({
      url: new URL(`/article/${article.slug}`, site.url).toString(),
      lastModified: article.publishedAt ?? now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...topics.map((topic) => ({
      url: new URL(`/topics/${topic.slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...works.map((work) => ({
      url: new URL(`/${work.type === "open_source" ? "open-source" : "projects"}/${work.slug}`, site.url).toString(),
      lastModified: work.publishedAt ?? now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
