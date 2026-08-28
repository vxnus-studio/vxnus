import type { ReactNode } from "react";

export interface DatabaseShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function DatabaseShell({
  eyebrow,
  title,
  description,
  children,
}: DatabaseShellProps) {
  return (
    <>
      <section className="database-page-heading">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      {children}
    </>
  );
}
