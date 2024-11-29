import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createBlankQuiz } from "../../apis/quiz.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Activities = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { mutate } = useMutation((userId: string) => createBlankQuiz(userId), {
    onSuccess: (quiz) => {
      navigate(`/create-quiz/${quiz.data.id}`);
    },
  });
  return (
    <div className="h-5/6 m-auto w-full flex flex-col gap-4 py-24 px-32 max-md:px-8 max-md:py-12">
      <h1 className="text-2xl font-semibold text-center">
        Create a new activity
      </h1>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        <div className="rounded-lg border border-gray-400 hover:border-[#fe5f5c] hover:border-2 cursor-pointer">
          <img
            src="/src/assets/Source abstractions-min.png"
            alt=""
            className="h-3/5 w-full object-cover rounded-t-lg"
          />
          <div className="py-8 text-center bg-white rounded-b-lg max-md:border-b max-md:border-gray-400">
            <p className="font-semibold text-xl">Import worksheets/questions</p>
            <p className="text-gray-500">
              from documents, google form, spreadsheet
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-gray-400 hover:border-[#fe5f5c] hover:border-2 cursor-pointer">
          <img
            src="/src/assets/Source abstractions-1-min.png"
            alt=""
            className="h-3/5 w-full object-cover rounded-t-lg"
          />
          <div className="py-8 text-center bg-white rounded-b-lg max-md:border-b max-md:border-gray-400">
            <p className="font-semibold text-xl">Generate with AI</p>
            <p className="text-gray-500">from documents, websites, text</p>
          </div>
        </div>
        <div
          onClick={() => {
            mutate(user.id);
          }}
          className="rounded-lg border border-gray-400 hover:border-[#fe5f5c] hover:border-2 cursor-pointer"
        >
          <img
            src="/src/assets/z6051412207278_4d7ff135cd73b73cdae72a8101f0326a.jpg"
            alt=""
            className="h-3/5 w-full object-cover rounded-t-lg border-b border-gray-300"
          />
          <div className="py-8 text-center bg-white rounded-b-lg max-md:border-b max-md:border-gray-400">
            <p className="font-semibold text-xl">Create from scratch</p>
            <p className="text-gray-500">from search, question types</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
