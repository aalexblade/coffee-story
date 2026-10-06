# ☕ Coffee Story

**Coffee Story** is an interactive premium **coffee-to-go** landing page built with **Next.js, React, TypeScript and GSAP**.

The project combines scroll-driven storytelling with a real coffee menu and pickup-order flow powered by **Supabase**. The visual experience evolves as the user scrolls through:

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

The project is designed as a portfolio-quality frontend application with a clean, feature-oriented architecture and a backend foundation that can be extended into a real coffee-to-go product.

## ✨ Features

### Interactive landing page

- Scroll-driven coffee storytelling
- GSAP + ScrollTrigger animations
- SVG-based coffee illustrations
- Pinned story section
- Animated coffee, milk, crema, foam and latte-art layers
- Responsive desktop and mobile layouts
- `prefers-reduced-motion` support
- Reusable UI primitives

### Coffee menu

- Coffee products loaded from Supabase
- Availability filtering
- Server-backed menu ordering
- Typed database models shared with the frontend

### Coffee ordering

- Pickup time-slot selection
- Real-time slot refresh
- Client-side order state
- Supabase RPC-based order creation
- Server-side price calculation
- Server-side product availability validation
- Pickup-slot capacity validation
- Order number generation
- Order confirmation screen
- Session-based order persistence

### Backend security

- Row Level Security (RLS)
- Restricted direct access to order and pickup-slot tables
- Security-definer RPC functions
- Server-side validation of order payloads
- Server-side coffee price snapshots
- Transaction-safe pickup-slot capacity checks
- PostgreSQL constraints and indexes
- pgTAP database test suite

