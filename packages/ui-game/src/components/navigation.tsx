"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KnowledgeStatus } from "./knowledge-status";
import type { IconName, NavItem, DrawerSection } from "../types";

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 19, className }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 10.8 9-7 9 7" /><path d="M5 9.5V21h14V9.5M9 21v-7h6v7" /></>,
    users: <><circle cx="9" cy="7" r="3.5" /><path d="M3 20c.4-4.3 2.4-6.5 6-6.5s5.6 2.2 6 6.5M16 4.8a3.4 3.4 0 0 1 0 6.5M17 14c2.5.6 3.8 2.5 4 5.3" /></>,
    sword: <><path d="m14.5 4.5 5-1-1 5L8 19l-3 1 1-3Z" /><path d="m11 12 3 3M5 14l5 5" /></>,
    artifact: <><path d="m12 3 6 4v10l-6 4-6-4V7Z" /><path d="m12 7 3.5 2v6L12 17l-3.5-2V9Z" /></>,
    enemy: <><path d="m6 8-3-4 5 2 4-3 4 3 5-2-3 4 1 4c0 5-3 9-7 9s-7-4-7-9Z" /><path d="m9 12 2 1M15 12l-2 1M10 17h4" /></>,
    quest: <><path d="M5 3h14v18H5z" /><path d="M8 7h8M8 11h8M8 15h5" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M8 14h2M14 14h2M8 18h2" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    x: <path d="m18 6-12 12M6 6l12 12" />,
    sparkles: <><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" /></>,
    code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={className ? `icon ${className}` : "icon"}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
    </span>
  );
}

export interface TopbarProps {
  brandName?: ReactNode;
  brandSubtext?: ReactNode;
  homeHref?: string;
  brandLogo?: ReactNode;
  statusSlot?: ReactNode;
  homeAriaLabel?: string;
}

export function Topbar({
  brandName = "E-Teyvat",
  brandSubtext = (
    <>
      by{" "}
      <a href="https://vxnus.xyz" target="_blank" rel="noopener noreferrer">
        VXNUS
      </a>
    </>
  ),
  homeHref = "/",
  brandLogo = <BrandMark />,
  statusSlot = <KnowledgeStatus />,
  homeAriaLabel = "Home",
}: TopbarProps) {
  return (
    <header className="topbar">
      <Link className="topbar-logo" href={homeHref} aria-label={homeAriaLabel}>
        {brandLogo}
      </Link>
      <div className="topbar-brand">
        <Link href={homeHref}>
          <strong>{brandName}</strong>
        </Link>
        {brandSubtext && <span>{brandSubtext}</span>}
      </div>
      {statusSlot}
    </header>
  );
}

export interface SidebarProps {
  items: NavItem[];
  statusTitle?: string;
  navAriaLabel?: string;
}

export function Sidebar({
  items,
  statusTitle = "Database online",
  navAriaLabel = "Database navigation",
}: SidebarProps) {
  const pathname = usePathname();
  const isActive = (item: NavItem) =>
    item.exact || item.href === "/"
      ? pathname === item.href
      : pathname.startsWith(item.href.replace(/\/$/, ""));

  return (
    <aside className="sidebar">
      <nav aria-label={navAriaLabel}>
        {items.map((item) => (
          <Link
            className={`rail-link ${isActive(item) ? "active" : ""}`}
            href={item.href}
            key={item.label}
            aria-label={item.label}
          >
            <Icon name={item.icon} />
            <span className="rail-tooltip">{item.label}</span>
          </Link>
        ))}
      </nav>
      <span className="rail-status" title={statusTitle}>
        <i />
      </span>
    </aside>
  );
}

export interface MobileBottomNavProps {
  primaryItems: NavItem[];
  drawerSections: DrawerSection[];
  drawerTitle?: string;
  drawerSubtext?: string;
  moreLabel?: string;
  closeLabel?: string;
  navAriaLabel?: string;
}

export function MobileBottomNav({
  primaryItems,
  drawerSections,
  drawerTitle = "Navigation & Directory",
  drawerSubtext = "Browse all knowledge archives",
  moreLabel = "More",
  closeLabel = "Close",
  navAriaLabel = "Mobile navigation",
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const isActive = (item: NavItem | { href: string }) =>
    item.href === "/"
      ? pathname === item.href
      : pathname.startsWith(item.href.replace(/\/$/, ""));

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="mobile-bottom-nav" aria-label={navAriaLabel}>
        {primaryItems.map((item) => (
          <Link
            className={isActive(item) && !isOpen ? "active" : ""}
            href={item.href}
            key={item.label}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
          </Link>
        ))}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`mobile-more-btn ${isOpen ? "active" : ""}`}
          aria-label={isOpen ? "Close menu" : "Open all pages menu"}
          aria-expanded={isOpen}
        >
          <Icon name={isOpen ? "x" : "grid"} size={19} />
          <span>{isOpen ? closeLabel : moreLabel}</span>
        </button>
      </nav>

      {/* Mobile Directory Drawer Sheet */}
      {isOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="mobile-drawer-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="All pages directory"
          >
            <div className="mobile-drawer-header">
              <div>
                <strong>{drawerTitle}</strong>
                {drawerSubtext && <p>{drawerSubtext}</p>}
              </div>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              {drawerSections.map((section) => (
                <div key={section.category} className="mobile-drawer-section">
                  <h3>{section.category}</h3>
                  <div className="mobile-drawer-grid">
                    {section.items.map((item) => {
                      const active = isActive(item);
                      return (
                        <Link
                          href={item.href}
                          key={item.label}
                          className={`mobile-drawer-link ${active ? "active" : ""}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="drawer-link-icon">
                            <Icon name={item.icon} size={17} />
                          </span>
                          <div className="drawer-link-content">
                            <strong>{item.label}</strong>
                            <small>{item.desc}</small>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
