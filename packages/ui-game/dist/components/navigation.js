"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KnowledgeStatus } from "./knowledge-status";
export function Icon({ name, size = 19, className }) {
    const paths = {
        home: _jsxs(_Fragment, { children: [_jsx("path", { d: "m3 10.8 9-7 9 7" }), _jsx("path", { d: "M5 9.5V21h14V9.5M9 21v-7h6v7" })] }),
        users: _jsxs(_Fragment, { children: [_jsx("circle", { cx: "9", cy: "7", r: "3.5" }), _jsx("path", { d: "M3 20c.4-4.3 2.4-6.5 6-6.5s5.6 2.2 6 6.5M16 4.8a3.4 3.4 0 0 1 0 6.5M17 14c2.5.6 3.8 2.5 4 5.3" })] }),
        sword: _jsxs(_Fragment, { children: [_jsx("path", { d: "m14.5 4.5 5-1-1 5L8 19l-3 1 1-3Z" }), _jsx("path", { d: "m11 12 3 3M5 14l5 5" })] }),
        artifact: _jsxs(_Fragment, { children: [_jsx("path", { d: "m12 3 6 4v10l-6 4-6-4V7Z" }), _jsx("path", { d: "m12 7 3.5 2v6L12 17l-3.5-2V9Z" })] }),
        enemy: _jsxs(_Fragment, { children: [_jsx("path", { d: "m6 8-3-4 5 2 4-3 4 3 5-2-3 4 1 4c0 5-3 9-7 9s-7-4-7-9Z" }), _jsx("path", { d: "m9 12 2 1M15 12l-2 1M10 17h4" })] }),
        quest: _jsxs(_Fragment, { children: [_jsx("path", { d: "M5 3h14v18H5z" }), _jsx("path", { d: "M8 7h8M8 11h8M8 15h5" })] }),
        map: _jsxs(_Fragment, { children: [_jsx("path", { d: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" }), _jsx("path", { d: "M9 3v15M15 6v15" })] }),
        calendar: _jsxs(_Fragment, { children: [_jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }), _jsx("path", { d: "M7 3v4M17 3v4M3 10h18M8 14h2M14 14h2M8 18h2" })] }),
        chevron: _jsx("path", { d: "m9 18 6-6-6-6" }),
        clock: _jsxs(_Fragment, { children: [_jsx("circle", { cx: "12", cy: "12", r: "9" }), _jsx("path", { d: "M12 7v5l3 2" })] }),
        menu: _jsx("path", { d: "M4 6h16M4 12h16M4 18h16" }),
        grid: _jsxs(_Fragment, { children: [_jsx("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1.5" }), _jsx("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1.5" }), _jsx("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1.5" }), _jsx("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1.5" })] }),
        x: _jsx("path", { d: "m18 6-12 12M6 6l12 12" }),
        sparkles: _jsx(_Fragment, { children: _jsx("path", { d: "m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" }) }),
        code: _jsxs(_Fragment, { children: [_jsx("polyline", { points: "16 18 22 12 16 6" }), _jsx("polyline", { points: "8 6 2 12 8 18" })] }),
    };
    return (_jsx("svg", { "aria-hidden": "true", className: className ? `icon ${className}` : "icon", fill: "none", height: size, viewBox: "0 0 24 24", width: size, children: paths[name] }));
}
export function BrandMark() {
    return (_jsx("span", { className: "brand-mark", "aria-hidden": "true", children: _jsx("span", {}) }));
}
export function Topbar({ brandName = "E-Teyvat", brandSubtext = (_jsxs(_Fragment, { children: ["by", " ", _jsx("a", { href: "https://vxnus.xyz", target: "_blank", rel: "noopener noreferrer", children: "VXNUS" })] })), homeHref = "/", brandLogo = _jsx(BrandMark, {}), statusSlot = _jsx(KnowledgeStatus, {}), homeAriaLabel = "Home", }) {
    return (_jsxs("header", { className: "topbar", children: [_jsx(Link, { className: "topbar-logo", href: homeHref, "aria-label": homeAriaLabel, children: brandLogo }), _jsxs("div", { className: "topbar-brand", children: [_jsx(Link, { href: homeHref, children: _jsx("strong", { children: brandName }) }), brandSubtext && _jsx("span", { children: brandSubtext })] }), statusSlot] }));
}
export function Sidebar({ items, statusTitle = "Database online", navAriaLabel = "Database navigation", }) {
    const pathname = usePathname();
    const isActive = (item) => item.exact || item.href === "/"
        ? pathname === item.href
        : pathname.startsWith(item.href.replace(/\/$/, ""));
    return (_jsxs("aside", { className: "sidebar", children: [_jsx("nav", { "aria-label": navAriaLabel, children: items.map((item) => (_jsxs(Link, { className: `rail-link ${isActive(item) ? "active" : ""}`, href: item.href, "aria-label": item.label, children: [_jsx(Icon, { name: item.icon }), _jsx("span", { className: "rail-tooltip", children: item.label })] }, item.label))) }), _jsx("span", { className: "rail-status", title: statusTitle, children: _jsx("i", {}) })] }));
}
export function MobileBottomNav({ primaryItems, drawerSections, drawerTitle = "Navigation & Directory", drawerSubtext = "Browse all knowledge archives", moreLabel = "More", closeLabel = "Close", navAriaLabel = "Mobile navigation", }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setIsOpen(false);
    }
    const isActive = (item) => item.href === "/"
        ? pathname === item.href
        : pathname.startsWith(item.href.replace(/\/$/, ""));
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: "mobile-bottom-nav", "aria-label": navAriaLabel, children: [primaryItems.map((item) => (_jsxs(Link, { className: isActive(item) && !isOpen ? "active" : "", href: item.href, children: [_jsx(Icon, { name: item.icon, size: 19 }), _jsx("span", { children: item.label })] }, item.label))), _jsxs("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: `mobile-more-btn ${isOpen ? "active" : ""}`, "aria-label": isOpen ? "Close menu" : "Open all pages menu", "aria-expanded": isOpen, children: [_jsx(Icon, { name: isOpen ? "x" : "grid", size: 19 }), _jsx("span", { children: isOpen ? closeLabel : moreLabel })] })] }), isOpen && (_jsx("div", { className: "mobile-drawer-overlay", onClick: () => setIsOpen(false), children: _jsxs("div", { className: "mobile-drawer-sheet", onClick: (e) => e.stopPropagation(), role: "dialog", "aria-modal": "true", "aria-label": "All pages directory", children: [_jsxs("div", { className: "mobile-drawer-header", children: [_jsxs("div", { children: [_jsx("strong", { children: drawerTitle }), drawerSubtext && _jsx("p", { children: drawerSubtext })] }), _jsx("button", { type: "button", className: "mobile-drawer-close", onClick: () => setIsOpen(false), "aria-label": "Close menu", children: _jsx(Icon, { name: "x", size: 18 }) })] }), _jsx("div", { className: "mobile-drawer-body", children: drawerSections.map((section) => (_jsxs("div", { className: "mobile-drawer-section", children: [_jsx("h3", { children: section.category }), _jsx("div", { className: "mobile-drawer-grid", children: section.items.map((item) => {
                                            const active = isActive(item);
                                            return (_jsxs(Link, { href: item.href, className: `mobile-drawer-link ${active ? "active" : ""}`, onClick: () => setIsOpen(false), children: [_jsx("span", { className: "drawer-link-icon", children: _jsx(Icon, { name: item.icon, size: 17 }) }), _jsxs("div", { className: "drawer-link-content", children: [_jsx("strong", { children: item.label }), _jsx("small", { children: item.desc })] })] }, item.label));
                                        }) })] }, section.category))) })] }) }))] }));
}
