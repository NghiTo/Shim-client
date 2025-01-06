import { useQuery } from "react-query";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import { getAllQuizzes } from "../../../apis/quiz.api";
import { QuizResponse } from "../../../types/quiz.type";
import { MdClass, MdSubject } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { addSuffix } from "../../../utils/formatText";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

const Library = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { data: quizzes, isLoading } = useQuery({
    queryKey: "quizzes",
    queryFn: () => getAllQuizzes({ status: "finished", userId: user.id }),
  });

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col w-1/3 gap-4">
        <div className="font-medium text-lg">
          {addSuffix(quizzes?.length, "result")}
        </div>
        {isLoading ? (
          <div className="flex flex-row items-start gap-2">
            <Skeleton.Image active className="aspect-square object-cover" />
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        ) : (
          quizzes?.map((quiz: QuizResponse) => {
            return (
              <div
                onClick={() => navigate(`/teacher/quiz/${quiz.id}`)}
                key={quiz.id}
                className="p-3 border border-gray-400 w-full rounded-md flex flex-row items-start gap-3 cursor-pointer"
              >
                <img
                  src={quiz.coverImg || defaultImg}
                  alt="Quiz Ava"
                  className="bg-gray-300 w-1/3 object-cover aspect-square h-auto rounded-md"
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
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Library;
