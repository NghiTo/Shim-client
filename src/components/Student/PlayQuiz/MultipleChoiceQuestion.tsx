import { useState, useEffect } from "react";
import { Button } from "antd";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { QuestionResponse } from "../../../types/quiz.type";
import { UseMutateFunction } from "react-query";

interface MultipleChoiceQuestionProps {
  question: QuestionResponse;
  onSubmit: (selectedAnswer: string) => void;
  mutate: UseMutateFunction<unknown, unknown, string, unknown>;
}

const MultipleChoiceQuestion = ({
  question,
  onSubmit,
  mutate,
}: MultipleChoiceQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswerId, setCorrectAnswerId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setCorrectAnswerId(null);
    setIsSubmitted(false);
    setIsTransitioning(false);
  }, [question]);

  const handleAnswerSelect = (answerId: string) => {
    if (!isSubmitted) setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    const correctAnswer = question?.answers.find((answer) => answer.isCorrect);
    setCorrectAnswerId(correctAnswer?.id || null);
    setIsSubmitted(true);
    mutate(correctAnswer?.content as string);

    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onSubmit(selectedAnswer as string);
        setIsTransitioning(false);
      }, 500);
    }, 2000);
  };

  return (
    <div
      className={`flex flex-col gap-4 transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-3xl text-[#000a38] font-bold">{question?.title}</p>
      {question?.answers.map((answer) => {
        const isSelected = selectedAnswer === answer.id;
        const isCorrect = correctAnswerId === answer.id;
        const isWrong = isSubmitted && isSelected && !isCorrect;

        let backgroundClass = "";
        if (isSubmitted) {
          if (isCorrect) backgroundClass = "bg-green-200 border-green-500";
          else if (isWrong) backgroundClass = "bg-red-200 border-red-500";
        } else if (isSelected) {
          backgroundClass = "bg-gray-200";
        }

        let borderClass = "border-gray-400";
        if (isSubmitted) {
          if (isCorrect) borderClass = "border-green-500";
          else if (isWrong) borderClass = "border-red-500";
        } else if (isSelected) {
          borderClass = "border-[#fe5f5c]";
        }

        let checkIconClass = isSelected
          ? "bg-[#fe5f5c] border-[#fe5f5c]"
          : "border-gray-400";

        if (isSubmitted) {
          if (isCorrect) checkIconClass = "bg-green-500 border-green-500";
          else if (isWrong) checkIconClass = "bg-red-500 border-red-500";
        }

        return (
          <div
            key={answer.id}
            onClick={() =>
              !isSubmitted && handleAnswerSelect(answer.id as string)
            }
            className={`flex flex-row gap-4 items-center cursor-pointer transition-all ease-in-out hover:bg-gray-200 duration-300 p-4 rounded-full ${backgroundClass} ${borderClass}`}
          >
            <div
              className={`rounded-full text-white p-2 border transition-all ease-in-out duration-300 ${checkIconClass}`}
            >
              <FaCheck
                className={`text-xs ${
                  isSelected || (isSubmitted && isCorrect) ? "" : "opacity-0"
                }`}
              />
            </div>
            <p
              className={`text-lg text-[#000a38] font-medium transition-all ease-in-out duration-300 ${
                isSelected && "pl-4"
              }`}
            >
              {answer.content}
            </p>
          </div>
        );
      })}

      <Button
        type="primary"
        className="text-lg p-5 w-fit ml-auto"
        icon={<FaArrowRight />}
        disabled={selectedAnswer === null}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default MultipleChoiceQuestion;
