import { ArrowUpRight, Award } from "lucide-react";
import site from "../data/site.json";

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      data-testid="certifications-section"
      className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto py-24 sm:py-32"
    >
      <div className="mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
          06 · Certifications
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl">
          Things I've studied, <em>signed,</em> and stuck on a wall.
        </h2>
      </div>

      <a
        href={site.socials.certifications}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="cert-link"
        className="group block rounded-2xl bg-white border border-black/5 soft-shadow p-8 sm:p-10 hover:border-orange-200 transition-colors"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Award size={26} strokeWidth={1.6} />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
                View full certifications timeline
              </h3>
              <p className="mt-2 text-sm text-neutral-600 max-w-md">
                I keep the running list on LinkedIn — institutions, dates, and
                credentials, all signed and verified there.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-white text-sm group-hover:bg-orange-500 transition-colors">
            Open on LinkedIn
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </span>
        </div>
      </a>
    </section>
  );
}
