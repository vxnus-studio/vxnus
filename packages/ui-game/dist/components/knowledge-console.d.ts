export interface Source {
    type?: string;
    kind?: string;
    name: string;
    slug?: string;
    region?: string;
    availableDays?: string[];
    domainEntrance?: string | null;
}
export interface Material {
    id?: string;
    name: string;
    slug?: string;
    quantity?: number | null;
    quantities?: Record<string, number>;
    phase?: string;
    sources: Source[];
    sourceNotes?: string[];
}
export interface FarmingResponse {
    target: {
        id?: string;
        name: string;
        kind: string;
        slug: string;
    };
    materials: Material[];
    revision: string | null;
    preview: boolean;
    error?: string;
}
export interface KnowledgeConsoleProps {
    defaultTarget?: string;
    placeholder?: string;
    apiEndpoint?: string;
    questionLabel?: string;
    questionPrefix?: string;
    questionSuffix?: string;
    getEntityHref?: (target: {
        id?: string;
        name: string;
        kind: string;
        slug: string;
    }) => string;
}
export declare function KnowledgeConsole({ defaultTarget, placeholder, apiEndpoint, questionLabel, questionPrefix, questionSuffix, getEntityHref, }: KnowledgeConsoleProps): import("react").JSX.Element;
//# sourceMappingURL=knowledge-console.d.ts.map