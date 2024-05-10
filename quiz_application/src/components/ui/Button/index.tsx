// file to add buttons for the application
"use client";
import useQuiz from "@/app/store";
import { useTheme } from "@/context/ThemeContext";

const Button = () => {
  const { theme } = useTheme();
  const addStatus = useQuiz((state) => state.addStatus);
  return (
    <div>
      {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="">Green to blue</span>
      </button> */}
      <button
        onClick={() => addStatus("start")}
        type="button"
        className={`text-white ${
          theme === "light"
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
            : " transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0 text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        } font-medium rounded-lg text-lg px-32 py-4 text-center me-2 mb-2`}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Button;
