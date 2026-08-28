"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export function KnowledgeStatus({ apiEndpoint = "/api/health", defaultGameVersion = "v7.0.1", pendingText = "Neon setup pending", previewText = "Preview graph", }) {
    const [health, setHealth] = useState(null);
    useEffect(() => {
        let active = true;
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((result) => {
            if (active)
                setHealth(result);
        })
            .catch(() => {
            if (active)
                setHealth({ status: "offline", connected: false });
        });
        return () => {
            active = false;
        };
    }, [apiEndpoint]);
    const ready = health?.status === "ready";
    const shortRev = health?.shortRevision ?? (health?.revision ? health.revision.slice(0, 7) : null);
    const version = health?.gameVersion ?? defaultGameVersion;
    return (_jsxs("div", { className: "topbar-status", "aria-live": "polite", children: [_jsxs("span", { className: `data-live ${ready ? "" : "pending"}`, children: [_jsx("i", {}), ready ? `${health.entityCount?.toLocaleString() ?? 0} entities` : pendingText] }), ready && (_jsxs("span", { className: "version-pill", title: health.phaseLabel ?? "Current Version", children: [_jsx("span", { className: "version-pill-dot" }), version] })), _jsx("span", { className: "version-badge", title: health?.revision ? `Full Revision: ${health.revision}` : previewText, children: shortRev ? `rev ${shortRev}` : previewText })] }));
}
