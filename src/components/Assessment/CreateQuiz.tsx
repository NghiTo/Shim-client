import { Button, Dropdown, MenuProps, Skeleton } from "antd";
import {
  FaArrowLeft,
  FaChartBar,
  FaCheck,
  FaHand,
  FaLayerGroup,
  FaRegClock,
} from "react-icons/fa6";
import {
  IoIosArrowDown,
  IoMdArrowDropdown,
  IoMdSettings,
} from "react-icons/io";
import { MdLabel, MdPlayArrow } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Question from "./Question";
import { LuFileType2, LuRectangleHorizontal } from "react-icons/lu";
import { BiCategory, BiMath } from "react-icons/bi";
import { useState } from "react";
import QuizSetting from "./QuizSetting";
import { useQuery } from "react-query";
import { findQuizById, getAllQuestions } from "../../apis/quiz.api";
import MultipleChoice from "./MultipleChoice";
import { QuestionResponse } from "../../types/quiz.type";

const itemsTime: MenuProps["items"] = [
  { label: "5 seconds", key: "5" },
  { label: "10 seconds", key: "10" },
  { label: "20 seconds", key: "20" },
  { label: "30 seconds", key: "30" },
  { label: "45 seconds", key: "45" },
  { label: "1 minute", key: "60" },
  { label: "1.5 minutes", key: "90" },
  { label: "2 minutes", key: "120" },
  { label: "3 minutes", key: "180" },
  { label: "5 minutes", key: "300" },
  { label: "10 minutes", key: "600" },
  { label: "15 minutes", key: "900" },
];

const itemsPoint: MenuProps["items"] = [
  { label: "1 point", key: "1" },
  { label: "2 points", key: "2" },
  { label: "3 points", key: "3" },
  { label: "4 points", key: "4" },
  { label: "5 points", key: "5" },
  { label: "6 points", key: "6" },
  { label: "7 points", key: "7" },
  { label: "8 points", key: "8" },
  { label: "9 points", key: "9" },
  { label: "10 points", key: "10" },
  { label: "11 points", key: "11" },
  { label: "12 points", key: "12" },
  { label: "13 points", key: "13" },
  { label: "14 points", key: "14" },
  { label: "15 points", key: "15" },
  { label: "16 points", key: "16" },
  { label: "17 points", key: "17" },
  { label: "18 points", key: "18" },
  { label: "19 points", key: "19" },
  { label: "20 points", key: "20" },
];

