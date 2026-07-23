# Ishtiaq Robin — Portfolio Frontend

A modern, high-performance portfolio website for **Ishtiaq Robin** — an AI-Driven Software Engineer. Built with **Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript**.

Features a public-facing portfolio (home, projects, about, contact), a full admin dashboard (CRUD for projects, categories, reviews, experiences, awards, FAQs, settings, contacts, analytics, chatbot config), user authentication, AI chatbot, and smooth scroll animations.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Route Structure](#route-structure)
- [Public Pages](#public-pages)
- [Dashboard Pages](#dashboard-pages)
- [Auth Pages](#auth-pages)
- [Architecture & Patterns](#architecture--patterns)
- [Service Layer](#service-layer)
- [Server Actions](#server-actions)
- [State Management](#state-management)
- [UI Component System](#ui-component-system)
- [Animations](#animations)
- [Authentication Flow](#authentication-flow)
- [Chatbot Integration](#chatbot-integration)
- [SEO & Metadata](#seo--metadata)
- [Deployment](#deployment)

---

## Tech Stack

| Layer              | Technology                                                                 |
| ------------------ | -------------------------------------------------------------------------- |
| Framework          | [Next.js](https://nextjs.org/) 16.1 (App Router)                          |
| Language           | [TypeScript](https://www.typescriptlang.org/) 5.x                          |
| UI Library         | [React](https://react.dev/) 19.2                                           |
| Styling            | [Tailwind CSS](https://tailwindcss.com/) 4.x + `tw-animate-css`            |
| UI Components      | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Icons              | [Lucide React](https://lucide.dev/) + [Tabler Icons](https://tabler.io/icons) |
| Forms              | [React Hook Form](https://react-hook-form.com/) 7.x + [Zod](https://zod.dev/) |
| Auth               | [Better Auth](https://www.better-auth.com/) 1.4 (client + server)          |
| Rich Text Editor   | [Tiptap](https://tiptap.dev/) 3.x (tables, tasks, images, code blocks)    |
| Animations         | [Framer Motion](https://motion.dev/) 12.x, [GSAP](https://gsap.com/) 3.x   |
| Smooth Scroll      | [Lenis](https://lenis.darkroom.engineering/) 1.x                           |
| 3D                 | [React Three Fiber](https://r3f.docs.pmnd.rs/) + Three.js                 |
| Charts             | [Recharts](https://recharts.org/) (via admin dashboard)                    |
| Tables             | [TanStack Table](https://tanstack.com/table) (via admin dashboard)         |
| File Export        | [jsPDF](https://github.com/parallax/jsPDF) + [xlsx](https://sheetjs.com/)  |
| Environment        | [@t3-oss/env-nextjs](https://env.t3.gg/) for type-safe env variables       |
| Image Compression  | Canvas API (zero-dependency, browser-native)                               |
| Deployment         | [Vercel](https://vercel.com/)                                              |

---

## Project Structure

```
Frontend/
├── public/                          # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                         # Next.js App Router pages & layouts
│   │   ├── layout.tsx               # Root layout (fonts, metadata, providers)
│   │   ├── Providers.tsx            # Theme + SmoothScroll + Toaster providers
│   │   ├── globals.css              # Tailwind CSS + shadcn/ui theme variables
│   │   ├── sitemap.ts               # Auto-generated sitemap.xml
│   │   ├── robots.ts                # robots.txt
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── (commonLayout)/          # Public pages (navbar + footer)
│   │   │   ├── layout.tsx           # Navbar + Footer + MobileNav
│   │   │   ├── page.tsx             # Homepage (server component)
│   │   │   ├── HomeContent.tsx      # Homepage sections (client component)
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── projects/page.tsx    # Project listing
│   │   │   ├── projects/[slug]/page.tsx  # Project detail (with sections)
│   │   │   ├── cookie-policy/page.tsx
│   │   │   ├── privacy-policy/page.tsx
│   │   │   └── terms-of-service/page.tsx
│   │   ├── (authLayout)/            # Auth pages (minimal navbar)
│   │   │   ├── layout.tsx           # AuthNavbar + Footer
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   └── verify-email/page.tsx
│   │   └── (dashboardLayout)/       # Dashboard (sidebar + breadcrumbs)
│   │       ├── layout.tsx           # DashboardSidebar + parallel routes
│   │       ├── @admin/              # Admin dashboard parallel route
│   │       │   ├── default.tsx
│   │       │   └── admin-dashboard/
│   │       │       ├── page.tsx     # Admin home (stats overview)
│   │       │       ├── about/page.tsx
│   │       │       ├── analytics/page.tsx
│   │       │       ├── awards/page.tsx
│   │       │       ├── categories/page.tsx
│   │       │       ├── chatbot/page.tsx
│   │       │       ├── contact/page.tsx
│   │       │       ├── experience/page.tsx
│   │       │       ├── faqs/page.tsx
│   │       │       ├── profile/page.tsx
│   │       │       ├── projects/page.tsx
│   │       │       ├── reviews/page.tsx
│   │       │       ├── settings/page.tsx
│   │       │       └── users/page.tsx
│   │       └── @user/               # User dashboard parallel route
│   │           ├── default.tsx
│   │           └── user-dashboard/
│   │               ├── page.tsx
│   │               ├── profile/page.tsx
│   │               └── review/page.tsx
│   ├── actions/                     # Next.js Server Actions (API calls)
│   │   ├── about.action.ts
│   │   ├── award.action.ts
│   │   ├── chatbot.action.ts
│   │   ├── contact.action.ts
│   │   ├── experience.action.ts
│   │   ├── faq.action.ts
│   │   ├── project.action.ts
│   │   ├── review.action.ts
│   │   └── setting.action.ts
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components (56+ primitives)
│   │   ├── common/                  # Shared UI components
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── Particles.tsx
│   │   │   ├── GradientText.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   └── SectionTitle.tsx
│   │   ├── layout/                  # Layout components
│   │   │   ├── Navbar.tsx           # Desktop nav (scroll-aware, animated)
│   │   │   ├── MobileNav.tsx        # Mobile hamburger menu (Sheet)
│   │   │   ├── MobileBottomBar.tsx  # Mobile bottom tab bar
│   │   │   ├── Footer.tsx
│   │   │   ├── AuthNavbar.tsx       # Auth page navbar
│   │   │   ├── DashboardSidebar.tsx # Admin/User sidebar (AppSidebar)
│   │   │   ├── AppSidebar.tsx       # shadcn sidebar navigation
│   │   │   ├── DashboardHeader.tsx  # Dashboard top bar
│   │   │   ├── Chatbot.tsx          # AI chatbot widget (floating)
│   │   │   ├── ChatbotIcon.tsx      # Chatbot trigger button
│   │   │   ├── ModeToggle.tsx       # Dark/light mode toggle
│   │   │   └── ScrollToTop.tsx
│   │   └── modules/                 # Feature-specific components
│   │       ├── home/                # Homepage sections
│   │       │   ├── hero/HeroSection.tsx
│   │       │   ├── card/            # Project cards
│   │       │   ├── design_process/  # Design process section
│   │       │   ├── expertise/       # Expertise / skills section
│   │       │   ├── experience/      # Work timeline
│   │       │   ├── awards/          # Awards & recognition
│   │       │   ├── faq/             # FAQ accordion
│   │       │   ├── selected_projects/ # Featured projects grid
│   │       │   ├── project/         # Project list + detail pages
│   │       │   └── testimonials/    # Reviews/Testimonials carousel
│   │       ├── shared/              # Reusable modules
│   │       │   ├── TiptapEditor.tsx # Rich text editor
│   │       │   ├── DeleteDialog.tsx # Confirmation dialog
│   │       │   ├── SearchModal.tsx  # Command palette search
│   │       │   ├── TablePagination.tsx
│   │       │   ├── SocialIcons.tsx
│   │       │   ├── CtaSection.tsx
│   │       │   ├── TextMarquee.tsx  # Scrolling text animation
│   │       │   ├── TechMarquee.tsx  # Tech stack icons marquee
│   │       │   ├── TextReveal.tsx   # Scroll-triggered text fade
│   │       │   ├── ScrollRevealText.tsx
│   │       │   ├── SplitTextReveal.tsx
│   │       │   ├── ShimmerText.tsx
│   │       │   ├── HoverButton.tsx
│   │       │   ├── CircularButton.tsx
│   │       │   └── CircularProgress.tsx
│   │       ├── auth/                # Auth page components
│   │       ├── profile/             # Profile form + avatar upload
│   │       ├── user/                # User dashboard components
│   │       └── dashboard/           # Admin dashboard components
│   │           ├── admin/           # Admin-specific widgets
│   │           └── user/            # User-specific widgets
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts               # Better Auth session hook
│   │   ├── useActiveSection.ts      # Intersection observer for nav
│   │   ├── useCategories.ts         # Category fetching
│   │   ├── useImageUpload.ts        # Cloudinary upload with compression
│   │   └── use-mobile.ts            # Responsive breakpoint detection
│   ├── lib/                         # Core utilities
│   │   ├── auth-client.ts           # Better Auth client setup
│   │   ├── utils.ts                 # cn(), formatPrice(), formatDate()
│   │   ├── validation.ts            # Zod schemas (login, register, contact)
│   │   └── imageCompressor.ts       # Browser-native image compression
│   ├── providers/                   # React context providers
│   │   ├── ThemeProvider.tsx         # next-themes wrapper
│   │   └── SmoothScrollProvider.tsx  # Lenis smooth scroll + GSAP
│   ├── services/                    # API service layer (data fetching)
│   │   ├── session.service.ts       # Server-side session retrieval
│   │   ├── about.service.ts
│   │   ├── admin.service.ts
│   │   ├── analytics.service.ts
│   │   ├── award.service.ts
│   │   ├── category.service.ts
│   │   ├── chatbot.service.ts
│   │   ├── contact.service.ts
│   │   ├── experience.service.ts
│   │   ├── faq.service.ts
│   │   ├── project.service.ts
│   │   ├── review.service.ts
│   │   ├── setting.service.ts
│   │   └── user.service.ts
│   ├── types/                       # TypeScript type definitions
│   │   ├── index.ts                 # Re-exports all types
│   │   ├── about.type.ts
│   │   ├── admin.type.ts
│   │   ├── analytics.type.ts
│   │   ├── awards.type.ts
│   │   ├── better-auth.d.ts         # Better Auth type augmentation
│   │   ├── category.type.ts
│   │   ├── chatbot.type.ts
│   │   ├── contact.type.ts
│   │   ├── experience.type.ts
│   │   ├── faq.type.ts
│   │   ├── project.type.ts
│   │   ├── review.type.ts
│   │   ├── routes.type.ts
│   │   ├── setting.type.ts
│   │   └── user.type.ts
│   ├── utils/                       # Utility constants & helpers
│   │   ├── constants.ts             # Nav links, social links, personal info
│   │   └── helpers.ts               # scrollToSection(), getInitials()
│   └── env.ts                       # @t3-oss/env-nextjs config
├── .env.example
├── .gitignore
├── components.json                  # shadcn/ui configuration
├── next.config.ts                   # Rewrites, images, env setup
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vercel.json                      # Vercel framework config
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Backend API running (see [Backend README](../Backend/README.md))

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your backend URLs

# 3. Start dev server
npm run dev
```

The app starts at `http://localhost:3000`.

---

## Environment Variables

Type-safe environment variables validated by `@t3-oss/env-nextjs` at `src/env.ts`.

| Variable | Type | Description |
| -------- | ---- | ----------- |
| `BACKEND_URL` | Server | Backend base URL (e.g. `http://localhost:5000`) |
| `FRONTEND_URL` | Server | Frontend base URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_API_URL` | Public | Backend API URL (`/api/v1`) |
| `NEXT_PUBLIC_AUTH_URL` | Public | Backend auth URL (`/api/auth`) |
| `NEXT_PUBLIC_APP_URL` | Public | Frontend public URL |

---

## Available Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start Next.js dev server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Route Structure

The app uses Next.js **App Router** with three layout groups (route groups):

| Route Group | Layout | Pages |
| ----------- | ------ | ----- |
| `(commonLayout)` | Navbar + Footer + SmoothScroll | Home, About, Projects, Contact, Legal pages |
| `(authLayout)` | AuthNavbar + Footer | Login, Register, Forgot/Reset Password, Verify Email |
| `(dashboardLayout)` | Sidebar + Breadcrumbs | Admin dashboard (all CRUD), User dashboard |

---

## Public Pages

### Home (`/`)

Sections rendered server-side via `HomeContent` (client component):

| Section | Component | Description |
| ------- | --------- | ----------- |
| Hero | `HeroSection` | Animated hero with type animation, CTA buttons |
| Marquee | `TextMarquee` | Scrolling text banner with skills/tech |
| Bio | `ScrollRevealText` | Scroll-triggered personal introduction |
| Featured Projects | `SelectedProjects` | Grid of featured project cards |
| Expertise | `ExpertiseSection` | Skills/categories with progress indicators |
| Testimonials | `Testimonials` | Review carousel with add-review modal |
| CTA | `CtaSection` | Call-to-action (contact / hire me) |

### About (`/about`)

Full about section with bio, experience timeline, awards, design process, FAQs, and tech marquee.

### Projects (`/projects`)

- **List page** — Project grid with category filter
- **Detail page** (`/projects/[slug]`) — Full project page with:
  - Hero banner with tech stack tags
  - Dynamic sections (overview, challenges, results, etc.)
  - On-this-page sidebar navigation
  - Related projects

### Contact (`/contact`)

Contact form with social links. Submissions are sent to the backend and trigger an email notification.

### Legal Pages

- `/cookie-policy` — Cookie usage policy
- `/privacy-policy` — Privacy policy
- `/terms-of-service` — Terms of service

---

## Dashboard Pages

### Admin Dashboard (`/admin-dashboard`)

Role-based access (ADMIN only). Uses parallel routes (`@admin`) within the dashboard layout.

| Page | Route | Description |
| ---- | ----- | ----------- |
| Overview | `/` | Stats cards (users, projects, reviews, contacts, page views) |
| About | `/about` | Edit singleton about section (title, description, image, resume) |
| Projects | `/projects` | CRUD table with create/edit modal (Tiptap editor for sections) |
| Categories | `/categories` | CRUD table with inline modal |
| Reviews | `/reviews` | Manage reviews (approve, pin, delete, filter) |
| Experience | `/experience` | CRUD timeline entries (position, company, dates) |
| Awards | `/awards` | CRUD awards (title, date, details) |
| FAQs | `/faqs` | CRUD FAQ accordion entries |
| Contact | `/contact` | View/reply to contact submissions, filter by status |
| Settings | `/settings` | Edit site settings (social links, SEO meta, contact info) |
| Users | `/users` | List users, ban/unban |
| Analytics | `/analytics` | Page view stats, resume download logs |
| Chatbot | `/chatbot` | Configure AI provider, chatbot behavior, view logs |
| Profile | `/profile` | Edit name, phone, profile image |

### User Dashboard (`/user-dashboard`)

| Page | Route | Description |
| ---- | ----- | ----------- |
| Overview | `/` | User home with review status |
| Profile | `/profile` | Edit name, phone, profile image |
| Review | `/review` | Create/edit/delete personal review |

---

## Auth Pages

| Page | Route | Description |
| ---- | ----- | ----------- |
| Login | `/login` | Email/password login |
| Register | `/register` | Create account with Better Auth |
| Forgot Password | `/forgot-password` | Request password reset OTP |
| Reset Password | `/reset-password` | Reset password with OTP |
| Verify Email | `/verify-email` | Verify email with OTP |

All auth pages have a clean, minimal layout (`AuthNavbar` + Footer).

---

## Architecture & Patterns

### Data Flow

```
Page (Server/Client)
  → Service Layer (fetch to backend API)
    → Server Action (mutations with revalidation)
      → Backend API
```

### Three Data Access Layers

1. **Services** (`src/services/`) — For data fetching in **client components**. Direct `fetch` calls to `NEXT_PUBLIC_API_URL`. Return `{ data, error }` shape. Used in `useEffect` or event handlers.

2. **Server Actions** (`src/actions/`) — For mutations (create, update, delete). Called from client components via `useActionState` or direct invocation. Automatically revalidate cache via `revalidatePath` / `revalidateTag`.

3. **Service Layer (server)** (`src/services/session.service.ts`) — For **server components** and **middleware**. Uses `next/headers` cookies to fetch sessions from backend.

### Layout Groups

Route groups (`(commonLayout)`, `(authLayout)`, `(dashboardLayout)`) allow different layouts for different page categories without URL nesting.

### Parallel Routes (Dashboard)

The dashboard uses parallel routes (`@admin` and `@user`) to conditionally render admin or user content based on the authenticated user's role:

```typescript
// src/app/(dashboardLayout)/layout.tsx
{userState?.role === "ADMIN" && admin}
{userState?.role === "USER" && user}
```

---

## Service Layer

All services follow a consistent pattern:

```typescript
// src/services/project.service.ts (example)
export const projectService = {
  async getProjects(categoryId?: string, isFeatured?: boolean) {
    const params = new URLSearchParams();
    if (categoryId) params.append("categoryId", categoryId);
    const url = `${API_URL}/projects?${params}`;
    const res = await fetch(url, { cache: "no-store" });
    const result = await res.json();
    return { data: result.data, error: res.ok ? null : result.message };
  },
};
```

**Services available:** about, admin, analytics, award, category, chatbot, contact, experience, faq, project, review, session, setting, user.

---

## Server Actions

Server Actions handle mutations with automatic cache revalidation:

```typescript
// src/actions/project.action.ts (example)
"use server";
export async function createProjectAction(formData: FormData, token: string) {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const result = await res.json();
  if (result.success) {
    revalidatePath("/admin-dashboard/projects");
    return { success: true, message: result.message };
  }
  return { success: false, message: result.message };
}
```

**Actions available:** about, award, chatbot, contact, experience, faq, project, review, setting.

---

## State Management

No global state library. State is managed through:

- **React Server Components** — server-side data fetching
- **Custom hooks** (`useAuth`, `useCategories`, etc.) — client-side data
- **Better Auth** — session state via `authClient.useSession()`
- **URL params** — filter state (project categories, contact status, etc.)
- **localStorage / sessionStorage** — chatbot session ID persistence

---

## UI Component System

### shadcn/ui (56+ primitives)

All from `src/components/ui/`:

| Category | Components |
| -------- | ---------- |
| Layout | Accordion, Aspect Ratio, Card, Collapsible, Drawer, Sheet, Sidebar, Tabs |
| Navigation | Breadcrumb, Context Menu, Dropdown Menu, Menubar, Navigation Menu, Pagination, Tabs |
| Forms | Button, Checkbox, Combobox, Field, Form, Input, Input Group, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle Group |
| Feedback | Alert, Alert Dialog, Dialog, Popover, Progress, Skeleton, Sonner (Toast), Tooltip |
| Data Display | Avatar, Badge, Calendar, Carousel, Command, Hover Card, Scroll Area, Separator, Table |

### Custom Shared Components

`GlassCard`, `GradientText`, `CustomCursor`, `Particles`, `AnimatedCounter`, `SectionTitle`.

### Rich Text Editor

`TiptapEditor` — built on [Tiptap](https://tiptap.dev/) with extensions:
- StarterKit (heading, bold, italic, lists, blockquote, code)
- Underline, Highlight, Typography
- Link, Image (with upload)
- CodeBlock with syntax highlighting (lowlight)
- Table (with header/row/cell support)
- TaskList / TaskItem
- Placeholder, BubbleMenu

---

## Animations

The project uses a layered animation strategy:

| Library | Purpose | Usage |
| ------- | ------- | ----- |
| **Framer Motion** `(motion)` | Declarative React animations | Navbar active indicator (`layoutId`), theme toggle, chatbot open/close, page transitions, hover effects |
| **GSAP** | Scroll-triggered timeline animations | TextReveal, ScrollRevealText, AnimatedCounter (via ScrollTrigger) |
| **Lenis** | Smooth scroll engine | Wrapped in `SmoothScrollProvider` — disabled on dashboard pages to avoid scroll conflicts |
| **react-type-animation** | Typing effect | Hero section title animation |
| **CSS transitions** | Simple state changes | Navbar scroll resize (`duration-700`), hover underlines |

### Navbar Animation Detail

The navbar uses a sophisticated scroll-to-compact animation:
- Scroll down → nav shrinks to a pill shape (`max-w-2xl`, centered)
- Uses a `layoutId="activeNav"` Framer Motion spring for the active dot indicator
- A `isResizing` state prevents Framer from animating the dot during CSS transition (750ms buffer)

### Smooth Scroll Strategy

- Lenis is disabled on dashboard routes (interferes with sidebar/content scrolling)
- Reset to top on route change with `immediate: true` to prevent scroll jank

---

## Authentication Flow

### Auth Client Setup (`src/lib/auth-client.ts`)

```typescript
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL, // Frontend URL
  plugins: [emailOTPClient()],
});
```

The baseURL points to the **frontend** URL, not the backend. Next.js rewrites in `next.config.ts` proxy `/api/auth/*` requests to the backend:

```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: "/api/auth/:path*",
      destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/:path*`,
    },
  ];
}
```

This same-origin strategy avoids cross-site cookie issues.

### useAuth Hook (`src/hooks/useAuth.ts`)

```typescript
export function useAuth() {
  const { data: sessionData, isPending: isLoading } = authClient.useSession();
  const user = sessionData?.user as User | null;
  return { user, session, isLoading, isAuthenticated, logout };
}
```

Provides `user`, `session`, `isLoading`, `isAuthenticated`, and `logout` to any client component.

### Server-side Session (`src/services/session.service.ts`)

For server components/middleware, sessions are fetched from the backend using the cookie header:

```typescript
const res = await fetch(`${AUTH_URL}/get-session`, {
  headers: { Cookie: cookieHeader },
});
```

### Auth Features

- Email/password registration & login
- Google OAuth (proxied through frontend)
- Email OTP verification (6 digits, 5 min expiry)
- Password reset via OTP
- Role-based access (USER / ADMIN)
- Session cookie management (7-day expiry)

---

## Chatbot Integration

The floating AI chatbot (`src/components/layout/Chatbot.tsx`):

- **Persistent session** — session ID stored in `sessionStorage` per browser tab
- **Welcome message** — "Hi! I'm Ishtiaq's assistant..."
- **Chat history** — stored in component state (refreshes on page reload)
- **Streaming replies** — loading indicator while waiting for AI response
- **Clear chat** — button to reset conversation
- **Rate limiting** — enforced by backend

The chatbot uses the backend's AI provider configuration (Gemini, OpenAI, etc.) and portfolio data as context.

---

## SEO & Metadata

### Dynamic Sitemap (`src/app/sitemap.ts`)

Auto-generated `sitemap.xml` with:
- **Static pages:** `/`, `/about`, `/projects`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/cookie-policy`
- **Dynamic pages:** Published project slugs fetched from backend API
- Cached with `revalidate: 3600` (1 hour)

### robots.txt (`src/app/robots.ts`)

Allows all crawlers, disallows `/admin/`, `/dashboard/`, `/api/`. Points to sitemap.

### Root Layout Metadata

Comprehensive OpenGraph + Twitter card metadata with:
- Custom social images (`/og-image.jpg`, `/twitter-image.jpg`)
- Google Search Console verification
- Bing Webmaster Tools verification
- Full keyword set

---

## Image Handling

### Image Upload Flow

1. User selects image → displayed as preview
2. Client-side compression via `src/lib/imageCompressor.ts`:
   - Canvas API (zero dependencies)
   - Outputs WebP (quality 0.85)
   - Preserves original dimensions (no downscaling unless `maxWidth`/`maxHeight` specified)
   - Falls back to JPEG if WebP unsupported
   - Returns original if compressed is larger
3. Compressed file appended to `FormData`
4. Sent to backend via Server Action
5. Backend uploads to Cloudinary via Multer

### Next.js Image Configuration

`next.config.ts` allows images from any remote source:

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "**" },
    { protocol: "http", hostname: "**" },
  ],
}
```

---

## Deployment

Deployed on **Vercel** with standard Next.js configuration.

### Vercel Config (`vercel.json`)

```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

### Build Optimizations

- Console logs removed in production (except `console.error`)
- `next build` generates static pages where possible
- Server Actions with `revalidatePath` for cache invalidation
- Dynamic imports for heavy components (e.g., `SmoothScrollProvider` is `dynamic(() => import(...), { ssr: false })`)

---

## TypeScript Types

All domain types are defined in `src/types/` and re-exported from `src/types/index.ts`:

| File | Key Types |
| ---- | --------- |
| `user.type.ts` | `User`, `Session` |
| `project.type.ts` | `IProject`, `IProjectSection` |
| `review.type.ts` | `IReview`, `IReviewForm` |
| `contact.type.ts` | `IContact`, `ICreateContactInput`, `ContactStatus` |
| `about.type.ts` | `IAbout`, `CreateAboutPayload` |
| `setting.type.ts` | `ISettings` |
| `experience.type.ts` | `IExperience` |
| `awards.type.ts` | `IAward` |
| `faq.type.ts` | `IFaq` |
| `category.type.ts` | `Category`, `CategoryPayload` |
| `chatbot.type.ts` | `IAiProviderConfig`, `IChatbotConfig`, `IChatMessage` |
| `analytics.type.ts` | `PageView`, `ResumeDownloadLog`, `CreatePageViewInput` |
| `admin.type.ts` | `AdminStats`, `AdminUser`, `AdminBooking` |
| `routes.type.ts` | `Route` (sidebar navigation structure) |
| `better-auth.d.ts` | Better Auth type augmentation |

---

## Code Style

- **TypeScript** — strict mode, path alias `@/` mapped to `src/`
- **Tailwind CSS 4** — `@tailwindcss/postcss` plugin, CSS variables for theming
- **shadcn/ui** — New York style, `cn()` utility for class merging
- **ESLint** — `eslint-config-next` with Next.js 16
- **Icons** — Lucide React (primary) + Tabler Icons (secondary) + React Icons (tertiary)

---

## License

[MIT](./LICENSE)