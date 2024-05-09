// file to show the dropdowns

"use client";

import useQuiz from "@/app/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Check, ChevronDown, Circle } from "lucide-react";
import { useEffect, useState } from "react";

// giving the type of the category
type CategoryType = {
  id: number;
  name: string;
};

const Mode = ["boolean", "multiple"];
const Level = ["easy", "medium", "hard"];

const DropDown = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);

  const addCategory = useQuiz((state) => state.addCategory);
  const addLevel = useQuiz((state) => state.addLevel);
  const addMode = useQuiz((state) => state.addMode);
  const config = useQuiz((state) => state.config);

  useEffect(() => {
    async function fetchCategory() {
      const { trivia_categories } = await (
        await fetch("https://opentdb.com/api_category.php")
      ).json();

      setCategory([...trivia_categories]);
    }
    fetchCategory();
  });

  return (
    <section className="flex justify-evenly items-center py-5 w-full">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flux outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white">
            {config.category.name ? config.category.name : "Choose Category"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>choose category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((category) => (
              <DropdownMenuItem
                style={{ cursor: "pointer" }}
                key={category.name}
                onClick={() => addCategory(category.id, category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flux outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white">
            {config.level ? config.level : "Choose Level"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>choose level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Level.map((e) => (
              <DropdownMenuItem key={e} onClick={() => addLevel(e)}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flux outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white">
            {config.mode ? config.mode : "Choose Mode"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>choose mode</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Mode.map((e) => (
              <DropdownMenuItem key={e} onClick={() => addMode(e)}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default DropDown;
