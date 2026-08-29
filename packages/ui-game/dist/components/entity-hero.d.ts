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
export declare function EntityHero({ name, subtitle, eyebrow, stars, description, backHref, backLabel, tags, image, imageAlt, gameVersion, signalLabel, }: EntityHeroProps): import("react").JSX.Element;
//# sourceMappingURL=entity-hero.d.ts.map