import React from "react";

const KEYWORDS = [
  "growth",
  "users",
  "experiments",
  "experiment",
  "product",
  "products",
  "scale",
  "scaling",
  "AI",
  "metrics",
  "strategy",
  "retention",
  "0→1",
  "marketplaces",
  "marketplace",
  "monetisation",
  "monetization",
];

/**
 * Splits a string into highlighted spans for known keywords.
 * Case-insensitive, preserves original casing.
 */
export function highlight(text) {
  if (!text) return text;
  // build regex once, sorted by length desc so multi-word matches first
  const sorted = [...KEYWORDS].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${sorted.map(escape).join("|")})\\b`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (KEYWORDS.some((kw) => kw.toLowerCase() === part.toLowerCase())) {
      return (
        <span className="kw" key={i} data-testid={`kw-${i}`}>
          {part}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function escape(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
