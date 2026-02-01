"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * A floating back-to-top button that appears when scrolling down.
 */
export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="back-to-top-button"
            style={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--foreground)",
                color: "var(--background)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                zIndex: 100,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
                pointerEvents: visible ? "auto" : "none",
                transition: "opacity 0.3s ease, transform 0.3s ease, background 0.2s ease",
            }}
        >
            <ArrowUp size={20} />

            <style jsx>{`
                .back-to-top-button:hover {
                    background: var(--primary) !important;
                    transform: translateY(-2px) scale(1.05) !important;
                    box-shadow: 0 6px 24px rgba(34, 211, 238, 0.4) !important;
                }
                
                .back-to-top-button:active {
                    transform: translateY(0) scale(0.95) !important;
                }
            `}</style>
        </button>
    );
}
