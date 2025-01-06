import { Input } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { getAllQuizzes } from "../../apis/quiz.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MainStudent = () => {
  const [quizCode, setQuizCode] = useState("");
  const navigate = useNavigate();
  const { mutate } = useMutation(() => getAllQuizzes({ quizCode }), {
    onSuccess: (res) => {
      if (res.length < 1) {
        toast.error("Quiz is not found");
      } else {
        navigate(`/student/join/quiz/${res[0].quizCode}`);
      }
    },
  });

  return (
    <div className="bg-gray-100 h-full py-8 px-4">
      <div className="flex flex-row w-full gap-4">
        <div className="p-16 rounded-lg flex flex-row justify-center gap-2 w-3/5 bg-white shadow-md">
          <Input
            type="number"
            value={quizCode}
            placeholder="Enter quiz code..."
            className="w-3/5 outline-none border border-gray-300 rounded-md p-2 text-xl"
            maxLength={8}
            onChange={(e) => setQuizCode(e.target.value)}
          />
          <button
            onClick={() => mutate()}
            className="w-1/5 bg-[#fe5f5c] text-xl rounded-md text-white hover:bg-[#fc8785] transition-all ease-in-out"
          >
            Join
          </button>
        </div>
        <div className="w-2/5 text-3xl text-center flex flex-col gap-2 justify-center">
          <p>Hi there!</p>
          <p>Welcome to Shim</p>
        </div>
      </div>
    </div>
  );
};

export default MainStudent;
