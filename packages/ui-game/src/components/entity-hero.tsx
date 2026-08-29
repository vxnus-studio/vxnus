import Link from "next/link";
import { ArrowLeft, Orbit } from "lucide-react";
import type { TagItem } from "../types";

export interface EntityHeroProps {
  name: string;
  subtitle?: string | null;
  eyebrow?: string;
  stars?: number | null;
  description?: string | null;
  backHref?: string;
  backLabel?: string;
  tags?: TagItem[];
  image?: string | null;
  imageAlt?: string;
  gameVersion?: string | null;
  signalLabel?: string;
}

export function EntityHero({
  name,
  subtitle,
  eyebrow,
  stars,
  description,
  backHref = "/database/characters",
  backLabel = "Database index",
  tags = [],
  image,
  imageAlt,
  gameVersion,
  signalLabel = "Canonical record",
}: EntityHeroProps) {
  return (
    <section className="character-detail-hero">
      {backHref && (
        <Link className="banner-back-link" href={backHref}>
          <ArrowLeft size={13} /> {backLabel}
        </Link>
      )}

      <div className="character-detail-copy">
        {eyebrow && (
          <span className="banner-kicker">
            <Orbit size={13} /> {eyebrow}
          </span>
        )}

        {typeof stars === "number" && stars > 0 && (
          <span className="character-stars">{"✦".repeat(stars)}</span>
        )}

        <h1>
          {name}
          {subtitle ? <em>{subtitle}</em> : null}
        </h1>

        {description ? <p>{description}</p> : null}

        {tags.length > 0 && (
          <div className="character-tags">
            {tags.map((tag, idx) => (
              <span key={idx}>
                {tag.icon}
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="character-detail-art flex items-center justify-center p-6">
        <span className="history-orbit" />
        {image ? (
          <div className="w-56 h-56 sm:w-72 sm:h-72 relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt || `${name} artwork`}
              className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            />
          </div>
        ) : (
          <span className="banner-character-fallback">{name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>

      <div className="history-hero-signal">
        <span>
          <i /> {signalLabel}
        </span>
        <strong>REVISION {gameVersion ?? "LIVE"}</strong>
      </div>
    </section>
  );
}
