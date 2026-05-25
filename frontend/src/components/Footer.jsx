import site from "../data/site.json";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="footer"
      className="relative px-6 sm:px-12 py-10 text-center text-xs text-neutral-400"
    >
      © {site.name} {year} · v1.0 · Built with curiosity
    </footer>
  );
}
