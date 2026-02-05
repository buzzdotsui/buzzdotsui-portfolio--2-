import React, { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
import { useTheme } from '../../contexts/ThemeContext';

export const ParticleBackground: React.FC = () => {
    const { theme } = useTheme();

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    // Memoize options to prevent unnecessary re-renders
    const options = useMemo(() => ({
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: 'transparent' },
        fpsLimit: 30, // Reduced from 120 for better performance
        particles: {
            number: {
                value: theme === 'dark' ? 40 : 30, // Reduced from 80/50
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080,
                },
            },
            color: {
                value: theme === 'dark' ? ['#8b5cf6', '#06b6d4'] : ['#7c3aed', '#0891b2'],
            },
            shape: {
                type: 'circle', // Simplified from multiple shapes
            },
            opacity: {
                value: { min: 0.1, max: 0.4 },
                animation: {
                    enable: false, // Disabled for better performance
                },
            },
            size: {
                value: { min: 1, max: 2 },
            },
            links: {
                enable: true,
                distance: 120, // Reduced from 150
                color: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
                opacity: theme === 'dark' ? 0.15 : 0.1,
                width: 1,
            },
            move: {
                enable: true,
                speed: 0.5, // Reduced from 1
                direction: 'none' as const,
                random: false,
                straight: false,
                outModes: {
                    default: 'out' as const, // Changed from bounce for less computation
                },
            },
        },
        interactivity: {
            detectsOn: 'window' as const,
            events: {
                onHover: {
                    enable: false, // Disabled for better performance
                },
                onClick: {
                    enable: false, // Disabled for better performance
                },
                resize: {
                    enable: true,
                    delay: 1,
                },
            },
        },
        detectRetina: false, // Disabled for better performance on high-DPI screens
    }), [theme]);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={options}
        />
    );
};
