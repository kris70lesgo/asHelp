<div align="center">
  <img src="public/logo.png" alt="AsHelp Logo" width="120" height="120">
  
  # AsHelp - Academic Assignment Platform
  
  **Connecting students with verified toppers for seamless academic assistance**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
  [![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange?style=for-the-badge)](https://hacktoberfest.com/)

</div>

---

## Key Features

- **Assignment Upload** - Seamless PDF file upload with drag & drop interface
- **Payment Integration** - Razorpay payment gateway with multiple payment options
- **User Dashboard** - Personal dashboard for managing assignments and profile
- **Secure Authentication** - Email/password & Google OAuth via Supabase Auth
- **Interactive Forms** - Dynamic forms for user registration and data input
- **Background Effects** - Aurora and particle effects for enhanced visual appeal
- **Animated Components** - Custom text animations, loaders, and transitions
- **Fully Responsive** - Optimized for desktop, tablet & mobile devices
- **Modern UI** - Clean interface with Tailwind CSS & custom components
- **Blazing Fast** - Built with Next.js 15 and Turbopack for optimal performance

## Tech Stack

**Frontend:**
- Next.js 15.3 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4.1
- Framer Motion & GSAP

**Backend & Services:**
- Supabase (Database, Auth, Storage)
- Vercel (Hosting)

**UI & Components:**
- Radix UI Primitives
- Lucide Icons
- Magic UI Components

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harshdev625/asHelp.git
   cd asHelp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Supabase Setup**
   
   - Create a new project at [Supabase Dashboard](https://supabase.com/dashboard)
   - Enable Authentication providers (Email, etc.)
   - Create storage bucket: `assignments`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Screenshots / Demo

### Platform Preview

<div align="center">
  <img src="public/homepage.png" alt="AsHelp Homepage">
  <p><em>Homepage - Modern landing page with clean design</em></p>
</div>

<div align="center">
  <img src="public/login.png" alt="Login Page">
  <p><em>Login Interface - Secure authentication system</em></p>
</div>

> **Note:** Screenshots show the current UI design. The interface may evolve as new features are added.

### Live Demo
🚀 **[View Live Demo](https://your-demo-url.vercel.app)** *(Coming Soon)*

*For a complete walkthrough, check out our [demo video](https://your-video-url) showcasing key features and user flows.*

## Project Structure

```
asHelp/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   ├── api/                 # API routes
│   │   ├── dashboard/           # Dashboard pages
│   │   ├── form/                # Form pages
│   │   ├── payment/             # Payment integration
│   │   └── sign/                # Authentication
│   ├── components/              # Reusable components
│   │   ├── nav.tsx              # Navigation
│   │   ├── upload.tsx           # File upload
│   │   ├── ui/                  # UI primitives
│   │   ├── magicui/             # Animated components
│   │   └── Backgrounds/         # Background effects
│   └── lib/                     # Utilities
│       ├── supabaseclient.ts    # Supabase config
│       └── utils.ts             # Helper functions
├── public/                      # Static assets
└── Configuration files
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Contributing

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

## Code of Conduct

We are committed to fostering a welcoming and inclusive community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the standards we expect from all contributors.

**Quick Summary:**
- Be respectful and considerate in all interactions
- Use inclusive language and avoid discriminatory behavior
- Accept constructive feedback gracefully
- Focus on what's best for the community
- Show empathy towards other community members

For detailed guidelines, please see our full [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Production-Ready Motion Library
- [Radix UI](https://www.radix-ui.com/) - Low-level UI Primitives

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
</div>
