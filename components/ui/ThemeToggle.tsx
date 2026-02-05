import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg bg-surface/50 border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            aria-label="Toggle theme"
        >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-5 h-5">
                {/* Sun icon */}
                <motion.span
                    initial={false}
                    animate={{
                        scale: theme === 'light' ? 1 : 0,
                        rotate: theme === 'light' ? 0 : 180,
                        opacity: theme === 'light' ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun size={20} className="text-warning" />
                </motion.span>

                {/* Moon icon */}
                <motion.span
                    initial={false}
                    animate={{
                        scale: theme === 'dark' ? 1 : 0,
                        rotate: theme === 'dark' ? 0 : -180,
                        opacity: theme === 'dark' ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon size={20} className="text-primary" />
                </motion.span>
            </div>
        </button>
    );
};
