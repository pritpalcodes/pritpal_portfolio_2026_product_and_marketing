import { useEffect, useState } from "react";
import {
  Home,
  FlaskConical,
  Briefcase,
  Award,
  PenLine,
  Mail,
} from "lucide-react";

const ITEMS = [
  { id: "home", icon: Home },
  { id: "playground", icon: FlaskConical },
  { id: "experience", icon: Briefcase },
  { id: "certifications", icon: Award },
  { id: "writing", icon: PenLine },
  { id: "contact", icon: Mail },
];

export default function MobileNav({ active, onNavigate, certificationsUrl }) {
  return (
    <nav
      data-testid="mobile-nav"
      className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-2 py-2 rounded-full bg-white/95 backdrop-blur-md border border-black/5 soft-shadow"
    >
      {ITEMS.map(({ id, icon: Icon }) => {
        const isActive = active === id;
        const isCert = id === "certifications";
        return (
          <button
            key={id}
            data-testid={`mnav-${id}`}
            onClick={() => {
              if (isCert && certificationsUrl) {
                window.open(certificationsUrl, "_blank", "noopener");
              } else {
                onNavigate(id);
              }
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              isActive ? "bg-orange-500 text-white" : "text-neutral-700"
            }`}
          >
            <Icon size={16} strokeWidth={1.7} />
          </button>
        );
      })}
    </nav>
  );
}
