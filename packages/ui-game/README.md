# @vxnus/ui-game

Shared UI package for game knowledge base and data exploration applications (e.g. `e-teyvat`, `e-schale`).

## What's included

### 1. Components
* **`Topbar`**: Sticky top navigation bar with brand mark, title, subtext, and live knowledge base status pill.
* **`Sidebar`**: Desktop rail navigation with animated tooltips and active route indicators.
* **`MobileBottomNav`**: Mobile bottom bar and expandable overlay drawer sheet.
* **`DatabaseShell`**: Standardized database section header layout with eyebrow, title, and description.
* **`EntityExplorer`**: Searchable and paginated entity catalog with rarity badges, category pills, mobile-optimized pagination, and responsive grid.
* **`EntityHero`**: Cinematic detail page hero header with dynamic artwork rendering, stars, element/path badges, and background orbits.
* **`FactsGrid`**: Telemetry and specification grid cards for canonical entities.
* **`ProgressionCalculator`**: Interactive ascension & talent progression calculator with exact farming material quotas.
* **`KnowledgeConsole`**: Multi-hop entity and farming relation graph console.
* **`KnowledgeStatus`**: Auto-polling service telemetry pill for `/api/health`.
* **`Icon`** / **`BrandMark`**: Canonical SVG icon system and brand marks.

### 2. Styling & Theme Tokens
All components use CSS variables for theming so each game can brand itself with custom color tokens:

```css
:root {
  --bg: #0a110f;             /* Background base */
  --surface: #111c18;        /* Surface base */
  --surface-2: #16231e;      /* Elevated surface */
  --surface-3: #1a2b24;      /* Deep surface */
  --surface-sunken: #0c1512; /* Inset/sunken backgrounds */
  --surface-raised: #182821; /* Card backgrounds */
  --line: rgba(190, 220, 205, 0.1);
  --line-strong: rgba(190, 220, 205, 0.17);
  --text: #eff7f3;
  --text-light: #f5faf7;
  --text-2: #a1b3aa;
  --text-3: #667970;
  --text-muted: #738a7f;
  --green: #62d5a3;          /* Main game accent */
  --green-2: #9aebc7;        /* Secondary game accent */
  --gold: #e2b96a;           /* Highlight / 5-star gold */
  --accent: #62d5a3;
  --radius: 11px;
}
```

## Quick Start for a New Game (e.g., E-Schale)

```tsx
import {
  Topbar,
  Sidebar,
  MobileBottomNav,
  EntityExplorer,
  type NavItem,
  type DrawerSection,
} from "@vxnus/ui-game";
import "@vxnus/ui-game/styles.css";

const schaleNavigation: NavItem[] = [
  { label: "Home", icon: "home", href: "/" },
  { label: "Students", icon: "users", href: "/database/students/" },
  { label: "Weapons", icon: "sword", href: "/database/weapons/" },
  { label: "Banners", icon: "calendar", href: "/database/banners/" },
  { label: "Knowledge", icon: "quest", href: "/knowledge/" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <Topbar
        brandName="E-Schale"
        brandSubtext="by VXNUS"
        homeHref="/"
      />
      <Sidebar items={schaleNavigation} />
      <main className="main-content">
        <div className="content-wrap">{children}</div>
      </main>
      <MobileBottomNav
        primaryItems={schaleNavigation.slice(0, 4)}
        drawerSections={schaleDrawerSections}
        drawerTitle="E-Schale Directory"
      />
    </div>
  );
}
```
