/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Oficial - Sistema Pedagógico
        primary: {
          DEFAULT: '#0891b2', // Azul-ciano
          hover: '#0e7490',   // Azul mais escuro
          light: '#38bdf8',   // Azul suave
          dark: '#06b6d4',    // Azul-ciano vibrante (dark mode)
          'dark-hover': '#22d3ee', // Hover dark mode
        },
        // Tema Claro
        light: {
          bg: '#f8fafc',      // Fundo principal
          card: '#ffffff',    // Cards/blocos
          text: '#1e293b',    // Texto principal
          'text-secondary': '#64748b', // Texto secundário
          border: '#e2e8f0',  // Bordas
        },
        // Tema Escuro
        dark: {
          bg: '#0f172a',      // Fundo principal
          card: '#1e293b',    // Cards/blocos
          text: '#f1f5f9',    // Texto principal
          'text-secondary': '#94a3b8', // Texto secundário
          border: '#334155',  // Bordas
        },
        // Estados
        success: {
          light: '#16a34a',   // Verde (tema claro)
          dark: '#22c55e',    // Verde-claro (tema escuro)
        },
        warning: {
          light: '#eab308',   // Amarelo (tema claro)
          dark: '#facc15',    // Amarelo-dourado (tema escuro)
        },
        error: {
          light: '#dc2626',   // Vermelho (tema claro)
          dark: '#ef4444',    // Vermelho-claro (tema escuro)
        },
      },
    },
  },
  plugins: [],
}
