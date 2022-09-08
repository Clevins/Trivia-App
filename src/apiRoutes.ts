const baseURL = "https://opentdb.com";

export const API_ROUTES = {
  fetchToken: `${baseURL}/api_token.php?command=request`,
  fetchCategories: `${baseURL}/api_category.php`,
  fetchQuestions: (
    amount: number,
    category: number,
    difficulty: string,
    token: string
  ) =>
    `${baseURL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&token=${token}`,
};
