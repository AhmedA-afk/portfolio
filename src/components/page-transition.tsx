"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState, ReactNode, useRef } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

/**
 * A wrapper component that adds fade transitions between page navigations.
 */
export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        // Skip transition on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Start fade out
        setIsTransitioning(true);

        // After fade out, update content and fade in
        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setIsTransitioning(false);
        }, 150); // Match the CSS transition duration

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <div
            className="page-transition-wrapper"
            style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.15s ease, transform 0.15s ease",
            }}
        >
            {displayChildren}
        </div>
    );
}
