# Ishtiaq Robin - Portfolio Website

A modern, responsive, and professional portfolio website for a Graphics Designer built with Next.js 15+ and Tailwind CSS 4.

## 🌟 Key Features

- **⚡ High Performance**: Built on Next.js 15 with App Router and server-side rendering.
- **🎨 Premium UI**: Crafted with Radix UI and Tailwind CSS 4 for a sleek, consistent look.
- **🌗 Dark Mode**: Full support for light and dark themes.
- **📱 Responsive**: Optimized for desktop, tablet, and mobile devices.
- **🔐 Secure Auth**: Seamless integration with Better Auth.
- **🛒 Checkout**: Smooth booking flow with Stripe integration.
- **📊 Dashboards**: Dedicated views for Students, Tutors, and Admins.
- **📥 Data Export**: Generate PDF and Excel reports for bookings and payments.

## 🛠️ Technologies

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Animations**: [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- Backend API running

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🔑 Environment Variables

Required variables in `.env`:

| Key                                  | Description                |
| ------------------------------------ | -------------------------- |
| `NEXT_PUBLIC_API_URL`                | Backend API base URL       |
| `BETTER_AUTH_URL`                    | Authentication service URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key     |

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
