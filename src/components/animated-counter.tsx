"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
    /** Target number to count to */
    target: number;
    /** Duration of animation in ms */
    duration?: number;
    /** Suffix to display after number (e.g., "+", "K") */
    suffix?: string;
    /** Prefix to display before number (e.g., "$") */
    prefix?: string;
    /** CSS class for styling */
    className?: string;
    /** Start animation when element is in viewport */
    animateOnView?: boolean;
}

export function AnimatedCounter({
    target,
    duration = 2000,
    suffix = "",
    prefix = "",
    className = "",
    animateOnView = true,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!animateOnView) {
            // Start immediately if not waiting for viewport
            animateCount();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    animateCount();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animateOnView, hasAnimated]);

    const animateCount = () => {
        const startTime = performance.now();
        const startValue = 0;

        const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation (ease-out-cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentCount = Math.floor(startValue + (target - startValue) * easeOut);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(updateCount);
    };

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}
