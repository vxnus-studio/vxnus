import { type ReactNode } from "react";
import type { FactItem } from "../types";

export interface FactsGridProps {
  facts: FactItem[];
  className?: string;
}

export function FactsGrid({ facts, className = "" }: FactsGridProps) {
  return (
    <section className={`character-facts ${className}`}>
      {facts.map((fact, idx) => (
        <article key={idx}>
          <small>{fact.label}</small>
          <strong>{fact.value}</strong>
        </article>
      ))}
    </section>
  );
}
