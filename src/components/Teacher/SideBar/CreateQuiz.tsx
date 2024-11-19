import { Modal } from "antd";
import React from "react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

interface CreateQuizProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateQuiz: React.FC<CreateQuizProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      title={<p className="text-4xl">What would you like to create?</p>}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={1200}
      className="top-14"
    >
      <div className="mt-8 grid grid-cols-3 gap-2">
        <Link to={"/teacher/create-assessment"} className="flex flex-col gap-14 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/quiz_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Assessment</h1>
          </div>
          <p>
            Review and practice quizzes to reflect on student understanding of
            concepts
          </p>
        </Link>
        <div className="flex flex-col gap-14 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/presentation_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Lesson</h1>
          </div>
          <p>
            Teach new topics or skills to the whole class with interactive
            slides
          </p>
        </div>
        <div className="flex flex-col gap-8 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/video-quiz_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <div>
              <h1 className="text-2xl font-semibold">Interactive video</h1>
              <div className="flex flex-row items-center gap-1 text-gray-400">
                <FiInfo />
                <p>Free up to 10 videos</p>
              </div>
            </div>
          </div>
          <p>Make asynchronous assignments into active learning experiences.</p>
        </div>
        <div className="flex flex-col gap-8 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/reading-quiz_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <div>
              <h1 className="text-2xl font-semibold">Comprehesion</h1>
              <div className="flex flex-row items-center gap-1 text-gray-400">
                <FiInfo />
                <p>Free up to 10 comprehesions</p>
              </div>
            </div>
          </div>
          <p>
            Help students analyse text or media and improve comprehension skill
          </p>
        </div>
        <div className="flex flex-col gap-14 border border-gray-400 rounded-md p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/src/assets/flashcard_solid_circle.png"
              alt="Quiz"
              className="object-cover w-8"
            />
            <h1 className="text-2xl font-semibold">Flashcard</h1>
          </div>
          <p>
            Boost memory retention, ideal for in-class learning and practice
            with repetitions.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CreateQuiz;
