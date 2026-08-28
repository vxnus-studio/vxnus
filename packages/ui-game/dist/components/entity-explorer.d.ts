import { type ReactNode } from "react";
import type { EntityPreview } from "../types";
export declare const defaultKindLabels: Record<string, string>;
export declare function getPaginationRange(currentPage: number, totalPages: number): (number | string)[];
export declare function EntityImage({ entity }: {
    entity: EntityPreview;
}): import("react").JSX.Element;
export interface EntityExplorerProps {
    kind?: string;
    compact?: boolean;
    kindLabels?: Record<string, string>;
    apiEndpoint?: string;
    getDetailHref?: (entity: EntityPreview) => string;
    renderElementBadge?: (element: string | null) => ReactNode;
}
export declare function EntityExplorer({ kind, compact, kindLabels, apiEndpoint, getDetailHref, renderElementBadge, }: EntityExplorerProps): import("react").JSX.Element;
//# sourceMappingURL=entity-explorer.d.ts.map