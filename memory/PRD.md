# Pritpal Singh — Portfolio · PRD

## Original Problem Statement
Build a premium, highly interactive personal portfolio for a Product Manager / Growth / Product Strategy profile, inspired by Dinesh Senapati's portfolio (interaction patterns & progressive reveal, not visual clone). Minimal editorial design with subtle #F97316 orange accent. Content (projects, experience, writing) loaded from JSON. Originally requested Next.js 15; platform limitation → built on React (CRA) with the same UX behaviours.

## Stack
- React 19 (CRA via @craco/craco)
- TailwindCSS + shadcn primitives
- Framer Motion (micro-interactions, status bubble, float labels, command palette)
- Lenis (smooth scrolling)
- Lucide icons
- Fonts: Instrument Serif (editorial display), Manrope (body), JetBrains Mono (time/code)
- Backend: untouched FastAPI boilerplate (not used — frontend-only build)

## User Personas
- **Recruiters / hiring managers** — quick scan for role, location, resume, contact, experience.
- **Founders & PMs** — read case studies, evaluate growth + 0→1 thinking.
- **Designers / fellow builders** — admire interactions; pick up easter egg + CMD+K.

## Architecture
```
/app/frontend/src/
  App.js                       # Router + Lenis + Cursor + ScrollProgress
  pages/
    Home.jsx                   # Sidebar + sections + IntersectionObserver active state
    ProjectDetail.jsx          # Case study layout (/projects/:slug)
  components/
    Sidebar.jsx                # Desktop floating left sidebar (hover-expand)
    MobileNav.jsx              # Mobile bottom floating pill
    Hero.jsx                   # Name, role, image w/ click-labels, CTAs, glow
    LiveClock.jsx              # IST seconds-precision ticker
    StatusBubble.jsx           # Rotating "Probably drinking coffee" pill
    AboutSection.jsx           # Progressive paragraph reveal (blur/fade)
    ProjectSection.jsx         # Hover preview pattern
    PlaygroundSection.jsx      # Hover-rotate/lift cards
    ExperienceSection.jsx      # Dotted-line timeline
    CertificationsSection.jsx  # Single CTA → LinkedIn certifications
    WritingSection.jsx         # Editorial list, hover title shift
    ContactSection.jsx         # Big email pill + circular social row
    Footer.jsx                 # © + v1.0 + Built with curiosity
    CommandPalette.jsx         # CMD/CTRL + K → fuzzy nav
    CustomCursor.jsx           # Dot + lagged ring with .expand
    ScrollProgress.jsx         # Left thin orange line
    EasterEgg.jsx              # Type "product" → quote toast
  data/
    site.json                  # Identity, socials, status bubbles, image labels
    projects.json              # 5 case studies w/ full P/O/A/Exp/Impact/Lessons
    experience.json            # 6 roles
    playground.json            # 6 experiments
    writing.json               # 5 placeholders
  lib/highlight.jsx            # Auto-wraps growth/AI/product/0→1/etc. in .kw pills
/app/frontend/public/
  assets/Pritpal_Singh_Resume.pdf   # Resume served at /assets/...
```

## What's Implemented (2025-12)
- All sections from the spec, with data-testid on every interactive element
- Live IST clock (sec-level) + emerald pulse + Gurgaon location
- Rotating status bubble (9 messages)
- First-visit orange hero glow → fades after 2.2s, persisted in localStorage
- Keyword auto-highlighting (growth, users, experiments, product, scale, AI, metrics, strategy, retention, 0→1, marketplaces, monetisation)
- About: progressive paragraph reveal driven by viewport-midpoint distance
- Project list (left) ↔ live preview panel (right) — hover/focus updates preview
- Project detail pages at `/projects/:slug` with Problem/Opportunity/Approach/Experiments/Impact/Lessons + "Next case study"
- Playground cards with spring-based hover lift+rotate
- Experience dotted-line timeline with orange dot bullets
- Certifications block → opens LinkedIn certifications in new tab
- Contact: large email pill (clipboard copy + Copied state) + 6 social pills with hover lift
- Mobile bottom-floating nav (pill) replaces sidebar < md
- CMD+K command palette: filter, ESC to close, links to resume + LinkedIn certs
- Easter egg: type "product" anywhere → serif quote toast
- Custom cursor (desktop only) with .expand on interactive areas
- Scroll progress: orange line on the left, spring-eased

## Prioritised Backlog
- P1: Real profile photo (currently a tasteful Unsplash placeholder)
- P1: Real Twitter/X, GitHub, Medium URLs (currently '#')
- P1: Replace writing placeholders with actual posts
- P2: Add `about` and `projects` IDs to the IntersectionObserver list for active-dot accuracy on those sections
- P2: Move EasterEgg key buffer into a ref to avoid listener re-attach per keystroke
- P2: Per-project gallery / final outcomes media on case study pages
- P2: Light/dark theme toggle
- P3: OG image + dynamic meta per case study
- P3: Track CMD+K & easter-egg fires in analytics

## Next Tasks
1. Drop in real profile photo and finalize social URLs.
2. Publish first 1–2 writing pieces in `data/writing.json`.
3. Add per-project gallery images and ship the case study expansions.
