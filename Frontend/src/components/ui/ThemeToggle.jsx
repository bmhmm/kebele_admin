// src/components/ui/ThemeToggle.jsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      {/* Sun Icon */}
      <span
        className={`absolute left-1 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      >
        <Sun className="w-3 h-3 text-amber-500" />
      </span>
      
      {/* Moon Icon */}
      <span
        className={`absolute right-1 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <Moon className="w-3 h-3 text-blue-400" />
      </span>
      
      {/* Toggle Circle */}
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-lg ${
          isDark ? 'transform translate-x-6' : ''
        }`}
      />
    </button>
  );
};

export default ThemeToggle;