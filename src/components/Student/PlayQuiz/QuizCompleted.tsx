import { useNavigate, useParams } from "react-router-dom";

const QuizCompleted = () => {
  const { quizCode } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center bg-gray-50 text-center transition-opacity duration-1000 animate-fade-in">
      <h1 className="text-5xl font-extrabold text-[#000a38]">
        🎉 Quiz Completed! 🎉
      </h1>
      <p className="text-lg text-gray-600">Thank you for participating!</p>

      <div className="bg-white rounded-xl p-6 shadow-lg w-[80%] md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-[#000a38]">
          Quiz Summary
        </h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <p className="font-medium text-gray-700">🏆 Score:</p>
          <p className="font-bold">1</p>

          <p className="font-medium text-gray-700">✅ Correct Answers:</p>
          <p className="font-bold">1</p>

          <p className="font-medium text-gray-700">❌ Incorrect Answers:</p>
          <p className="font-bold">1</p>

          <p className="font-medium text-gray-700">📊 Accuracy:</p>
          <p className="font-bold">100%</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={() => navigate(`/student/join/quiz/${quizCode}`)}
          className="bg-[#fe5f5c] hover:bg-[#e14c4a] text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all"
        >
          Play Again
        </button>
        <button
          onClick={() => navigate("/student")}
          className="bg-[#4caf50] hover:bg-[#388e3c] text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all"
        >
          Find a New Quiz
        </button>
        <button className="bg-[#3f51b5] hover:bg-[#303f9f] text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all">
          Review Answers
        </button>
      </div>
    </div>
  );
};

export default QuizCompleted;
