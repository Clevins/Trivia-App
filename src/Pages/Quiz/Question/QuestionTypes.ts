export type QuestionProp = {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  difficulty?: string;
  category?: string;
  type?: string;
  allAnswers: string[];
};
