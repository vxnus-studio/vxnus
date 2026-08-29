import type { AscensionPhase, MaterialItem, TalentLevel } from "../types";
export interface ProgressionCalculatorProps {
    ascensionPhases: AscensionPhase[];
    totalAscensionMaterials: MaterialItem[];
    talentLevels?: TalentLevel[];
    totalTalentMaterials?: MaterialItem[];
    titlePrefix?: string;
    maxAscensionLevel?: string;
    materialHrefPrefix?: string;
}
export declare function ProgressionCalculator({ ascensionPhases, totalAscensionMaterials, talentLevels, totalTalentMaterials, titlePrefix, maxAscensionLevel, materialHrefPrefix, }: ProgressionCalculatorProps): import("react").JSX.Element;
//# sourceMappingURL=progression-calculator.d.ts.map