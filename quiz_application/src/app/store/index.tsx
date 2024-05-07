// creating a store for the application

import { create } from "zustand";

export type ConfigTypes = {
  numberOfQuestions: number;
  category: { id: number; name: string };
  level: string;
  mode: string;
  status: string;
  score: number;
};

const defaultConfig: ConfigTypes = {
  numberOfQuestions: 10,
  category: {
    id: 0,
    name: "",
  },
  level: "",
  mode: "",
  status: "",
  score: 0,
};

const useQuiz = create(
  (set: (fn: (state: { config: ConfigTypes }) => void) => void) => ({
    config: { ...defaultConfig },
    addLevel: (level: string) =>
      set((state) => ({ config: { ...state.config, level: level } })),
    addNumberOfQuestions: (count: number) =>
      set((state) => ({
        config: { ...state.config, numberOfQuestion: count },
      })),
    addCategory: (id: number, name: string) =>
      set((state) => ({
        config: { ...state.config, category: { id: id, name: name } },
      })),
    addMode: (level: string) =>
      set((state) => ({ config: { ...state.config, level: level } })),
    addStatus: (status: string) =>
      set((state) => ({ config: { ...state.config, status: status } })),
    addScore: (score: number) =>
      set((state) => ({ config: { ...state.config, score: score } })),
  })
);

export default useQuiz;
