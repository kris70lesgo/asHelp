// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // adjust if your files are elsewhere
    ],
    theme: {
      extend: {
        colors: {
          border: "hsl(214.3 31.8% 91.4%)",
          input: "hsl(214.3 31.8% 91.4%)",
          ring: "hsl(222.2 84% 4.9%)",
          background: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
          primary: {
            DEFAULT: "hsl(222.2 47.4% 11.2%)",
            foreground: "hsl(210 40% 98%)",
          },
          secondary: {
            DEFAULT: "hsl(210 40% 96%)",
            foreground: "hsl(222.2 84% 4.9%)",
          },
          muted: {
            DEFAULT: "hsl(210 40% 96%)",
            foreground: "hsl(215.4 16.3% 46.9%)",
          },
          accent: {
            DEFAULT: "hsl(210 40% 96%)",
            foreground: "hsl(222.2 84% 4.9%)",
          },
          popover: {
            DEFAULT: "hsl(0 0% 100%)",
            foreground: "hsl(222.2 84% 4.9%)",
          },
          card: {
            DEFAULT: "hsl(0 0% 100%)",
            foreground: "hsl(222.2 84% 4.9%)",
          },
        },
        keyframes: {
          shine: {
            '0%': { 'background-position': '100%' },
            '100%': { 'background-position': '-100%' },
          },
        },
        animation: {
          shine: 'shine 5s linear infinite',
        },
      },
    },
    plugins: [],
  };