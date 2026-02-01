"use client";

import { useState, useEffect } from "react";

/**
 * A reading progress bar that shows scroll position at the top of the page.
 * Useful for blog posts and long-form content.
 */
export function ReadingProgress() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setProgress(scrollProgress);
            setVisible(scrollTop > 100); // Show after scrolling 100px
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();

        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "3px",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                    transition: "width 0.1s ease-out",
                    borderRadius: "0 2px 2px 0",
                    boxShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
                }}
            />
        </div>
    );
}
