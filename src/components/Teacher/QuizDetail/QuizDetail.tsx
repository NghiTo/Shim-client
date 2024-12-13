import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { findQuizById } from "../../../apis/quiz.api";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import { addSuffix } from "../../../utils/formatText";
import { FaRegEdit } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";
import { Dropdown, MenuProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { GoDownload } from "react-icons/go";

const items: MenuProps["items"] = [
  {
    key: "Share with students",
    label: "Share with students",
    icon: <BsFillPeopleFill />,
  },
  {
    key: "Share with teachers",
    label: "Share with teachers",
    icon: <IoPerson />,
  },
];

const QuizDetail = () => {
  const { quizId } = useParams();
  const { data: quiz } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => findQuizById(quizId as string),
  });
  return (
    <div className="bg-gray-100 h-full py-8 px-4">
      <div className="rounded-md border border-gray-400 p-6 flex flex-col bg-white gap-6">
        <div className="flex flex-row gap-4">
          <img
            src={quiz?.data.coverImg || defaultImg}
            alt="quiz ava"
            className={`object-cover aspect-square border border-gray-400 rounded-md w-20 ${
              quiz?.data.coverImg ? "" : "bg-gray-100"
            }`}
          />
          <div className="flex flex-col justify-center">
            <p className="text-lg font-medium">{quiz?.data.title}</p>
            <p className="text-gray-500">
              {quiz?.data.subject} - {quiz?.data.grade} grade -{" "}
              {addSuffix(quiz?.data.questions.length, "play")}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 ml-auto items-center">
          <Link to={`/teacher/create-quiz/${quizId}`} className="py-2 px-4 border border-gray-400 rounded-md flex flex-row items-center gap-2 font-medium hover:bg-gray-100">
            <FaRegEdit />
            <p>Edit</p>
          </Link>
          <button className="py-2 px-4 border border-gray-400 rounded-md flex flex-row items-center gap-2 font-medium hover:bg-gray-100">
            <FaRegFolder />
            <p>Save</p>
          </button>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div className="py-2 px-3 cursor-pointer border border-gray-400 rounded-md flex flex-row items-center gap-1 font-medium hover:bg-gray-100">
              <PiShareFat />
              <p>Share</p>
              <IoIosArrowDown />
            </div>
          </Dropdown>
          <button className="py-2 px-4 border border-gray-400 rounded-md flex flex-row items-center gap-2 font-medium hover:bg-gray-100">
            <GoDownload />
            <p>Worksheet</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
