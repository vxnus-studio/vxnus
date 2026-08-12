"use client";

import { useActionState } from "react";
import Link from "next/link";

import { saveArticle } from "@/app/admin/actions";
import type { AdminArticleArticle } from "@/lib/admin-content";

export function AdminArticleEditor({ article }: { article?: AdminArticleArticle }) {
  const [state, action, pending] = useActionState(saveArticle, undefined);

  const defaultContent = article ? `---
articleId: ${JSON.stringify(article.articleId)}
slug: ${JSON.stringify(article.slug)}
title: ${JSON.stringify(article.title)}
subtitle: ${JSON.stringify(article.subtitle ?? "")}
summary: ${JSON.stringify(article.summary)}
author: ${JSON.stringify(article.author)}
readingTimeMinutes: ${article.readingTimeMinutes}
topics:
${article.topics.map((t) => `  - ${JSON.stringify(t.name)}`).join("\n")}
coverImageUrl: ${JSON.stringify(article.coverImageUrl ?? "")}
coverImageAlt: ${JSON.stringify(article.coverImageAlt ?? "")}
---

${article.body}` : `---
articleId: "VR-"
slug: ""
title: ""
subtitle: ""
summary: ""
author: "Kur Zagin"
readingTimeMinutes: 8
topics:
  - ""
coverImageUrl: ""
coverImageAlt: ""
---

## Introduction

`;

  return (
    <div className="admin-editor-wrapper">
      <form className="admin-editor" action={action}>
        {article && <input type="hidden" name="id" value={article.id} />}
        <div className="admin-editor-topline">
          <p className="admin-eyebrow">{article ? `Edit / ${article.articleId}` : "New article"}</p>
          <span className={`admin-status admin-status-${article ? article.status || "draft" : "draft"}`}>
            {article ? (article.status === "published" ? "Published" : article.status === "archived" ? "Archived" : "Draft") : "Draft"}
          </span>
        </div>

        <label>
          Content (Markdown with YAML Frontmatter)
          <span className="admin-help">Paste markdown content with YAML frontmatter.</span>
          <textarea 
            className="admin-body-input" 
            name="rawContent" 
            defaultValue={defaultContent} 
            required 
            style={{ height: '600px', fontFamily: 'monospace' }} 
          />
        </label>

        {state?.error && <p className="admin-form-error" role="alert">{state.error}</p>}
        <div className="admin-editor-actions">
          <button type="submit" disabled={pending}>{pending ? "Saving…" : "Save draft"}</button>
          {article && <Link className="admin-outline-link" href={`/admin/article/${article.id}/preview`}>Preview</Link>}
          <span>Publishing actions become available after the database connection is verified.</span>
        </div>
      </form>
    </div>
  );
}
