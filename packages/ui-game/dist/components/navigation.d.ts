import { type ReactNode } from "react";
import type { IconName, NavItem, DrawerSection } from "../types";
export interface IconProps {
    name: IconName;
    size?: number;
    className?: string;
}
export declare function Icon({ name, size, className }: IconProps): import("react").JSX.Element;
export declare function BrandMark(): import("react").JSX.Element;
export interface TopbarProps {
    brandName?: ReactNode;
    brandSubtext?: ReactNode;
    homeHref?: string;
    brandLogo?: ReactNode;
    statusSlot?: ReactNode;
    homeAriaLabel?: string;
}
export declare function Topbar({ brandName, brandSubtext, homeHref, brandLogo, statusSlot, homeAriaLabel, }: TopbarProps): import("react").JSX.Element;
export interface SidebarProps {
    items: NavItem[];
    statusTitle?: string;
    navAriaLabel?: string;
}
export declare function Sidebar({ items, statusTitle, navAriaLabel, }: SidebarProps): import("react").JSX.Element;
export interface MobileBottomNavProps {
    primaryItems: NavItem[];
    drawerSections: DrawerSection[];
    drawerTitle?: string;
    drawerSubtext?: string;
    moreLabel?: string;
    closeLabel?: string;
    navAriaLabel?: string;
}
export declare function MobileBottomNav({ primaryItems, drawerSections, drawerTitle, drawerSubtext, moreLabel, closeLabel, navAriaLabel, }: MobileBottomNavProps): import("react").JSX.Element;
//# sourceMappingURL=navigation.d.ts.map