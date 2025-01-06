import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { findQuizById } from "../../../apis/quiz.api";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import {
  addSuffix,
  convertCamelCaseToTitleCase,
} from "../../../utils/formatText";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck, FaPlay, FaRegFolder } from "react-icons/fa6";
import { Dropdown, MenuProps, Switch } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { QuestionResponse } from "../../../types/quiz.type";
import { formatTime } from "../../../utils/formatTime";
import { useState } from "react";

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
  const [checked, setChecked] = useState(true);

  const { data: quiz } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => findQuizById(quizId as string),
  });

  const showAnswers = (checked: boolean) => {
    if (checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <div className="bg-gray-100 h-full py-8 px-4 flex flex-col gap-6">
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
              {quiz?.data.subject} - {quiz?.data.grade} grade
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Link
            to={`/teacher/create-quiz/${quizId}`}
            className="py-2 px-4 border border-gray-400 rounded-md flex flex-row items-center gap-2 font-medium hover:bg-gray-100"
          >
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
          <button className="py-2 px-4 ml-auto border border-gray-400 rounded-md flex flex-row items-center gap-2 font-medium hover:bg-gray-100">
            <FaPlay />
            <p>Try it as student</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-row w-full items-center">
          <h2 className="text-gray-500 font-medium text-lg">
            {addSuffix(quiz?.data.questions.length, "question")}
          </h2>
          <div className="ml-auto flex flex-row items-center gap-2">
            <p className="text-gray-500 font-medium text-lg">Show answers</p>
            <Switch defaultChecked onChange={showAnswers} />
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-4">
          {quiz?.data.questions.map(
            (question: QuestionResponse, index: string) => (
              <div
                key={question.id}
                className="bg-white p-4 rounded-lg border border-gray-400 flex flex-col gap-4"
              >
                <div className="flex flex-row">
                  <div className="text-xs py-1 w-fit px-4 border border-gray-400 rounded-full flex flex-row gap-1">
                    <p>{index + 1}.</p>
                    <p>{convertCamelCaseToTitleCase(question.type)}</p>
                  </div>
                  <div className="flex flex-row gap-2 ml-auto">
                    <div className="text-xs ml-auto py-1 w-fit px-2 border border-gray-400 rounded-full flex flex-row gap-1">
                      {formatTime(question.time)}
                    </div>
                    <div className="text-xs ml-auto py-1 w-fit px-2 border border-gray-400 rounded-full flex flex-row gap-1">
                      {addSuffix(question.point, "point")}
                    </div>
                  </div>
                </div>
                <p>{question.title}</p>
                <div className="grid grid-cols-2">
                  {question.answers.map((answer) => (
                    <div className="flex flex-row gap-1 items-center">
                      <div
                        className={`border border-gray-500 rounded-full text-xs text-white ${
                          answer.isCorrect && checked
                            ? "bg-green-600"
                            : "bg-white"
                        } `}
                      >
                        <FaCheck />
                      </div>
                      <p>{answer.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
