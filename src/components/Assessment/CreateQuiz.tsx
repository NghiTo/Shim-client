import { Button, Select } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { resetQuiz, setPoint, setTime, setType } from "../../store/quizSlice";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz);

  const handleSave = () => {
    if (!quiz.question.trim()) {
      toast.error("Question cannot be empty!", { position: "bottom-left" });
      return;
    }
    if (!quiz.answers.length || quiz.answers.length < 2) {
      toast.error("Please add at least one answer!", {
        position: "bottom-left",
      });
      return;
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white border-b border-gray-400 py-3 px-4 flex flex-row">
        <div className="flex flex-row gap-4">
          <div
            onClick={() => {
              dispatch(resetQuiz());
              navigate(-1);
            }}
            className="rounded-sm bg-gray-200 w-fit p-2 cursor-pointer"
            title="Back"
          >
            <FaArrowLeft />
          </div>
          <Select
            defaultValue="multipleChoice"
            title="Type"
            style={{ width: 140 }}
            onChange={(value) => dispatch(setType(value))}
            options={[
              { value: "multipleChoice", label: "Multiple choice" },
              { value: "2", label: "2 points" },
              { value: "3", label: "3 points" },
              { value: "4", label: "4 points" },
            ]}
          ></Select>
        </div>
        <div className="ml-auto flex flex-row gap-2">
          <Select
            defaultValue="1"
            title="Point"
            style={{ width: 100 }}
            onChange={(value) => dispatch(setPoint(Number(value)))}
            options={[
              { value: "1", label: "1 point" },
              { value: "2", label: "2 points" },
              { value: "3", label: "3 points" },
              { value: "4", label: "4 points" },
            ]}
          ></Select>
          <Select
            defaultValue="10"
            title="Time"
            onChange={(value) => dispatch(setTime(Number(value)))}
            style={{ width: 70 }}
            options={[
              { value: "10", label: "10s" },
              { value: "20", label: "20s" },
              { value: "30", label: "30s" },
              { value: "60", label: "1m" },
            ]}
          ></Select>
          <Button onClick={handleSave} type="primary">
            Save question
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default CreateQuiz;
