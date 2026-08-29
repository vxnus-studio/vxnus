import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FactsGrid({ facts, className = "" }) {
    return (_jsx("section", { className: `character-facts ${className}`, children: facts.map((fact, idx) => (_jsxs("article", { children: [_jsx("small", { children: fact.label }), _jsx("strong", { children: fact.value })] }, idx))) }));
}
