import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export function DatabaseShell({ eyebrow, title, description, children, }) {
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "database-page-heading", children: [_jsx("span", { children: eyebrow }), _jsx("h1", { children: title }), _jsx("p", { children: description })] }), children] }));
}
