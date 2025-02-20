import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteQuiz, getAllQuizzes } from "../../../apis/quiz.api";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import { Dropdown, MenuProps, Skeleton } from "antd";
import { QuizResponse } from "../../../types/quiz.type";
import { MdClass, MdSubject } from "react-icons/md";
import { FaHeart, FaQuestion, FaTrash } from "react-icons/fa6";
import { timeAgo } from "../../../utils/formatTime";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Like",
    icon: <FaHeart />,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Save",
    icon: <FaSave />,
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: "Delete",
    icon: <FaTrash />,
  },
];

const Draft = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);

  const { data: quizzes, isLoading } = useQuery({
    queryKey: "draft",
    queryFn: () => getAllQuizzes({ status: "unFinished", userId: user.id }),
  });

  const { mutate } = useMutation(deleteQuiz, {
    onSuccess: () => {
      queryClient.invalidateQueries("draft");
      toast.success("Quiz deleted successfully");
    },
  });
  return (
    <div className="flex flex-col gap-4">
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
            Pull in questions from the Shim library or make your own. It’s quick
            and easy!
          </p>
          <button
            onClick={() => navigate("/teacher/create-assessment")}
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
              className=" p-3 border border-gray-400 w-full rounded-md flex flex-row h-full gap-3 bg-white"
            >
              <img
                src={quiz.coverImg || defaultImg}
                alt="Quiz Ava"
                className="bg-gray-300 w-1/6 object-cover aspect-square h-auto rounded-md"
              />
              <div className="flex flex-col gap-1 justify-between">
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
                  <p>Last edited: {timeAgo(quiz.updatedAt as string)}</p>
                </div>
              </div>
              <div className="flex flex-col ml-auto">
                <Dropdown
                  menu={{
                    items,
                    onClick: (e: { key: string }) => {
                      switch (e.key) {
                        case "1":
                          toast.success("Liked!");
                          break;
                        case "2":
                          toast.success("Saved!");
                          break;
                        case "3":
                          mutate(quiz.id);
                          break;
                      }
                    },
                  }}
                  trigger={["click"]}
                >
                  <div className="ml-auto hover:bg-gray-200 px-1 py-2 rounded-lg cursor-pointer">
                    <SlOptionsVertical />
                  </div>
                </Dropdown>
                <button
                  onClick={() => navigate(`/teacher/create-quiz/${quiz.id}`)}
                  className="bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md font-medium mt-auto"
                >
                  Continue editing
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Draft;
