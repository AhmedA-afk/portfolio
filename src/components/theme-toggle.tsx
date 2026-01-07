"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="glass-button" style={{ width: 40, height: 40, borderRadius: "50%" }} />;
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="glass-button"
            style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
            }}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" color="var(--text-primary)" size={20} />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" color="var(--text-primary)" size={18} />
            )}
        </button>
    );
}
