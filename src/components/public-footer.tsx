import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "./github-icon";
import { site } from "@/lib/site";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div>
        <p className="footer-mark" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Image src="/logo.svg" alt="" width={32} height={32} style={{ display: 'block', height: '1.4em', width: 'auto' }} />
          VXNUS
        </p>
        <p>Technology Creative Studio.</p>
      </div>
      <div className="footer-meta">
        <span>Article is the beginning of better products.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link href="/about">About the studio</Link>
          <a href="/feed.xml" target="_blank" rel="noopener noreferrer">RSS Feed</a>
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-github-link"
            aria-label={`GitHub repository: ${site.github.name}`}
          >
            <GithubIcon size={14} />
            <span>{site.github.name}</span>
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© VXNUS Studio</p>
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY-NC 4.0
        </a>
      </div>
    </footer>
  );
}


