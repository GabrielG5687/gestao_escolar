import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-light-border/30 dark:bg-dark-card hover:bg-light-border/50 dark:hover:bg-dark-border border border-light-border dark:border-dark-border hover:border-primary dark:hover:border-primary-dark transition-all duration-200 group transform hover:-translate-y-[2px]"
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-light-text-secondary group-hover:text-primary transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-warning-dark group-hover:text-warning-light transition-colors" />
      )}
    </button>
  );
}
