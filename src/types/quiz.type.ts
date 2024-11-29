export type QuizState = {
  title: string;
  question: string;
  answers: Answer[];
  type: string;
  point: number;
  time: number;
};

export type quizSetting = {
  title: string;
  subject: string;
  grade: string;
  isPublic?: boolean;
};

export type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type QuizResponse = {
  id: string;
  coverImg: string | null;
  grade: string;
  isPublic: boolean;
  point: number;
  subject: string;
  time: number;
  title: string;
};

export type AnswerRequest = {
  content: string;
  isCorrect: boolean;
};

export type MultipleChoiceForm = {
  title: string;
  answers: AnswerRequest[];
};

export type AnswerResponse = {
  id: string;
  coverImg?: string;
  content: string;
  isCorrect: boolean;
}

export type QuestionResponse = {
  id: string;
  title: string;
  type: string;
  quizId: string;
  answers: AnswerResponse[];
};