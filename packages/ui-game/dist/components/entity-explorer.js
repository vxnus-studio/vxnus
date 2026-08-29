"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Flame, Droplets, Wind, Zap, Snowflake, Leaf, Mountain, Star, HelpCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
export const defaultKindLabels = {
    characters: "Character",
    weapons: "Weapon",
    materials: "Material",
    domains: "Domain",
    artifacts: "Artifact",
    enemies: "Enemy",
    geographies: "Region",
};
export function getPaginationRange(currentPage, totalPages) {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let prev;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
            range.push(i);
        }
    }
    for (const i of range) {
        if (prev !== undefined) {
            if (i - prev === 2) {
                rangeWithDots.push(prev + 1);
            }
            else if (i - prev !== 1) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        prev = i;
    }
    return rangeWithDots;
}
export function EntityImage({ entity }) {
    const [error, setError] = useState(false);
    if (!entity.image || error) {
        return (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-[var(--surface-sunken)]", children: _jsx("span", { className: "text-4xl font-bold text-[var(--accent)] opacity-20", children: entity.name.slice(0, 2).toUpperCase() }) }));
    }
    return (_jsx("img", { src: entity.image, alt: entity.name, onError: () => setError(true), className: "w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" }));
}
export function EntityExplorer({ kind, compact = false, kindLabels = defaultKindLabels, apiEndpoint = "/api/entities", getDetailHref, renderElementBadge, }) {
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const explorerRef = useRef(null);
    const handlePageChange = (newPage) => {
        setPage(newPage);
        if (explorerRef.current) {
            const topOffset = explorerRef.current.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
    };
    useEffect(() => {
        let active = true;
        const params = new URLSearchParams({
            limit: compact ? "12" : "24",
            page: page.toString()
        });
        if (kind)
            params.set("kind", kind);
        if (submittedQuery)
            params.set("q", submittedQuery);
        fetch(`${apiEndpoint}?${params}`)
            .then((response) => {
            if (!response.ok)
                throw new Error("The knowledge API is unavailable.");
            return response.json();
        })
            .then((payload) => {
            if (active)
                setResult(payload);
        })
            .catch((cause) => {
            if (active) {
                setError(cause instanceof Error ? cause.message : "Search failed.");
            }
        })
            .finally(() => {
            if (active)
                setLoading(false);
        });
        return () => {
            active = false;
        };
    }, [apiEndpoint, compact, kind, page, submittedQuery]);
    function submit(event) {
        event.preventDefault();
        setSubmittedQuery(query);
        setPage(1); // Reset to page 1 on new search
    }
    const totalPages = result ? Math.ceil(result.total / result.limit) : 0;
    const paginationRange = totalPages > 1 ? getPaginationRange(page, totalPages) : [];
    const defaultElementBadge = (element) => {
        if (!element)
            return null;
        const el = element.toLowerCase();
        const props = { size: 14, strokeWidth: 2.5, className: "drop-shadow-sm" };
        // Genshin + Star Rail element matches
        if (el.includes("pyro") || el === "fire")
            return _jsx(Flame, { ...props, color: "#ff5a5a" });
        if (el.includes("hydro") || el === "water")
            return _jsx(Droplets, { ...props, color: "#45b6ff" });
        if (el.includes("anemo") || el === "wind")
            return _jsx(Wind, { ...props, color: "#5ceda1" });
        if (el.includes("electro") || el.includes("lightning") || el.includes("thunder"))
            return _jsx(Zap, { ...props, color: "#c65df5" });
        if (el.includes("cryo") || el === "ice")
            return _jsx(Snowflake, { ...props, color: "#99ffff" });
        if (el.includes("dendro"))
            return _jsx(Leaf, { ...props, color: "#85cc33" });
        if (el.includes("geo") || el === "physical")
            return _jsx(Mountain, { ...props, color: "#ffb13b" });
        if (el.includes("quantum"))
            return _jsx(Zap, { ...props, color: "#6375f0" });
        if (el.includes("imaginary"))
            return _jsx(Star, { ...props, color: "#f5c842" });
        return _jsx(HelpCircle, { ...props, color: "#ffffff" });
    };
    const getBadge = renderElementBadge ?? defaultElementBadge;
    return (_jsxs("section", { ref: explorerRef, className: "entity-explorer", "aria-busy": loading, children: [_jsxs("form", { className: "entity-search", onSubmit: submit, children: [_jsxs("label", { children: [_jsxs("span", { className: "sr-only", children: ["Search ", kind ? kindLabels[kind] ?? kind : "all entities"] }), _jsx("input", { onChange: (event) => setQuery(event.target.value), placeholder: kind ? `Search ${kind}…` : "Search characters, weapons, domains…", type: "search", value: query })] }), _jsx("button", { type: "submit", children: "Search graph" })] }), _jsxs("div", { className: "entity-result-meta", children: [_jsx("span", { children: loading
                            ? "Querying knowledge graph…"
                            : `${result?.total ?? 0} ${kind ?? "entities"} shown` }), result?.preview ? (_jsx("span", { className: "preview-pill", children: "Preview data \u00B7 connect Neon for full results" })) : null] }), error ? _jsx("p", { className: "data-error", children: error }) : null, !loading && !error && result?.items.length === 0 ? (_jsxs("div", { className: "empty-knowledge", children: [_jsx("strong", { children: "No matching records" }), _jsx("span", { children: submittedQuery
                            ? `Nothing matched “${submittedQuery}”.`
                            : "Run the first sync after connecting Neon." })] })) : null, _jsx("div", { className: "entity-grid mt-6 gap-6", children: result?.items.map((entity) => {
                    let rarityColor = "rgba(255, 255, 255, 0.1)"; // Default border
                    let rarityGlow = "transparent";
                    if (entity.rarity === 5) {
                        rarityColor = "#d4af37";
                        rarityGlow = "rgba(212, 175, 55, 0.4)";
                    }
                    else if (entity.rarity === 4) {
                        rarityColor = "#a366ff";
                        rarityGlow = "rgba(163, 102, 255, 0.4)";
                    }
                    else if (entity.rarity === 3) {
                        rarityColor = "#4da6ff";
                        rarityGlow = "rgba(77, 166, 255, 0.4)";
                    }
                    const ElementIcon = getBadge(entity.element);
                    if (entity.kind === "characters") {
                        const charHref = getDetailHref
                            ? getDetailHref(entity)
                            : `/characters/${entity.slug}`;
                        return (_jsxs(Link, { href: charHref, className: "group relative flex flex-col rounded-xl overflow-hidden aspect-square bg-[var(--surface-sunken)] border border-white/5 transition-all duration-300 hover:-translate-y-2 col-span-1", style: {
                                boxShadow: `0 4px 20px -2px rgba(0,0,0,0.5), 0 0 15px ${rarityGlow}`,
                                borderBottom: `4px solid ${rarityColor}`
                            }, children: [_jsx("div", { className: "absolute inset-0 z-0 bg-[var(--surface)] transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center", children: entity.image ? (_jsx("img", { src: entity.image, alt: entity.name, className: "w-full h-full object-cover object-center", onError: (e) => { e.target.style.display = 'none'; } })) : (_jsx("div", { className: "flex items-center justify-center w-full h-full font-mono text-xl text-[var(--green-2)]", children: entity.name.slice(0, 2).toUpperCase() })) }), _jsx("div", { className: "absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" }), ElementIcon && (_jsx("div", { className: "absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg group-hover:bg-black/60 transition-colors", title: entity.element, children: ElementIcon })), _jsxs("div", { className: "relative z-20 mt-auto p-4 flex flex-col justify-end h-full pointer-events-none", children: [_jsx("h2", { className: "text-white font-extrabold text-center text-base sm:text-lg leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide", children: entity.name }), _jsx("div", { className: "w-8 h-0.5 bg-white/30 mx-auto mt-2 rounded-full group-hover:w-12 transition-all duration-300", style: { backgroundColor: rarityColor } })] })] }, `${entity.kind}:${entity.id}`));
                    }
                    const detailHref = getDetailHref
                        ? getDetailHref(entity)
                        : `/database/${entity.kind}/${entity.slug}`;
                    return (_jsxs(Link, { href: detailHref, className: "entity-card group", children: [_jsxs("span", { className: "entity-card-mark relative", children: [entity.image ? (_jsx("img", { src: entity.image, alt: entity.name, onError: (e) => { e.target.style.display = 'none'; } })) : (_jsx("span", { children: entity.name.slice(0, 2).toUpperCase() })), ElementIcon && (_jsx("div", { className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-sm", title: entity.element, children: ElementIcon }))] }), _jsx("div", { className: "entity-card-info", children: _jsx("h2", { children: entity.name }) })] }, `${entity.kind}:${entity.id}`));
                }) }), result && totalPages > 1 && (_jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--line)] w-full", children: [_jsxs("div", { className: "text-xs text-[var(--text-3)] font-mono text-center sm:text-left", children: ["Showing ", _jsx("span", { className: "text-[var(--text-light)] font-semibold", children: (page - 1) * result.limit + 1 }), "\u2013", _jsx("span", { className: "text-[var(--text-light)] font-semibold", children: Math.min(page * result.limit, result.total) }), " of", " ", _jsx("span", { className: "text-[var(--text-light)] font-semibold", children: result.total }), " entities"] }), _jsxs("div", { className: "flex sm:hidden items-center justify-center gap-1.5 w-full", children: [_jsx("button", { disabled: page <= 1, onClick: () => handlePageChange(1), className: "p-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-[var(--text-3)] hover:text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "First page", "aria-label": "First page", children: _jsx(ChevronsLeft, { size: 16 }) }), _jsx("button", { disabled: page <= 1, onClick: () => handlePageChange(Math.max(1, page - 1)), className: "p-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-[var(--text-2)] hover:text-white hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "Previous page", "aria-label": "Previous page", children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("div", { className: "px-3.5 py-1.5 bg-[var(--surface-sunken)] border border-[var(--line)] rounded-lg text-xs font-mono text-[var(--text-2)] flex items-center gap-1.5 shadow-inner", children: [_jsx("span", { className: "text-[var(--green)] font-bold", children: page }), _jsx("span", { className: "text-[var(--text-3)]", children: "/" }), _jsx("span", { className: "text-[var(--text-light)]", children: totalPages })] }), _jsx("button", { disabled: page >= totalPages, onClick: () => handlePageChange(Math.min(totalPages, page + 1)), className: "p-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-[var(--text-2)] hover:text-white hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "Next page", "aria-label": "Next page", children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { disabled: page >= totalPages, onClick: () => handlePageChange(totalPages), className: "p-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-[var(--text-3)] hover:text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "Last page", "aria-label": "Last page", children: _jsx(ChevronsRight, { size: 16 }) })] }), _jsxs("div", { className: "hidden sm:flex items-center gap-1.5 sm:gap-2", children: [_jsx("button", { disabled: page <= 1, onClick: () => handlePageChange(1), className: "p-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-[var(--text-3)] hover:text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "First page", "aria-label": "First page", children: _jsx(ChevronsLeft, { size: 16 }) }), _jsxs("button", { disabled: page <= 1, onClick: () => handlePageChange(Math.max(1, page - 1)), className: "flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-xs text-[var(--text-2)] hover:text-white hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "Previous page", "aria-label": "Previous page", children: [_jsx(ChevronLeft, { size: 16 }), _jsx("span", { className: "hidden sm:inline", children: "Prev" })] }), _jsx("div", { className: "flex items-center gap-1", children: paginationRange.map((pageNum, idx) => {
                                    if (pageNum === "...") {
                                        return (_jsx("span", { className: "px-2 py-1 text-xs text-[var(--text-3)] font-mono select-none", children: "\u2026" }, `dots-${idx}`));
                                    }
                                    const isCurrent = pageNum === page;
                                    return (_jsx("button", { onClick: () => handlePageChange(pageNum), "aria-current": isCurrent ? "page" : undefined, className: `min-w-[36px] h-9 px-2 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all duration-200 ${isCurrent
                                            ? "bg-[var(--green)] text-[#081610] shadow-[0_0_14px_rgba(98,213,163,0.35)] border border-[var(--green)]"
                                            : "bg-[var(--surface-sunken)] text-[var(--text-2)] border border-[var(--line)] hover:bg-[var(--surface-2)] hover:border-[var(--line-strong)] hover:text-white"}`, children: pageNum }, `page-${pageNum}`));
                                }) }), _jsxs("button", { disabled: page >= totalPages, onClick: () => handlePageChange(Math.min(totalPages, page + 1)), className: "flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-xs text-[var(--text-2)] hover:text-white hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "Next page", "aria-label": "Next page", children: [_jsx("span", { className: "hidden sm:inline", children: "Next" }), _jsx(ChevronRight, { size: 16 })] }), _jsx("button", { disabled: page >= totalPages, onClick: () => handlePageChange(totalPages), className: "p-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--line)] text-[var(--text-3)] hover:text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-150", title: "Last page", "aria-label": "Last page", children: _jsx(ChevronsRight, { size: 16 }) })] })] }))] }));
}
