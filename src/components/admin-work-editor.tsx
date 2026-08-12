"use client";

import { useActionState } from "react";

import { saveWorkEntry } from "@/app/admin/actions";
import type { AdminWorkEntry } from "@/lib/admin-content";

export function AdminWorkEditor({ work }: { work?: AdminWorkEntry }) {
  const [state, action, pending] = useActionState(saveWorkEntry, undefined);

  const defaultContent = work 
    ? `---
type: "${work.type}"
slug: "${work.slug}"
title: "${work.title.replace(/"/g, '\"')}"
summary: "${work.summary.replace(/"/g, '\"')}"
externalUrl: "${work.externalUrl || ""}"
repositoryUrl: "${work.repositoryUrl || ""}"
---

${work.body}
`
    : `---
type: "project"
slug: ""
title: ""
summary: ""
externalUrl: ""
repositoryUrl: ""
---

Write what it is, what was tested, and what was learned...
`;

  return (
    <div className="admin-editor-wrapper">
      <form className="admin-editor" action={action}>
        {work && <input type="hidden" name="id" value={work.id} />}
        <div className="admin-editor-topline">
          <p className="admin-eyebrow">{work ? `Studio work / ${work.slug}` : "New studio work"}</p>
          <span className={`admin-status admin-status-${work?.status || "draft"}`}>{work?.status || "draft"}</span>
        </div>
        
        <label>
          Content (Markdown with YAML Frontmatter)
          <span className="admin-help">Paste markdown content with YAML frontmatter. Types: open_source, project.</span>
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
        </div>
      </form>
    </div>
  );
}
