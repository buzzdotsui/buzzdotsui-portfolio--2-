import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, HTMLMotionProps } from 'framer-motion';

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    delay?: number;
    viewportOnce?: boolean;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
    children,
    delay = 0,
    className = "",
    viewportOnce = true,
    ...props
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: viewportOnce, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
