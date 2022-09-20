import { useActor, useInterpret } from "@xstate/react";
import triviaMachine, {
  State,
  GlobalStateContext,
} from "./State/triviaMachine";

import Error from "@/Pages/Error";
import Loading from "@/Pages/Loading/Loading";
import SelectQuestionAmount from "./Pages/SelectQuestionAmount";
import SelectCategory from "./Pages/SelectCategory";
import SelectDifficulty from "./Pages/SelectDifficulty";
import Quiz from "./Pages/Quiz";
import EndQuiz from "./Pages/Quiz/EndQuiz";

function App() {
  const triviaService = useInterpret(triviaMachine);
  const [state] = useActor(triviaService);

  const getState = () => {
    if (typeof state.value === "object") return Object.keys(state.value)[0];
    return state.value;
  };

  const getPage = () => {
    switch (getState()) {
      case State.LOADING:
        const subState = Object.values(state.value)[0] as String;
        return <Loading state={subState} />;
      case State.ERROR:
        return <Error />;
      case State.SELECT_QUESTION_AMOUNT:
        return <SelectQuestionAmount />;
      case State.SELECT_CATEGORY:
        return <SelectCategory />;
      case State.SELECT_DIFFICULTY:
        return <SelectDifficulty />;
      case State.START_QUIZ:
        return <Quiz />;
      case State.END_QUIZ:
        return <EndQuiz />;
    }
  };

  return (
    <GlobalStateContext.Provider value={{ triviaService }}>
      <div className='App'>{getPage()}</div>
    </GlobalStateContext.Provider>
  );
}

export default App;
