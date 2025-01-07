import { useMutation, useQuery } from "react-query";
import { getAllQuizzes } from "../../../apis/quiz.api";
import { QuizResponse } from "../../../types/quiz.type";
import quizBackground from "/Works/Shim-client/src/assets/bg-quiz.jpg";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { createAnswer } from "../../../apis/answer.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import QuizCompleted from "./QuizCompleted";

const PlayQuiz = () => {
  const { quizCode } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const quiz = useSelector((state: RootState) => state.quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const { data } = useQuery<QuizResponse>({
    queryKey: ["quiz", quizCode],
    queryFn: () => getAllQuizzes({ quizCode }),
  });

  const currentQuestion = data?.questions[currentQuestionIndex];

  const { mutate } = useMutation((answer: string) =>
    createAnswer(user.id, quiz.attemptId, currentQuestion?.id, data?.id, answer)
  );
  const handleNextQuestion = () => {
    if (data?.questions && currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  if (isQuizCompleted) {
    return <QuizCompleted />;
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${quizBackground})` }}
    >
      <div className="bg-white rounded-lg w-1/2 px-24 py-12 flex flex-col gap-4">
        <img
          src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
          alt="Logo"
          className="w-1/4 object-cover"
        />
        <p className="text-xl text-[#000a38] font-bold">
          Question {currentQuestionIndex + 1} / {data?.questions.length}
        </p>
        <div className="w-full h-4 mt-1 flex flex-row bg-gray-200 rounded-md">
          <div
            className="h-full bg-[#fe5f5c] rounded-l-md transition-all duration-500"
            style={{
              width: `${
                ((currentQuestionIndex + 1) * 100) /
                (data?.questions.length || 1)
              }%`,
            }}
          ></div>
        </div>

        {currentQuestion?.type === "multipleChoice" && (
          <MultipleChoiceQuestion
            question={currentQuestion}
            onSubmit={handleNextQuestion}
            mutate={mutate}
          />
        )}
      </div>
    </div>
  );
};

export default PlayQuiz;
