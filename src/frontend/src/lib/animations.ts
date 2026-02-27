import { Variants } from 'framer-motion';

export const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const cardHoverVariant = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: {
        scale: 1.02,
        boxShadow: "0px 10px 30px rgba(139, 92, 246, 0.15)", // Subtle purple glow
        transition: { type: 'spring', stiffness: 400, damping: 25 }
    }
};
