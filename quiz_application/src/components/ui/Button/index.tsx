// file to add buttons for the application
"use client";
import useQuiz from "@/app/store";

const Button = () => {
  const addStatus = useQuiz((state) => state.addStatus);
  return (
    <div>
      <button
        onClick={() => addStatus("start")}
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-32 py-4 text-center me-2 mb-2"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Button;
