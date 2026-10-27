"use client";

import React, { useState } from "react";
import Image from "next/image";

interface WebringNode {
  id: string;
  name: string;
  url: string;
  badge: string;
  desc: string;
  external?: boolean;
}

const WEBRING_MEMBERS: WebringNode[] = [
  {
    id: "kurzagin",
    name: "Kur Zagin",
    url: "https://kurzagin.com",
    badge: "/badges/kurzagin.svg",
    desc: "Digital Archive & Systems Architecture",
    external: true,
  },
  {
    id: "sakana",
    name: "Sakana Japanese",
    url: "https://sakanajp.site",
    badge: "/badges/sakana.svg",
    desc: "Retro Kana Study App",
    external: true,
  },
  {
    id: "e-teyvat",
    name: "E-Teyvat",
    url: "https://e-teyvat.vxnus.xyz",
    badge: "/badges/e-teyvat.svg",
    desc: "Genshin Impact Knowledge Base",
    external: true,
  },
  {
    id: "vxnus",
    name: "VXNUS Studio",
    url: "https://vxnus.xyz",
    badge: "/badges/vxnus.svg",
    desc: "Creative Technology Studio",
    external: false,
  },
];

export function VxnusWebring() {
  const currentSiteId = "vxnus";
  const otherSites = WEBRING_MEMBERS.filter((n) => n.id !== currentSiteId);
  const [activeNode, setActiveNode] = useState<WebringNode | null>(null);

  const currentIndex = WEBRING_MEMBERS.findIndex((n) => n.id === currentSiteId);
  const prevNode = WEBRING_MEMBERS[(currentIndex - 1 + WEBRING_MEMBERS.length) % WEBRING_MEMBERS.length];
  const nextNode = WEBRING_MEMBERS[(currentIndex + 1) % WEBRING_MEMBERS.length];

  const handleRandom = () => {
    const random = otherSites[Math.floor(Math.random() * otherSites.length)];
    window.open(random.url, "_blank", "noopener,noreferrer");
  };

  const displayList = [
    ...otherSites,
    {
      id: "join",
      name: "Join Webring",
      url: "https://kurzagin.com/guestbook",
      badge: "/badges/join.svg",
      desc: "Leave your site link in the guestbook",
      external: true,
    },
  ];

  return (
    <section className="vxnus-webring-section" aria-label="Webring federation">
      <div className="vxnus-webring-header">
        <div className="vxnus-webring-label">
          <span className="vxnus-webring-kicker">Federation</span>
          <span className="vxnus-webring-title">Indie Webring</span>
        </div>
        <div className="vxnus-webring-nav">
          <a
            href={prevNode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="vxnus-webring-btn"
            title={`Previous: ${prevNode.name}`}
          >
            ← prev
          </a>
          <button
            type="button"
            onClick={handleRandom}
            className="vxnus-webring-btn"
            title="Visit random node"
          >
            random
          </button>
          <a
            href={nextNode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="vxnus-webring-btn"
            title={`Next: ${nextNode.name}`}
          >
            next →
          </a>
          <a
            href="https://kurzagin.com/guestbook"
            target="_blank"
            rel="noopener noreferrer"
            className="vxnus-webring-join"
          >
            + join
          </a>
        </div>
      </div>

      <div className="vxnus-webring-body">
        <div className="vxnus-webring-badges" role="list">
          {displayList.map((node) => (
            <a
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="vxnus-badge-link"
              title={`${node.name} — ${node.desc}`}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              role="listitem"
            >
              <Image
                src={node.badge}
                alt={`${node.name} 88x31 badge`}
                width={88}
                height={31}
                className="vxnus-badge-img"
                unoptimized
              />
            </a>
          ))}
        </div>

        <div className="vxnus-webring-ticker" aria-live="polite">
          {activeNode ? (
            <p>
              <strong className="vxnus-ticker-highlight">{activeNode.name}</strong> — {activeNode.desc}
            </p>
          ) : (
            <p className="vxnus-ticker-muted">
              Connected creative technology, games, and research nodes. Hover badge to preview.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
