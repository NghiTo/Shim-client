import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Scratch from "./Scratch";

const Assessment = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-400">
        <Link
          to={"/teacher"}
          className="p-4 flex flex-row items-center gap-4 font-medium text-xl text-gray-500 hover:text-[#fe5f5c] cursor-pointer transition-all ease-in-out h-1/6 w-fit"
        >
          <FaArrowLeft />
          <h1>Create a new activity</h1>
        </Link>
      </div>
      <Scratch />
    </div>
  );
};

export default Assessment;
