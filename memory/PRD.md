# Pritpal Singh — Portfolio · PRD

## Original Problem Statement
Build a premium, highly interactive personal portfolio for a Product Manager / Growth / Product Strategy profile, inspired by Dinesh Senapati's interaction patterns. Minimal, editorial, paper aesthetic with subtle #F97316 orange accent. Content (projects, experience, writing, playground) loaded from local JSON. React stack, frontend-only.

### Major Redesign (Dec 2025)
- Merge Hero + About into a single intro section. New tagline.
- Top-right clock / location / "Open to product conversations" removed.
- Resume CTA → orange button with animated orbiting outline; Copy Email stays neutral.
- "Scroll to Read" moved to fixed bottom-center; fades on scroll.
- Top-only orange gradient glow (not following scroll).
- Custom cursor + hero image click labels removed (default cursor everywhere).
- Sidebar: replace "Contact" with a divider + LinkedIn icon (opens LinkedIn certifications URL).
- Footer / Contact: remove GitHub, Twitter, Medium pills. Keep LinkedIn + Resume + Email.
- Writing list items each open on their own page (`/writing/:slug`) with reading layout + reading progress bar.
- Playground cards each open on their own page (`/playground/:slug`) with alternating sections + gallery.
- New global feature: clicking anywhere on the site triggers a firecracker "pop" — WebAudio synth + small expanding orange ring + tiny dot particles at click position.
- Profile shows a LinkedIn-style green "Open to Work" badge ring.

## Stack
- React 19 + CRA (craco)
- TailwindCSS + shadcn primitives
- Framer Motion (intros, scroll fades, palette, scroll progress, pop visuals)
- Lenis (smooth scrolling)
- Lucide icons
- Fonts: Instrument Serif (display), Manrope (body), JetBrains Mono (mono)
- WebAudio API for click-pop sound (no external audio files)

## Architecture
```
/app/frontend/src/
  App.js                       # Router + Lenis + ScrollProgress + ClickPop
  pages/
    Home.jsx                   # Sidebar + sections + IntersectionObserver
    ProjectDetail.jsx          # /projects/:slug
    WritingDetail.jsx          # /writing/:slug (editorial reading layout + reading bar)
    PlaygroundDetail.jsx       # /playground/:slug (case-study layout + gallery)
  components/
    Sidebar.jsx                # Home/Playground/Experience/Certifications/Writing | LinkedIn
    MobileNav.jsx              # Same set, pill-shaped, bottom on mobile
    Hero.jsx                   # Merged intro w/ Open-to-Work badge + orange orbit CTA
    ProjectSection.jsx         # Left-list + right-preview pattern
    PlaygroundSection.jsx      # Hover-rotate cards → /playground/:slug
    ExperienceSection.jsx      # Dotted-line timeline
    WritingSection.jsx         # Editorial list → /writing/:slug
    ContactSection.jsx         # Email pill + LinkedIn / Resume / Email only
    Footer.jsx
    CommandPalette.jsx         # CMD/CTRL + K
    ScrollProgress.jsx         # Thin left orange line
    ScrollNudge.jsx            # Fixed bottom-center, fades on scroll
    EasterEgg.jsx              # Type "product" → quote toast
    ClickPop.jsx               # Global click → audio pop + ring + dots
  data/
    site.json                  # Identity, socials, openToWork, tagline
    projects.json              # 5 case studies
    experience.json            # 6 roles
    playground.json            # 6 experiments w/ slug/body/gallery
    writing.json               # 5 essays w/ slug/body/cover
  lib/highlight.jsx            # Auto-wrap growth/AI/storytelling/experiments/B2B SaaS/Figma/etc.
/app/frontend/public/
  assets/Pritpal_Singh_Resume.pdf
```

## What's Implemented (Dec 2025)
- All 22 redesign requirements verified by testing agent (100% pass on iteration_2)
- WebAudio synthesised pop on every click + visual ring + 6 firecracker dots at cursor
- Open-to-Work green ring on avatar + small green pill
- Orange Download Resume button with conic-gradient `@property --orbit-angle` rotating halo
- Scroll-to-Read floats at bottom-center, fades by ~120px scroll
- Top-only paper-bg with radial orange glow (no scroll-following overlay)
- Editorial Writing detail pages w/ reading-progress bar + Next essay link
- Playground detail pages w/ alternating sections, gallery, captions, Next project link

## Prioritised Backlog
- P1: Real profile photo (currently Unsplash placeholder)
- P2: Add 'projects' ID to IntersectionObserver list for sidebar dot accuracy
- P2: Move EasterEgg key buffer to ref to avoid listener re-attach
- P2: Real long-form bodies for the remaining 4 writing pieces (currently "coming soon" stubs)
- P3: Per-playground screenshots once real assets exist
- P3: Light / dark theme toggle
- P3: OG meta per case study / essay

## Next Tasks
1. Drop in a real profile photo.
2. Publish 1–2 full-length writing pieces.
3. Add real screenshots to the playground gallery.
