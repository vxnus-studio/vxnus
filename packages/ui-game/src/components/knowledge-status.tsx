"use client";

import { useEffect, useState } from "react";
import type { HealthInfo } from "../types";

export interface KnowledgeStatusProps {
  apiEndpoint?: string;
  defaultGameVersion?: string;
  pendingText?: string;
  previewText?: string;
}

export function KnowledgeStatus({
  apiEndpoint = "/api/health",
  defaultGameVersion = "v7.0.1",
  pendingText = "Neon setup pending",
  previewText = "Preview graph",
}: KnowledgeStatusProps) {
  const [health, setHealth] = useState<HealthInfo | null>(null);

  useEffect(() => {
    let active = true;
    fetch(apiEndpoint)
      .then((response) => response.json() as Promise<HealthInfo>)
      .then((result) => {
        if (active) setHealth(result);
      })
      .catch(() => {
        if (active) setHealth({ status: "offline", connected: false });
      });
    return () => {
      active = false;
    };
  }, [apiEndpoint]);

  const ready = health?.status === "ready";
  const shortRev = health?.shortRevision ?? (health?.revision ? health.revision.slice(0, 7) : null);
  const version = health?.gameVersion ?? defaultGameVersion;

  return (
    <div className="topbar-status" aria-live="polite">
      <span className={`data-live ${ready ? "" : "pending"}`}>
        <i />
        {ready ? `${health.entityCount?.toLocaleString() ?? 0} entities` : pendingText}
      </span>

      {ready && (
        <span className="version-pill" title={health.phaseLabel ?? "Current Version"}>
          <span className="version-pill-dot" />
          {version}
        </span>
      )}

      <span
        className="version-badge"
        title={health?.revision ? `Full Revision: ${health.revision}` : previewText}
      >
        {shortRev ? `rev ${shortRev}` : previewText}
      </span>
    </div>
  );
}
