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
  coverImg?: string | null;
  isPublic?: boolean;
};

export type QuizUpdate = {
  title?: string;
  subject?: string;
  grade?: string;
  isPublic?: boolean;
  status?: string;
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
  status: string;
  subject: string;
  title: string;
  questions: QuestionResponse[];
  createdAt?: string
};

export type AnswerRequest = {
  content: string;
  isCorrect?: boolean;
};

export type MultipleChoiceForm = {
  title: string;
  answers: AnswerRequest[];
};

export type AnswerResponse = {
  id?: string;
  coverImg?: string;
  content: string;
  isCorrect: boolean;
};

export type QuestionResponse = {
  id: string;
  title: string;
  type: string;
  time: number;
  point: number;
  quizId: string;
  answers: AnswerResponse[];
};

export type QuestionUpdate = {
  time?: number;
  point?: number;
  title?: string;
  answers?: AnswerResponse[];
};

export type QuizFilter = {
  status?: string;
};
