"use client";

import { useState, useEffect, useCallback } from "react";

interface TypeWriterProps {
    /** Array of phrases to cycle through */
    phrases: string[];
    /** Time to wait before starting to type (ms) */
    startDelay?: number;
    /** Speed of typing each character (ms) */
    typeSpeed?: number;
    /** Speed of deleting each character (ms) */
    deleteSpeed?: number;
    /** Pause after typing complete phrase (ms) */
    pauseDuration?: number;
    /** CSS class for the container */
    className?: string;
    /** Whether to show blinking cursor */
    showCursor?: boolean;
    /** Custom cursor character */
    cursorChar?: string;
}

export function TypeWriter({
    phrases,
    startDelay = 500,
    typeSpeed = 80,
    deleteSpeed = 40,
    pauseDuration = 2000,
    className = "",
    showCursor = true,
    cursorChar = "|",
}: TypeWriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(true);

    const currentPhrase = phrases[phraseIndex];

    const tick = useCallback(() => {
        if (isWaiting) return;

        if (!isDeleting) {
            // Typing
            if (displayText.length < currentPhrase.length) {
                setDisplayText(currentPhrase.slice(0, displayText.length + 1));
            } else {
                // Finished typing, start pause
                setIsWaiting(true);
                setTimeout(() => {
                    setIsWaiting(false);
                    setIsDeleting(true);
                }, pauseDuration);
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                setDisplayText(displayText.slice(0, -1));
            } else {
                // Finished deleting, move to next phrase
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            }
        }
    }, [displayText, isDeleting, isWaiting, currentPhrase, pauseDuration, phrases.length]);

    // Initial delay before starting
    useEffect(() => {
        const timer = setTimeout(() => setIsWaiting(false), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    // Main typing loop
    useEffect(() => {
        if (isWaiting) return;

        const speed = isDeleting ? deleteSpeed : typeSpeed;
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting, isWaiting, typeSpeed, deleteSpeed]);

    return (
        <span className={className}>
            <span>{displayText}</span>
            {showCursor && (
                <span
                    className="typewriter-cursor"
                    style={{
                        animation: 'blink 1s step-end infinite',
                        marginLeft: '2px',
                        fontWeight: 100,
                    }}
                >
                    {cursorChar}
                </span>
            )}
            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </span>
    );
}
