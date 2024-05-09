// file for the quiz page
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import useQuiz from "../store";
import { cn } from "@/lib/utils";
import { Player } from "@lottiefiles/react-lottie-player";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}

const Quiz = () => {
  const [question, setQuestion] = useState<Question[]>([]);
  const [answers, setAnswer] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state) => state.config);
  const addScore = useQuiz((state) => state.addScore);

  const fetchedQuestionDebounce = debounce(fetchQuestions, 500);

  useEffect(() => {
    fetchedQuestionDebounce();
  }, [config.numberOfQuestions, config.level, config.category.id, config.mode]);

  // function to fetch the questions
  async function fetchQuestions() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category.id}&difficulty=${config.level}&type=${config.mode}`
      );
      const { results } = await response.json();
      let shuffledResults = results.map((e: any) => {
        let value = [...e.incorrect_answers, e.correct_answer]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        e.answers = [...value];
        return e;
      });
      setQuestion([...shuffledResults]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }

  // adding a useEffect to change the question after 15 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [question, timerSeconds]);

  // useEffect to handle timer reaching 0
  useEffect(() => {
    if (timerSeconds === 0) {
      handleNext();
    }
  }, [timerSeconds]);

  useEffect(() => {
    // Update the timer value every second
    const timerInterval = setInterval(() => {
      setTimerSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clear the timer interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  // function to check the answer
  const checkAnswer = (answer: string) => {
    if (answer === question[0].correct_answer) {
      addScore(0);
    }
    setAnswer(question[0].correct_answer);
  };

  // function to handle the next question
  const handleNext = () => {
    let remainingQuestion = [...question];
    remainingQuestion.shift();
    setQuestion([...remainingQuestion]);
    setAnswer("");
    setTimerSeconds(15);
  };

  return (
    <section className="flex flex-col justify-center items-center mt-16">
      {question.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question Number
          <span className="text-blue-600 dark:text-blue-500">
            {" "}
            #{config.numberOfQuestions - question.length + 1}
          </span>
        </h1>
      ) : (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Quiz Ended
        </h1>
      )}
      {question.length ? (
        <p className="text-2xl">Score:{config.score}</p>
      ) : null}

      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
        <h4 className="mb-4 text-center text-2xl font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500 md:text-2xl lg:text-5xl">
          {question.length ? question[0].question : null}
        </h4>
        {loading && (
          <div className="flex flex-col">
            <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />
            <Skeleton className="w-[600px] h-[500px] rounded-sm" />
          </div>
        )}

        {!question.length && !loading && (
          <div className="flex flex-col justify-center item-center">
            <Player
              src="https://lottie.host/5042b968-9f7d-4bcb-8b9f-c81b55398cea/SUWE1MhJin.json"
              className="player"
              loop
              autoplay
              style={{ height: "400px", width: "400px" }}
            />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              YOUR SCORE :{config.score}
            </h1>
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="w-full my-4 py-3.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Restart Quiz
            </button>
          </div>
        )}

        {question.length ? (
          <div className="flex justify-center items-center">
            <p className="text-xl font-semibold mr-2">Time Left:</p>
            <span className="text-xl font-semibold">
              {timerSeconds} seconds
            </span>
          </div>
        ) : null}

        <div className="flex justify-evenly items-center my-10 flex-wrap w-[90%]">
          {question.length
            ? question[0].answers.map((answer) => (
                <button
                  onClick={() => checkAnswer(answer)}
                  key={answer}
                  type="button"
                  className={cn(
                    "w-[33%] border-0 my-4 py-3.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg  shadow-blue-200 shadow-2xl hover:bg-green-500 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
                    {
                      "bg-red-600": answers && answer !== answers,
                      "bg-green-500": answers && answer === answers,
                      "hover:bg-red-600": answers && answer !== answers,
                      "hover:bg-green-500": answers && answer === answers,
                    }
                  )}
                >
                  {answer}
                </button>
              ))
            : null}
        </div>
        {question.length ? (
          <button
            onClick={() => handleNext()}
            type="button"
            className="w-[33%] my-4 py-3.5 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Next
          </button>
        ) : null}
      </section>
    </section>
  );
};

export default Quiz;
