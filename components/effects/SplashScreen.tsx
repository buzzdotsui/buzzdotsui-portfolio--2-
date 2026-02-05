import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 300); // Reduced from 500ms
        }, 1200); // Reduced from 2000ms for faster load

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }} // Reduced from 0.5
                    className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
                >
                    {/* Simplified background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

                    {/* Single glow effect instead of multiple */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />

                    {/* Logo/Brand */}
                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="mb-4"
                        >
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent p-[2px]">
                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gradient">TO</span>
                                </div>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                                className="text-xl md:text-2xl font-bold text-gradient"
                            >
                                Testimony Owolabi
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25, duration: 0.3 }}
                                className="mt-1 text-xs text-text-muted font-mono"
                            >
                                DevSecOps Engineer
                            </motion.p>
                        </motion.div>

                        {/* Simplified loading bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="w-32 mx-auto"
                        >
                            <div className="h-0.5 bg-surface rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
