// file for the quiz page

import { LucideHeading4 } from "lucide-react";

const Quiz = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-16">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Question Number
        <span className="text-blue-600 dark:text-blue-500"> #1</span>.
      </h1>
      <p className="text-2xl">Score:0</p>
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
        <h4 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500 md:text-2xl lg:text-5xl">
          Question
        </h4>
      </section>
    </section>
  );
};

export default Quiz;
