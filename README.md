# ☕ Coffee Story

**Coffee Story** is an experimental interactive coffee landing page built with **Next.js, React, TypeScript and GSAP**.

The project focuses on creating a premium **scroll-driven storytelling experience** where the visual scene evolves as the user scrolls — from a coffee package to a sequence of drinks: **Espresso → Cortado → Flat White → Cappuccino → Latte**.

> The project is currently in active development. The main goal is to build a polished, animation-first coffee-to-go landing page with a clean architecture that can later be extended into a real ordering experience.

## ✨ Concept

The experience is built around a central coffee visual and scroll-controlled storytelling.

As the user moves through the story:

- the coffee scene changes step by step;
- SVG elements are animated independently;
- text cards introduce each stage of the story;
- GSAP ScrollTrigger controls the timeline and pinning;
- the visual stays in focus while the content progresses.

The current sequence is:

```text
Coffee Package
      ↓
   Espresso
      ↓
   Cortado
      ↓
  Flat White
      ↓
  Cappuccino
      ↓
    Latte
```

## 🚀 Features

- Scroll-driven coffee storytelling
- GSAP + ScrollTrigger animations
- SVG-based coffee illustrations
- Multiple animated coffee states
- Pinned storytelling section
- Responsive UI foundation
- Component-based React architecture
- Feature-oriented structure inspired by FSD principles
- TypeScript throughout the application
- CSS Modules for component-specific styling
- Reusable SVG primitives for cups and glasses
- Centralized GSAP setup

## 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) 16 | React framework and application structure |
| [React](https://react.dev/) 19 | UI and component architecture |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [GSAP](https://gsap.com/) | Animation engine |
| [GSAP React](https://gsap.com/resources/React/) | React integration for GSAP |
| ScrollTrigger | Scroll-based animation and pinning |
| Tailwind CSS 4 | Utility-first styling foundation |
| CSS Modules | Scoped component styling |
| ESLint | Code quality |
| Prettier | Code formatting |

## 🧩 Architecture

The project uses a layered structure designed to keep page composition, widgets, shared UI and animation logic separated.

```text
src/
├── app/                         # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx
│
├── views/                      # Page-level compositions
│   └── home/
│       ├── index.ts
│       └── ui/
│           └── HomePage.tsx
│
├── widgets/                    # Independent page sections
│   ├── coffee-story/
│   │   ├── lib/                # Animation orchestration
│   │   ├── model/              # React/animation hooks
│   │   └── ui/                 # Story UI and visual scene
│   │
│   ├── header/
│   └── hero/
│
└── shared/
    ├── lib/                    # Shared utilities and integrations
    │   └── gsap/
    └── ui/                     # Reusable UI primitives
```

The Coffee Story widget is intentionally split into **model / lib / ui** areas. The main page composes the Header, Hero and Coffee Story widgets through the `HomePage` view.

## 🎬 Animation System

The main animation is implemented as a GSAP timeline controlled by ScrollTrigger.

The animation pipeline is divided into individual transitions:

```text
createStoryTimeline()
│
├── animateHeroToEspresso()
├── animateEspressoToCortado()
├── animateCortadoToFlatWhite()
├── animateFlatWhiteToCappuccino()
└── animateCappuccinoToLatte()
```

The timeline pins the story container and synchronizes the animation with scrolling using `scrub`.

GSAP and ScrollTrigger are registered through a shared integration layer so animation code can use the same setup across the application.

## 🎨 Coffee Visual

The coffee scene is built as an SVG composition rather than relying on a single image.

Each coffee state exposes individual SVG elements through a typed imperative handle. This makes it possible for the GSAP timeline to animate specific parts of the scene — cups, glasses, liquids, milk, crema, foam, streams and latte art.

Current visual states include:

- Coffee package
- Espresso cup
- Cortado glass
- Flat White cup
- Cappuccino cup
- Latte glass
- Coffee / milk layers
- Crema and foam
- Coffee streams
- Latte art

## 📁 Project Status

**Status:** 🚧 In active development

Current implementation includes the core page structure, Hero section and the first version of the scroll-driven Coffee Story experience. The home page is composed from reusable widgets, while additional landing-page sections are planned.

### Planned improvements

- [ ] Complete the remaining landing-page sections
- [ ] Refine responsive behavior for mobile and tablet
- [ ] Add `prefers-reduced-motion` support
- [ ] Improve animation performance and GPU usage
- [ ] Add real coffee/menu content
- [ ] Add ordering flow
- [ ] Connect orders to a backend
- [ ] Add Telegram-based order notifications
- [ ] Add menu availability management
- [ ] Add production deployment

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aalexblade/coffee-story.git
cd coffee-story
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 4. Other commands

```bash
npm run build
npm run start
npm run lint
```

## 🎯 Project Goals

Coffee Story is more than a static landing page. The project is being used to explore:

- advanced GSAP animation patterns;
- scroll-based storytelling;
- SVG animation and composition;
- clean React architecture;
- reusable UI primitives;
- responsive and performance-oriented frontend development;
- a future coffee-to-go ordering workflow.

The architecture is intentionally prepared so that the visual experience can evolve into a real coffee shop product without rewriting the application from scratch.

## 📌 Future Product Direction

The long-term idea is to turn the landing page into a lightweight **coffee-to-go ordering experience**.

A possible future flow:

```text
Landing Page
     ↓
Interactive Coffee Story
     ↓
Menu
     ↓
Customization
(milk / syrups / size)
     ↓
Order
     ↓
Telegram → Barista
     ↓
Order Number / Status
```

A backend such as **Supabase** or **MongoDB** can later be introduced for orders, menu availability and product configuration.

## 📄 License

This project is currently a personal portfolio / experimental project. No open-source license has been added yet.

## 👤 Author

**Alex Blade**

GitHub: [@aalexblade](https://github.com/aalexblade)
