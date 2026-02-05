import React, { useEffect, useState } from 'react';

export const MagneticCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>('default');

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setCursorVariant('hover');
        const handleMouseLeave = () => setCursorVariant('default');

        // Add event listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"]');

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Don't render on mobile/touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return null;

    return (
        <>
            {/* Main cursor dot */}
            <div
                className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9998] mix-blend-difference transition-transform"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 1.5 : 1})`,
                }}
            />

            {/* Cursor ring */}
            <div
                className="fixed w-8 h-8 border-2 border-primary/50 rounded-full pointer-events-none z-[9997] transition-all duration-200"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 1.5 : 1})`,
                }}
            />
        </>
    );
};
