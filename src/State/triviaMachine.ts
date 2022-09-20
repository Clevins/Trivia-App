import { actions, assign, createMachine, InterpreterFrom } from "xstate";
import type { EventObject } from "xstate";
import { createContext } from "react";

import { API_ROUTES } from "../Lib/apiRoutes";
import { QuestionProp } from "../Pages/Quiz/Question/QuestionTypes";

export enum State {
  LOADING = "loading",
  FETCH_QUESTIONS = "fetchQuestions",
  ERROR = "error",
  SELECT_QUESTION_AMOUNT = "selectQuestionAmount",
  SELECT_CATEGORY = "selectCategory",
  SELECT_DIFFICULTY = "selectDifficulty",
  START_QUIZ = "startQuiz",
  END_QUIZ = "endQuiz",
}

export interface TriviaMachineContext {
  sessionToken: string | undefined;
  questionAmountOptions: QuestionsOption[];
  selectedQuestionAmount: number | undefined;
  categoryOptions: Category[] | undefined;
  selectedCategory: number | undefined;
  difficultyOptions: Difficulty[];
  selectedDifficulty: string | undefined;
  questions: Questions;
  activeQuestionIndex: number;
  correctAnswersCount: number;
}

export type EventId = "SELECT";

export interface ITriviaMachineEvent extends EventObject {
  type: EventId;
  value?: number | undefined;
  category?: number | undefined;
  difficulty?: string;
  correct?: boolean;
}

export type QuestionsOption = {
  label: string;
  value: number;
};

export type Category = {
  id: number;
  name: string;
};

export type Difficulty = {
  label: string;
  value: string;
};

export type Questions = {
  results: QuestionProp[];
};

const questionAmountOptions: QuestionsOption[] = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "30", value: 30 },
  { label: "35", value: 35 },
  { label: "40", value: 40 },
];

const difficultyOptions: Difficulty[] = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];

const invokeFetchAPIKey = () => {
  return fetch(API_ROUTES.fetchToken).then((response) => response.json());
};

const invokeFetchCategories = () => {
  return fetch(API_ROUTES.fetchCategories).then((response) => response.json());
};

const invokeFetchQuestions = (
  ctx: TriviaMachineContext,
  ev: ITriviaMachineEvent
) => {
  const {
    selectedQuestionAmount,
    selectedCategory,
    selectedDifficulty,
    sessionToken,
  } = ctx;

  if (
    !selectedQuestionAmount ||
    !selectedCategory ||
    !selectedDifficulty ||
    !sessionToken
  ) {
    throw new Error();
  }

  const path = API_ROUTES.fetchQuestions(
    selectedQuestionAmount,
    selectedCategory,
    selectedDifficulty,
    sessionToken
  );
  return fetch(path).then((response) => response.json());
};

const setSelectedQuestionAmount = actions.assign<
  TriviaMachineContext,
  ITriviaMachineEvent
>({
  selectedQuestionAmount: (ctx, ev) => ev.value,
});

const setSelectedCategory = actions.assign<
  TriviaMachineContext,
  ITriviaMachineEvent
>({
  selectedCategory: (ctx, ev) => ev.category,
});

const setSelectedDifficulty = actions.assign<
  TriviaMachineContext,
  ITriviaMachineEvent
>({
  selectedDifficulty: (ctx, ev) => ev.difficulty,
});
const { pure } = actions;

const incrementQuestionIndex = actions.assign<
  TriviaMachineContext,
  ITriviaMachineEvent
>({
  activeQuestionIndex: (ctx, ev) => ctx.activeQuestionIndex + 1,
});

const incrementCorrectCounter = pure<TriviaMachineContext, ITriviaMachineEvent>(
  (ctx, ev) => {
    if (ev.correct) {
      return actions.assign({
        correctAnswersCount: (ctx, ev) => ctx.correctAnswersCount + 1,
      });
    }
  }
);

const setActiveQuestionIndex = actions.assign<
  TriviaMachineContext,
  ITriviaMachineEvent
>({
  activeQuestionIndex: (ctx, ev) => 0,
  correctAnswersCount: (ctx, ev) => 0,
});

const triviaMachine = createMachine<TriviaMachineContext, ITriviaMachineEvent>(
  {
    id: "triviaMachine",
    context: {
      sessionToken: undefined,
      questionAmountOptions: questionAmountOptions,
      selectedQuestionAmount: undefined,
      categoryOptions: undefined,
      selectedCategory: undefined,
      difficultyOptions: difficultyOptions,
      selectedDifficulty: undefined,
      questions: {
        results: [],
      },
      activeQuestionIndex: 0,
      correctAnswersCount: 0,
    },
    initial: "loading",
    states: {
      loading: {
        id: "loading",
        initial: "fetchToken",
        states: {
          fetchToken: {
            invoke: {
              id: "getAPIToken",
              src: invokeFetchAPIKey,
              onDone: {
                target: "fetchCategory",
                actions: assign({
                  sessionToken: (ctx, ev) => ev.data.token,
                }),
              },
              onError: {
                target: "#error",
              },
            },
          },
          fetchCategory: {
            invoke: {
              id: "fetchCategory",
              src: invokeFetchCategories,
              onDone: {
                target: "#selectQuestionAmount",
                actions: assign({
                  categoryOptions: (ctx, ev) => ev.data.trivia_categories,
                }),
              },
              onError: {
                target: "#error",
              },
            },
          },
          fetchQuestions: {
            invoke: {
              id: "getQuestions",
              src: invokeFetchQuestions,
              onDone: {
                target: "#startQuiz",
                actions: assign({
                  questions: (ctx, ev) => ev.data,
                }),
              },
              onError: {
                target: "#error",
              },
            },
          },
        },
      },
      error: {
        id: "error",
        on: {
          SELECT: {
            target: "selectQuestionAmount",
          },
        },
      },
      selectQuestionAmount: {
        id: "selectQuestionAmount",
        on: {
          SELECT: {
            target: "selectCategory",
            actions: ["setSelectedQuestionAmount"],
          },
        },
      },
      selectCategory: {
        id: "selectCategory",
        on: {
          SELECT: {
            target: "selectDifficulty",
            actions: ["setSelectedCategory"],
          },
        },
      },
      selectDifficulty: {
        id: "selectDifficulty",
        on: {
          SELECT: {
            target: "#loading.fetchQuestions",
            actions: ["setSelectedDifficulty"],
          },
        },
      },
      startQuiz: {
        id: "startQuiz",
        initial: "askQuestion",
        states: {
          askQuestion: {
            id: "askQuestion",
            entry: "setActiveQuestionIndex",
            on: {
              SELECT: [
                {
                  cond: "isEndOfQuiz",
                  target: "#endQuiz",
                  actions: "incrementCorrectCounter",
                },
                {
                  actions: [
                    "incrementQuestionIndex",
                    "incrementCorrectCounter",
                  ],
                },
              ],
            },
          },
        },
      },
      endQuiz: {
        id: "endQuiz",
        on: {
          SELECT: {
            target: "selectQuestionAmount",
          },
        },
      },
    },
  },
  {
    actions: {
      setSelectedQuestionAmount,
      setSelectedCategory,
      setSelectedDifficulty,
      setActiveQuestionIndex,
      incrementQuestionIndex,
      incrementCorrectCounter,
    },
    guards: {
      isEndOfQuiz: (ctx, event) => {
        return ctx.activeQuestionIndex + 1 >= ctx.questions.results.length;
      },
    },
  }
);

export const GlobalStateContext = createContext({
  triviaService: {} as InterpreterFrom<typeof triviaMachine>,
});

export default triviaMachine;
