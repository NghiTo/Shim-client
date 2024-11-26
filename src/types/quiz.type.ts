export type QuizState = {
  question: string;
  answers: Answer[];
  type: string;
  point: number;
  time: number;
};

export type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
};
