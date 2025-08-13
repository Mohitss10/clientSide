// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {/* Mobile: text + toggle */}
      <div className="sm:hidden flex items-center gap-3 p-2  rounded-full">

        <div
          onClick={toggleTheme}
          className={`relative w-15 h-8.5 rounded-full cursor-pointer transition-colors duration-500 ${
            theme === "dark" ? "bg-gray-700" : "bg-blue-300"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-500 ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
          </div>
        </div>
      </div>

{/* Desktop: only toggle */}
<div
  onClick={toggleTheme}
  className={`hidden sm:flex items-center justify-center w-15 h-8.5 rounded-full cursor-pointer transition-colors duration-500 ${
    theme === "dark" ? "bg-gray-700" : "bg-blue-300"
  }`}
>
  <div
    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-500 ${
      theme === "dark" ? "translate-x-3 bg-gray-600" : "-translate-x-3 bg-yellow-300"
    }`}
  >
    {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
  </div>
</div>


    </>
  );
}
