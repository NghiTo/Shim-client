import { Table, TableColumnsType } from "antd";
import { getAllQuizzes } from "../../../apis/quiz.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useQuery } from "react-query";
import { QuizResponse } from "../../../types/quiz.type";

const columns: TableColumnsType = [
  {
    title: "Quiz Name",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Created at",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Total Participants",
    dataIndex: "participants",
    key: "participants",
  },
  {
    title: "Accuracy",
    dataIndex: "accuracy",
    key: "accuracy",
  },
  {
    title: "Code",
    dataIndex: "quizCode",
    key: "quizCode",
  },
  {
    title: "Grade",
    dataIndex: "grade",
    key: "grade",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <button
        onClick={() => handleViewDetails(record.id)}
        className="text-blue-500"
      >
        View Details
      </button>
    ),
  },
];

const handleViewDetails = (id: string) => {
  console.log(`View details for quiz ID: ${id}`);
};

const Report = () => {
  const user = useSelector((state: RootState) => state.user);
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ["published", user.id],
    queryFn: () => getAllQuizzes({ status: "finished", userId: user.id }),
  });

  const tableData =
    quizzes?.map((quiz: QuizResponse) => ({
      key: quiz.id,
      title: quiz.title,
      date: new Date(quiz.updatedAt as string).toLocaleDateString(),
      participants: quiz.questions?.length || 0,
      accuracy: `${Math.floor(Math.random() * 100)}%`,
      quizCode: quiz.quizCode,
      grade: quiz.grade,
    })) || [];

  return (
    <div className="bg-gray-100 px-8 py-16 flex flex-col gap-4 h-full">
      <div>
        <p>Filter by:</p>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
      />
    </div>
  );
};

export default Report;
