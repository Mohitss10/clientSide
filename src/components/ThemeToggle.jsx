// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Icons

export default function ThemeToggle() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={toggleTheme}
            className={`
    p-3 rounded-full 
    transition-all duration-500 ease-in-out
    shadow-md
    hover:scale-110 hover:shadow-lg
    flex items-center justify-center
    ${theme === "dark" ? "bg-gray-800 text-yellow-400" : "bg-white text-blue-500"}
  `}
        >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

    );
}
