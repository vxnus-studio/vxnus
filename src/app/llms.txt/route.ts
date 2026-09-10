import { getPublicArticle, getPublicWork } from "@/lib/content";
import { site } from "@/lib/site";

export async function GET() {
  const [articles, work] = await Promise.all([
    getPublicArticle(),
    getPublicWork(),
  ]);

  const openSource = work.filter((w) => w.type === "open_source");
  const projects = work.filter((w) => w.type === "project");

  const articleSection = articles.length > 0
    ? articles
        .map(
          (article) =>
            `- [${article.title}](${site.url}/article/${article.slug}): ${article.summary}`,
        )
        .join("\n")
    : "- No research articles published yet.";

  const openSourceSection = openSource.length > 0
    ? openSource
        .map(
          (w) =>
            `- [${w.title}](${site.url}/open-source/${w.slug}): ${w.summary}${w.repositoryUrl ? ` (Repo: ${w.repositoryUrl})` : ""}`,
        )
        .join("\n")
    : "- No open-source projects published yet.";

  const projectsSection = projects.length > 0
    ? projects
        .map(
          (w) =>
            `- [${w.title}](${site.url}/projects/${w.slug}): ${w.summary}${w.externalUrl ? ` (URL: ${w.externalUrl})` : ""}`,
        )
        .join("\n")
    : "- No products or validated projects published yet.";

  const body = `# ${site.name}

> ${site.description}

${site.name} is a Technology Creative Studio. It focuses on trying the untried and finishing the unfinished, with a deep focus on technology like AI, AI Companions, and AI Characters.

## Public sections

- [Home](${site.url}/): Studio profile and selected work.
- [About](${site.url}/about): Studio principles and areas of work.
- [Article](${site.url}/article): Published article archive.
- [Article topics](${site.url}/topics): Topic index for the article archive.
- [Open source](${site.url}/open-source): Open-source tools and systems.
- [Projects](${site.url}/projects): Validated work and products.

## Research & Articles

${articleSection}

## Open Source

${openSourceSection}

## Projects & Validated Work

${projectsSection}

## Machine-readable feeds

- [RSS feed](${site.url}/feed.xml)
- [Sitemap](${site.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
