import { Theme, useThemeStore } from "@/store/theme.store";
import { Moon, Sun } from "lucide-react";

export function ThemePicker() {
  const { theme, setTheme } = useThemeStore();

  const isDark = theme === Theme.DARK;

  const toggleTheme = () => {
    setTheme(isDark ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 w-16 h-8 relative transition-all"
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform items-center ${
          isDark ? "translate-x-8" : "translate-x-1"
        }`}
      >
        {isDark ? (
          <Moon size={16} className="text-gray-500 mt-1 mx-auto" />
        ) : (
          <Sun size={16} className="text-gray-500  mt-1 mx-auto" />
        )}
      </div>
    </button>
  );
}
