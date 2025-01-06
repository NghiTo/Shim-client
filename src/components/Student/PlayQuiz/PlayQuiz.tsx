import { useQuery } from "react-query";
import { getAllQuizzes } from "../../../apis/quiz.api";
import { QuizResponse } from "../../../types/quiz.type";
import quizBackground from "/Works/Shim-client/src/assets/bg-quiz.jpg";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

const PlayQuiz = () => {
  const { quizCode } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { data } = useQuery<QuizResponse[]>({
    queryKey: ["quiz", quizCode],
    queryFn: () => getAllQuizzes({ quizCode }),
  });

  const currentQuestion = data?.[0]?.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

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
          Question {currentQuestionIndex + 1} / {data?.[0]?.questions.length}
        </p>
        <div className="w-full h-4 mt-1 flex flex-row bg-gray-200 rounded-md">
          <div
            className="h-full bg-[#fe5f5c] rounded-l-md transition-all duration-500"
            style={{
              width: `${
                ((currentQuestionIndex + 1) * 100) /
                (data?.[0]?.questions.length || 1)
              }%`,
            }}
          ></div>
        </div>

        {currentQuestion?.type === "multipleChoice" && (
          <MultipleChoiceQuestion
            question={currentQuestion}
            onSubmit={handleNextQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default PlayQuiz;
