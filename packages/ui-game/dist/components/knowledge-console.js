"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
export function KnowledgeConsole({ defaultTarget = "Splendor of Tranquil Waters", placeholder = "e.g. Furina, Splendor of Tranquil Waters, Lakelight Lily...", apiEndpoint = "/api/farming", questionLabel = "Try a multi-hop question", questionPrefix = "Where do I find materials for", questionSuffix = "?", getEntityHref, }) {
    const [target, setTarget] = useState(defaultTarget);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function submit(event) {
        event.preventDefault();
        if (!target.trim())
            return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiEndpoint}?${new URLSearchParams({ target: target.trim() })}`);
            const payload = (await response.json());
            if (!response.ok)
                throw new Error(payload.error ?? "Graph traversal failed.");
            setResult(payload);
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Graph traversal failed.");
        }
        finally {
            setLoading(false);
        }
    }
    const resolveEntityHref = (t) => {
        if (getEntityHref)
            return getEntityHref(t);
        const kind = t.kind === "avatar" ? "characters" : t.kind === "weapon" ? "weapons" : t.kind === "material" ? "materials" : "characters";
        return `/database/${kind}/${t.slug}`;
    };
    return (_jsxs("div", { className: "knowledge-console", children: [_jsxs("form", { className: "knowledge-question", onSubmit: submit, children: [_jsx("span", { children: questionLabel }), _jsxs("label", { children: [_jsx("span", { children: questionPrefix }), _jsx("input", { onChange: (event) => setTarget(event.target.value), value: target, placeholder: placeholder }), _jsx("span", { children: questionSuffix })] }), _jsx("button", { disabled: loading, type: "submit", children: loading ? "Tracing relations…" : "Trace the graph" })] }), error ? _jsx("p", { className: "data-error", children: error }) : null, result ? (_jsxs("section", { className: "trace-result", "aria-live": "polite", children: [_jsxs("header", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [_jsxs("div", { children: [_jsxs("span", { className: "text-[var(--green)] text-xs font-mono tracking-widest uppercase block", children: ["Resolved Target (", result.target.kind, ")"] }), _jsxs("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: [result.target.name, result.target.slug && (_jsx(Link, { href: resolveEntityHref(result.target), className: "text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center", title: "Open entity record", children: _jsx(ExternalLink, { size: 15 }) }))] })] }), _jsxs("code", { className: "text-xs text-[var(--text-3)] font-mono bg-black/30 px-2 py-1 rounded max-w-full truncate", children: ["REVISION ", result.revision ? result.revision.slice(0, 16) : "PREVIEW", "\u2026"] })] }), _jsxs("div", { className: "trace-flow", children: [_jsx("span", { className: "trace-node target-node font-semibold truncate", children: result.target.name }), _jsx("span", { className: "trace-arrow", children: "requires" }), _jsxs("span", { className: "trace-node", children: [result.materials.length, " material records"] }), _jsx("span", { className: "trace-arrow", children: "obtained from" }), _jsxs("span", { className: "trace-node", children: [new Set(result.materials.flatMap((item) => item.sources.map((source) => source.name))).size, " sources"] })] }), _jsx("div", { className: "material-list", children: result.materials.map((material, index) => (_jsxs("article", { className: "flex flex-col sm:flex-row gap-4 p-4", children: [_jsx("span", { className: "material-index font-mono font-bold text-sm text-[var(--accent)] shrink-0", children: String(index + 1).padStart(2, "0") }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 mb-2", children: [_jsx("h3", { className: "text-base font-bold text-white m-0", children: material.name }), material.quantity !== null && material.quantity !== undefined && (_jsxs("span", { className: "px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono font-bold", children: ["Required: \u00D7", material.quantity] }))] }), material.phase && material.phase !== "direct" && (_jsxs("p", { className: "text-xs text-[var(--text-muted)] mb-2 font-mono capitalize", children: ["Relation predicate: ", material.phase.replace(/_/g, " ")] })), _jsxs("div", { className: "source-list mt-2 flex flex-wrap gap-2", children: [material.sources.map((source, sIdx) => (_jsxs("span", { className: "inline-flex flex-wrap items-center gap-1.5 bg-[var(--surface-2)] border border-white/5 rounded-lg px-2.5 py-1.5 text-xs", children: [_jsx("strong", { className: "text-[var(--text-light)]", children: source.name }), source.region ? (_jsxs("span", { className: "text-[var(--text-muted)]", children: ["(", source.region, ")"] })) : null, source.availableDays && source.availableDays.length > 0 ? (_jsxs("span", { className: "text-[var(--gold)] font-mono text-[11px]", children: ["\u00B7 ", source.availableDays.join(", ")] })) : null] }, `${source.type}:${source.name}:${sIdx}`))), material.sources.length === 0 && material.sourceNotes && material.sourceNotes.length > 0 ? (_jsx("div", { className: "text-xs text-[var(--text-muted)] flex flex-wrap gap-2", children: material.sourceNotes.map((note, nIdx) => (_jsx("span", { className: "bg-white/5 px-2 py-1 rounded", children: note }, nIdx))) })) : null, material.sources.length === 0 && (!material.sourceNotes || material.sourceNotes.length > 0) ? (_jsx("span", { className: "text-xs text-[var(--text-3)] italic", children: "No direct drop sources recorded (World exploration / Crafting)" })) : null] })] })] }, `${material.name}:${index}`))) }), result.preview ? (_jsx("p", { className: "preview-notice", children: "This trace uses the bundled projection artifact. Live queries are synchronized with Neon." })) : null] })) : (_jsxs("div", { className: "trace-placeholder", children: [_jsx("span", { children: "01" }), _jsx("p", { children: "Resolve a target, traverse its required materials, then follow domain and enemy-source relations." })] }))] }));
}
