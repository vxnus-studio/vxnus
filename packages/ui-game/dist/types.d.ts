export type IconName = "home" | "users" | "sword" | "artifact" | "enemy" | "quest" | "map" | "calendar" | "chevron" | "clock" | "menu" | "grid" | "x" | "sparkles" | "code";
export interface NavItem {
    label: string;
    icon: IconName;
    href: string;
    exact?: boolean;
}
export interface DrawerItem {
    label: string;
    href: string;
    icon: IconName;
    desc: string;
}
export interface DrawerSection {
    category: string;
    items: DrawerItem[];
}
export interface EntityPreview {
    id: number;
    kind: string;
    slug: string;
    name: string;
    description: string | null;
    gameVersion: string | null;
    image: string | null;
    rarity: number | null;
    element: string | null;
}
export interface EntityResponse {
    items: EntityPreview[];
    preview: boolean;
    total: number;
    page: number;
    limit: number;
}
export interface HealthInfo {
    status: string;
    connected: boolean;
    revision?: string | null;
    shortRevision?: string | null;
    gameVersion?: string | null;
    phaseLabel?: string | null;
    entityCount?: number;
}
//# sourceMappingURL=types.d.ts.map