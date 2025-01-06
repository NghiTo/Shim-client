import { IoClose, IoPersonCircleOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllQuizzes } from "../../../apis/quiz.api";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import { QuizResponse } from "../../../types/quiz.type";
import { addSuffix } from "../../../utils/formatText";
import { Button } from "antd";
import { FaPlay } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { RiShareBoxLine } from "react-icons/ri";
import { useState } from "react";

const PreStartQuiz = () => {
  const { quizCode } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery<QuizResponse[]>({
    queryKey: ["quiz", quizCode],
    queryFn: () => getAllQuizzes({ quizCode }),
  });

  const [countdown, setCountdown] = useState<number | string | null>(null);

  const handleStartClick = () => {
    setCountdown(3); // Bắt đầu đếm ngược từ 3 giây
    let counter = 3;
    const timer = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(timer);
        navigate(`/student/start/quiz/${quizCode}`);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-16">
      <div
        onClick={() => navigate(-1)}
        className="bg-white w-fit rounded-md p-2 cursor-pointer border border-gray-400"
      >
        <IoClose />
      </div>
      <div className="flex flex-row gap-6 px-24">
        <div className="flex flex-col gap-6">
          <div className="p-4 bg-white rounded-md flex flex-col gap-4 border border-gray-400 shadow-md">
            <div className="w-full flex flex-row gap-4">
              <img
                src={(data && data[0].coverImg) || defaultImg}
                alt="avatar quiz"
                className={`w-1/4 object-cover aspect-square border border-gray-400 rounded-md ${
                  data && data[0].coverImg ? "" : "bg-gray-100"
                }`}
              />
              <div>
                <h1 className="text-lg font-medium">{data && data[0].title}</h1>
                <p>
                  {addSuffix(
                    (data && data[0].questions.length) as number,
                    "question"
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <IoPersonCircleOutline className="text-2xl" />
              <p>Author:</p>
              <p>{data && data[0].user?.firstName}</p>
              <p>{data && data[0].user?.lastName}</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-md flex flex-col gap-4 border border-gray-400 shadow-md">
            <h1 className="font-medium">Recent activity</h1>
            <div>
              <div className="flex flex-row items-center">
                <p>Assignment</p>
                <p className="ml-auto font-medium">100%</p>
              </div>
              <div className="w-full h-4 mt-1 rounded-md flex flex-row">
                <div
                  className="h-full bg-green-500 rounded-l-md"
                  style={{ width: "70%" }}
                ></div>
                <div
                  className="h-full bg-red-500 rounded-r-md"
                  style={{ width: "30%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">12/15/2024, 9:30 PM</p>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-white rounded-md p-6 border border-gray-400 flex flex-col gap-4">
            {countdown !== null ? (
              <div className="text-center text-3xl font-bold text-red-500">
                {countdown}
              </div>
            ) : (
              <Button
                type="primary"
                icon={<FaPlay />}
                onClick={handleStartClick}
                className="text-white rounded-md p-5 text-xl"
              >
                Start
              </Button>
            )}
            <Button
              type="default"
              icon={<FaUserFriends />}
              className="rounded-md p-5 text-xl"
            >
              Challenge your friends
            </Button>
            <Button
              type="default"
              icon={<RiShareBoxLine />}
              className="rounded-md p-5 text-xl"
            >
              Flashcards
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreStartQuiz;
