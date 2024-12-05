import { useQuery } from "react-query";
import { getAllQuizzes } from "../../../apis/quiz.api";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import { Skeleton } from "antd";
import { QuizResponse } from "../../../types/quiz.type";
import { MdClass, MdSubject } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../../utils/formatTime";

const Published = () => {
  const navigate = useNavigate();
  const { data: quizzes, isLoading } = useQuery({
    queryKey: "published",
    queryFn: () => getAllQuizzes({ status: "finished" }),
  });

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-row items-start gap-2">
          <Skeleton.Image active className="aspect-square object-cover" />
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      ) : quizzes?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-md shadow-md border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800">
            Create your first quiz or lesson
          </h2>
          <p className="text-gray-600 mt-2">
            Pull in questions from the Quizizz library or make your own. It’s
            quick and easy!
          </p>
          <button
            onClick={() => navigate("/create-assessment")}
            className="mt-4 px-6 py-2 text-white bg-[#fe605d] hover:bg-[#fc8785] rounded-md shadow-md"
          >
            Create Quiz
          </button>
        </div>
      ) : (
        quizzes?.map((quiz: QuizResponse) => {
          return (
            <div
              key={quiz.id}
              className="p-3 border border-gray-400 w-full rounded-md flex flex-row items-start gap-3"
            >
              <img
                src={quiz.coverImg || defaultImg}
                alt="Quiz Ava"
                className="bg-gray-300 w-1/6 object-cover aspect-square h-auto rounded-md"
              />
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">{quiz.title}</p>
                <div className="flex flex-row gap-1 items-center">
                  <MdClass />
                  <p>{quiz.grade} grade</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <MdSubject />
                  <p>{quiz.subject}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <FaQuestion />
                  <p>{quiz.questions.length} questions</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <p>Published: {timeAgo(quiz.updatedAt as string)}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Published;
