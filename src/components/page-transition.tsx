"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

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

    useEffect(() => {
        // Start fade out
        setIsTransitioning(true);

        // After fade out, update content and fade in
        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setIsTransitioning(false);
        }, 150); // Match the CSS transition duration

        return () => clearTimeout(timer);
    }, [pathname, children]);

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
