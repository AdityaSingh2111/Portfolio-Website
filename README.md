# Aditya Kumar | Portfolio

![Portfolio Preview](./public/og-image.png)

> **"Building digital experiences that feel alive."**

A premium, production-ready personal portfolio website built with **Next.js 14**, crafted with a **Liquid Glass** aesthetic, and fully optimized as a **Progressive Web App (PWA)**.

---

## 🚀 Key Features

### 🎨 Liquid Glass Aesthetic
-   **Ultra-Modern UI**: Glassmorphism effects, deep dark mode, and electric blue accents (`hsl(217, 91%, 60%)`).
-   **Animations**: Powered by **Framer Motion** for smooth scroll reveals, magnetic buttons, and a cinematic hero spotlight.
-   **Interactive Elements**: 3D card tilts, glowing borders, and specialized marquee components.

### 📱 Progressive Web App (PWA)
-   **Installable**: Works as a native app on **iOS** (Add to Home Screen) and **Android/PC** (Chrome Install).
-   **Offline Support**: Caches essential assets via Service Worker for instant loading.
-   **App-like Feel**: Disables browser chrome and zooming for a native, immersive experience.

### ⚡ Performance & Tech
-   **Next.js 14 (App Router)**: Server Components by default for optimal speed.
-   **TypeScript**: Fully typed codebase for reliability.
-   **Tailwind CSS**: Utility-first styling with CSS variables for dynamic theming.
-   **Lucide React**: Beautiful, consistent iconography.

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js 14](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Motion:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** [Vercel](https://vercel.com/)

---

## � Project Structure

```bash
├── app/
│   ├── globals.css          # Design tokens & theme variables
│   ├── layout.tsx           # PWA metadata & global wrappers
│   ├── manifest.ts          # Web App Manifest generator
│   ├── icon.tsx             # Dynamic App Icon generator
│   └── apple-icon.tsx       # iOS-specific Icon generator
├── components/
│   ├── layout/
│   │   ├── navbar.tsx       # "Floating Pill" responsive navbar
│   │   ├── footer.tsx       # Social links & copyright
│   │   └── client-wrapper.tsx # Global error boundaries & SW registration
│   ├── sections/
│   │   ├── hero.tsx         # Cinematic typewriter hero
│   │   ├── skills-marquee.tsx # Infinite scroll skills (auto-adapts)
│   │   └── ...
│   └── ui/                  # Reusable glassmorphic components
├── public/
│   ├── sw.js                # Service Worker for PWA
│   └── resume.pdf           # 📄 Your Resume File
└── tailwind.config.ts       # Theme extension & animation config
```

---

## � Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it.

4.  **Build for production:**
    ```bash
    npm run build
    npm start
    ```

---

## � Customization Guide

### 1. Update Personal Info
-   **Resume**: Replace `public/resume.pdf`.
-   **Links**: Update `navItems` in `components/layout/navbar.tsx`.
-   **Socials**: Update links in `components/layout/footer.tsx`.

### 2. PWA Branding
-   **Name**: Edit `name` and `short_name` in `app/manifest.ts`.
-   **Theme Color**: Update `themeColor` in `app/layout.tsx` and `app/manifest.ts`.

### 3. Theme Colors
Modify the HSL variables in `app/globals.css` to change the entire site's color scheme instantly.

```css
:root {
  --primary: 217 91% 60%; /* Change this one line */
}
```

---

## 📄 License

© 2026 Aditya Kumar. All rights reserved.
Built with ❤️ and ☕.
