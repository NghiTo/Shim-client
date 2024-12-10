import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllQuizzes } from "../../../apis/quiz.api";
import { QuizResponse } from "../../../types/quiz.type";
import { addSuffix } from "../../../utils/formatText";

const AllResults = () => {
  const { query } = useParams();
  const { data } = useQuery({
    queryKey: "searchResults",
    queryFn: () => getAllQuizzes({ title: query, status: "finished" }),
  });

  return (
    <div>
      <div className="w-2/5 flex flex-col gap-4">
        {data?.map((quiz: QuizResponse) => {
          return (
            <div
              key={quiz.id}
              className="border border-gray-400 rounded-md p-3 flex flex-row items-center"
            >
              <div className="flex flex-col">
                <h2 className="text-sm font-medium text-[#fe5f5c]">
                  {quiz.title}
                </h2>
                <p>
                  <b>Grade:</b> {quiz.grade}
                </p>
                <p>
                  <b>Subject:</b> {quiz.subject}
                </p>
                <p>{addSuffix(quiz.questions.length, "question")}</p>
              </div>
              <img
                src={quiz.coverImg as string}
                alt="cover image"
                className="object-cover ml-auto border border-gray-400 w-1/6 h-auto aspect-square rounded-md"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllResults;
