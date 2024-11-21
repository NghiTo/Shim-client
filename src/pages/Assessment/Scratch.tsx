import { Button } from "antd";
import { BiCategory, BiMath } from "react-icons/bi";
import { FaChartBar, FaCheck, FaHand, FaLayerGroup } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuFileType2, LuRectangleHorizontal } from "react-icons/lu";
import { MdLabel } from "react-icons/md";

const Scratch = () => {
  return (
    <div className="h-full p-6">
      <div className="bg-white border border-gray-400 rounded-md p-6 flex flex-col gap-6">
        <div className="flex flex-row items-start w-full">
          <img
            src="/src/assets/create_from_scratch.png"
            alt="Pencil"
            className="object-cover w-12 h-auto"
          />
          <h1 className="text-4xl font-normal">Create from scratch</h1>
          <div className="ml-auto w-2/5">
            <label className="font-medium">
              Search questions from Shim made by other teachers
            </label>
            <div className="border border-gray-400 flex flex-row items-center rounded-md px-2 gap-2">
              <FiSearch className="ml-2" />
              <input
                type="text"
                placeholder="Search from millions of free Shim quizzes"
                className="p-2 w-full outline-none"
              />
              <button className="bg-gray-200 px-2 rounded-md font-semibold text-sm py-1">
                Search
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-medium">
          Select a question type to add question
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#8854c0] rounded-md">
                <FaCheck className="text-white" />
              </div>
              <p>Multiple Choice</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#8854c0] rounded-md">
                <LuRectangleHorizontal className="text-white" />
              </div>
              <p>Fill in the blank</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#2d70ae] rounded-md">
                <LuFileType2 className="text-white" />
              </div>
              <p>Open Ended</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#2d70ae] rounded-md">
                <FaChartBar className="text-white" />
              </div>
              <p>Poll</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#00a06a] rounded-md">
                <FaLayerGroup className="text-white" />
              </div>
              <p>Match</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#00a06a] rounded-md">
                <FaHand className="text-white" />
              </div>
              <p>Drag and drop</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#e57c1a] rounded-md">
                <IoMdArrowDropdown className="text-white" />
              </div>
              <p>Drop down</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-[#e57c1a] rounded-md">
                <BiCategory className="text-white" />
              </div>
              <p>Categorize</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-red-500 rounded-md">
                <MdLabel className="text-white" />
              </div>
              <p>Labeling</p>
            </div>
            <div className="flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md">
              <div className="p-2 bg-red-500 rounded-md">
                <BiMath className="text-white" />
              </div>
              <p>Math Response</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg h-full w-full ml-auto p-6 flex flex-col gap-4">
            <h1 className="font-semibold text-2xl">Multiple Choice</h1>
            <p className="text-gray-600">
              Check for retention by asking students to pick one or more correct
              answers. Use text, images, or math equations to spice things up!
            </p>
            <Button type="primary" className="w-1/4 ml-auto mt-auto">
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scratch;
