import {
  Home,
  FlaskConical,
  Briefcase,
  Award,
  PenLine,
  Linkedin,
} from "lucide-react";

const ITEMS = [
  { id: "home", icon: Home, type: "nav" },
  { id: "playground", icon: FlaskConical, type: "nav" },
  { id: "experience", icon: Briefcase, type: "nav" },
  { id: "certifications", icon: Award, type: "external" },
  { id: "writing", icon: PenLine, type: "nav" },
  { id: "linkedin", icon: Linkedin, type: "external" },
];

export default function MobileNav({ active, onNavigate, externalUrls }) {
  return (
    <nav
      data-testid="mobile-nav"
      className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-2 py-2 rounded-full bg-white/95 backdrop-blur-md border border-black/5 soft-shadow"
    >
      {ITEMS.map(({ id, icon: Icon, type }) => {
        const isActive = active === id;
        const isExternal = type === "external";
        return (
          <button
            key={id}
            data-testid={`mnav-${id}`}
            onClick={() => {
              if (isExternal && externalUrls && externalUrls[id]) {
                window.open(externalUrls[id], "_blank", "noopener");
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