## 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) 16 | React framework and App Router |
| [React](https://react.dev/) 19 | UI and component architecture |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [GSAP](https://gsap.com/) | Animation engine |
| [GSAP React](https://gsap.com/resources/React/) | React integration for GSAP |
| ScrollTrigger | Scroll-based animation and pinning |
| [Supabase](https://supabase.com/) | PostgreSQL database, RLS and RPC API |
| PostgreSQL | Menu, pickup slots and orders |
| CSS Modules | Scoped component styling |
| ESLint | Code quality |
| Prettier | Code formatting |

> Tailwind CSS was intentionally removed from the project. Styling is currently based on CSS Modules and shared global styles.

## 🧩 Architecture

The project follows a feature-oriented structure inspired by **Feature-Sliced Design (FSD)** principles without forcing a strict FSD implementation where it does not provide value.

```text
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout and metadata
│   └── page.tsx                      # Home route
│
├── views/                            # Page-level composition
│   └── home/
│       ├── index.ts
│       └── ui/
│           ├── HomePage.tsx
│           └── HomePage.module.css
│
├── widgets/                          # Independent page features
│   ├── coffee-story/                 # Interactive GSAP story
│   ├── coffee-menu/                  # Supabase-backed menu
│   ├── coffee-order/                 # Pickup and order flow
│   ├── coffee-cta/                   # CTA section
│   ├── coffee-footer/                # Footer
│   ├── header/                       # Header/navigation
│   └── hero/                         # Hero section
│
├── entities/
│   └── coffee/                       # Coffee domain entity
│       ├── api/
│       ├── model/
│       └── index.ts
│
└── shared/
    ├── api/
    │   └── supabase/                 # Typed Supabase client
    ├── lib/
    │   └── gsap/                     # Shared GSAP integration
    ├── styles/                       # Global styles and design variables
    └── ui/                           # Reusable UI primitives

supabase/
├── migrations/                       # Database schema and security migrations
├── tests/
│   └── database/                     # pgTAP tests
├── config.toml
└── seed.sql
```

### Dependency direction

The main dependency flow is intentionally kept simple:

```text
app
 ↓
views
 ↓
widgets
 ↓
entities
 ↓
shared
```

The animation system follows a separate runtime flow:

```text
CoffeeStory
    ↓
useCoffeeStory
    ↓
createStoryTimeline
    ↓
transition functions
    ↓
CoffeeVisualHandle
    ↓
SVG / DOM nodes
```

React does not store every scroll position in state. **GSAP owns the animation state**, which keeps scroll-driven animation performant and avoids unnecessary React renders.

## 🎬 Animation System

The main Coffee Story animation is implemented as a GSAP timeline controlled by ScrollTrigger.

```text
createStoryTimeline()
│
├── animateHeroToEspresso()
├── animateEspressoToCortado()
├── animateCortadoToFlatWhite()
├── animateFlatWhiteToCappuccino()
└── animateCappuccinoToLatte()
```

The story section is pinned while the timeline is synchronized with scrolling using ScrollTrigger and scrub.

Individual transitions animate SVG/DOM elements instead of trying to morph incompatible SVG paths directly. This keeps the animation system predictable and easier to maintain.

GSAP and ScrollTrigger are registered through:

```text
src/shared/lib/gsap/
```

## 🎨 Coffee Visual

The coffee scene is built as an SVG composition rather than a single static image.

The visual exposes a typed imperative handle so the animation layer can control individual elements such as:

- coffee cups and glasses;
- coffee/liquid layers;
- milk;
- crema;
- foam;
- coffee streams;
- latte art;
- labels and supporting visual elements.

This separation keeps the visual implementation independent from the timeline orchestration.

## ☕ Supabase & Ordering

The ordering backend is implemented with PostgreSQL and Supabase.

### Main entities

```text
coffee
   │
   ├──────────────┐
   ↓              ↓
order_items ←── orders
                   │
                   ↓
              pickup_slots
```

The database stores:

- coffee menu items;
- pickup slots;
- orders;
- order items;
- price/title snapshots;
- order status;
- order numbers.

### Public API boundary

The browser does not directly insert orders into the database.

Instead:

```text
Browser
   ↓
create_order RPC
   ↓
PostgreSQL validation
   ↓
orders + order_items
   ↓
order confirmation
```

Pickup slots are also exposed through a dedicated RPC:

```text
get_available_pickup_slots()
```

This allows the database to remain the source of truth for:

- product availability;
- prices;
- pickup availability;
- pickup-slot capacity;
- order totals.

## 🔐 Database Security

The database uses RLS and restricted public access.

Important security measures include:

- RLS enabled on application tables;
- direct public access to sensitive order tables restricted;
- pickup slots accessed through a controlled RPC;
- `SECURITY DEFINER` functions with an explicit empty `search_path`;
- server-side validation of all order items;
- duplicate coffee detection;
- quantity validation;
- product availability validation;
- pickup date/time validation;
- pickup capacity checks;
- server-side total calculation;
- coffee title and price snapshots stored with order items.

The repository also contains pgTAP tests covering schema, security and order validation.

## 🧪 Database Tests

Database tests are located in:

```text
supabase/tests/database/
├── schema_test.sql
├── security_test.sql
└── order_test.sql
```

The test suite covers:

- table structure;
- primary and foreign keys;
- data types;
- RLS policies;
- public privileges;
- RPC permissions;
- valid order creation;
- invalid payloads;
- duplicate products;
- invalid quantities;
- unavailable products;
- pickup-slot validation;
- capacity validation.

The SQL test files are part of the repository; run them through your Supabase local/testing workflow before treating them as deployment verification.

## 📁 Current Project Status

**Status:** 🚧 Active development

The current implementation includes:

- complete interactive Coffee Story animation;
- responsive landing-page structure;
- reduced-motion support;
- Supabase-backed coffee menu;
- pickup-slot selection;
- production-oriented order RPC;
- server-side order validation;
- order confirmation flow;
- database security policies;
- database test suite;
- SEO metadata foundation.

### Current priorities

- [ ] Final production audit
- [ ] Improve order confirmation data consistency
- [ ] Finalize SEO canonical/OG configuration
- [ ] Performance and deployment verification
- [ ] Production error monitoring
- [ ] Optional anti-abuse/rate-limiting layer for public order creation
- [ ] Final visual polish and QA

## 🧑‍💻 Getting Started

### Requirements

- Node.js
- npm
- Supabase project

### 1. Clone the repository

```bash
git clone https://github.com/aalexblade/coffee-story.git
cd coffee-story
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The application uses the public Supabase client from:

```text
src/shared/api/supabase/
```

The Supabase anon key is intended for browser use. Database security must therefore be enforced through RLS, privileges and RPC validation rather than by hiding the key.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Available commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## 🎯 Project Goals

Coffee Story is being used to explore production-oriented frontend development through a visually demanding real-world style project.

The main goals are:

- advanced GSAP animation patterns;
- scroll-based storytelling;
- SVG animation and composition;
- React architecture;
- TypeScript-first development;
- reusable UI primitives;
- responsive UI;
- accessibility and reduced-motion support;
- performance-oriented frontend development;
- Supabase/PostgreSQL integration;
- secure public order workflows.

The architecture is intentionally designed so the visual experience can evolve into a real coffee-to-go product without rewriting the application from scratch.

## 📌 Future Product Direction

The long-term product concept is a lightweight coffee-to-go ordering experience:

```text
Landing Page
     ↓
Interactive Coffee Story
     ↓
Coffee Menu
     ↓
Pickup Time
     ↓
Order
     ↓
Order Number
     ↓
Barista / Pickup
```

Possible future extensions include:

- customer contact details;
- coffee customization;
- milk/syrup options;
- order status;
- Telegram notifications;
- menu availability management;
- admin interface;
- anti-abuse protection;
- analytics and monitoring.

## 📄 License

This project is currently a personal portfolio / experimental project.

No open-source license has been added yet.

## 👤 Author

**Alex Blade**

GitHub: [@aalexblade](https://github.com/aalexblade)