const questionTypes = [
  { label: "Multiple Choice", icon: <FaCheck />, color: "#8854c0" },
  {
    label: "Fill in the Blank",
    icon: <LuRectangleHorizontal />,
    color: "#8854c0",
  },
  { label: "Open Ended", icon: <LuFileType2 />, color: "#2d70ae" },
  { label: "Poll", icon: <FaChartBar />, color: "#2d70ae" },
  { label: "Match", icon: <FaLayerGroup />, color: "#00a06a" },
  { label: "Drag and Drop", icon: <FaHand />, color: "#00a06a" },
  { label: "Drop Down", icon: <IoMdArrowDropdown />, color: "#e57c1a" },
  { label: "Categorize", icon: <BiCategory />, color: "#e57c1a" },
  { label: "Labeling", icon: <MdLabel />, color: "red" },
  { label: "Math Response", icon: <BiMath />, color: "red" },
];

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [openSetting, setOpenSetting] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const { quizId } = useParams();

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => findQuizById(quizId as string),
  });

  const { data: questions } = useQuery({
    queryKey: ["questions", quizId],
    queryFn: () => getAllQuestions(quizId as string),
  });

  const handleMenuClick = (e: { key: string }) => {
    toast.success(`Time updated to ${e.key} successfully`, {
      position: "bottom-left",
    });
  };

  const saveQuiz = () => {
    if (!quiz.data.subject || !quiz.data.grade) {
      setOpenSetting(true);
      return;
    }
    toast.success(`Quiz saved successfully`);
  };

  const openModal = (label: string) => {
    switch (label) {
      case "Multiple Choice":
        setMultipleChoice(true);
        break;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white border-b border-gray-300 py-3 px-4 flex flex-row">
        <div className="flex flex-row gap-4 items-center">
          <div
            onClick={() => navigate(-1)}
            className="rounded-sm bg-gray-200 w-fit p-2 cursor-pointer"
            title="Back"
          >
            <FaArrowLeft />
          </div>
          {isLoading ? (
            <Skeleton.Button active style={{ width: 120 }} />
          ) : (
            <p className="font-medium max-md:hidden">{quiz?.data?.title}</p>
          )}
        </div>
        <div className="ml-auto flex flex-row gap-4">
          <div
            onClick={() => setOpenSetting(true)}
            className="flex flex-row items-center gap-2 py-1 px-4 border border-gray-400 rounded-md cursor-pointer hover:bg-gray-100"
          >
            <IoMdSettings />
            <p>Settings</p>
          </div>
          <QuizSetting
            openSetting={openSetting}
            setOpenSetting={setOpenSetting}
            quiz={quiz?.data}
          />
          <div className="flex flex-row max-md:hidden items-center gap-2 py-1 px-4 border border-gray-400 rounded-md cursor-pointer hover:bg-gray-100">
            <MdPlayArrow />
            <p>Preview</p>
          </div>
          <Button onClick={saveQuiz} type="primary">
            Save quiz
          </Button>
        </div>
      </div>
      <div className="p-6 flex flex-row gap-6 max-md:flex-col items-start">
        <div className="flex flex-col w-1/4 max-md:w-full gap-4 sticky top-4">
          <div className="rounded-lg bg-white flex flex-col border border-gray-300">
            <p className="text-xl font-medium m-4">Bulk update questions</p>
            <Dropdown
              menu={{ items: itemsTime, onClick: handleMenuClick }}
              trigger={["click"]}
              dropdownRender={(menu) => (
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {menu}
                </div>
              )}
            >
              <div className="flex flex-row items-center gap-2 hover:bg-gray-100 p-3 border-b border-gray-300">
                <FaRegClock />
                <p>Time</p>
                <IoIosArrowDown className="ml-auto" />
              </div>
            </Dropdown>
            <Dropdown
              menu={{ items: itemsPoint }}
              trigger={["click"]}
              dropdownRender={(menu) => (
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {menu}
                </div>
              )}
            >
              <div className="flex flex-row items-center gap-2 hover:bg-gray-100 p-3">
                <FaCheck />
                <p>Points</p>
                <IoIosArrowDown className="ml-auto" />
              </div>
            </Dropdown>
          </div>
          <div className="rounded-lg bg-white border border-gray-300 grid grid-cols-2 gap-2 text-sm p-1">
            {questionTypes.map((type) => (
              <div
                key={type.label}
                onClick={() => openModal(type.label)}
                className={`flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md`}
              >
                <div
                  className="p-2 rounded-md"
                  style={{
                    backgroundColor: type.color,
                    color: "white",
                  }}
                >
                  {type.icon}
                </div>
                <p>{type.label}</p>
              </div>
            ))}
          </div>
          <MultipleChoice open={multipleChoice} setOpen={setMultipleChoice} />
        </div>
        <div className="w-3/4 max-md:w-full flex flex-col gap-4">
          {isLoading ? (
            <Skeleton.Button active style={{ width: 160 }} />
          ) : (
            <div className="flex flex-row gap-2 items-center">
              <p className="font-semibold text-xl">
                {quiz?.data?.questions.length} question
              </p>
              <p className="text-xl text-gray-500">{`(${quiz?.data?.point} point)`}</p>
            </div>
          )}
          {questions?.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg bg-white text-center">
              <p className="text-xl font-semibold text-gray-500">
                You haven't created any questions!
              </p>
              <p className="text-gray-400">
                Please create new questions to submit quiz.
              </p>
            </div>
          ) : (
            questions?.data.map((question: QuestionResponse) => (
              <Question key={question.id} question={question} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
