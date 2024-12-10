import { FaHistory } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoMenu, IoSearch } from "react-icons/io5";
import { PiCardsBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

const StudentHeader = () => {
  return (
    <div className="flex flex-row items-center gap-8 w-full px-4 shadow-md">
      <div className="w-1/12 h-full max-md:w-1/2 flex items-center my-4">
        <img
          src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
          alt="Logo"
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="border w-1/4 border-gray-400 rounded-full py-2 px-4 flex flex-row items-center my-4">
        <input
          type="text"
          className="outline-none w-full"
          placeholder="Find quiz..."
        />
        <IoSearch className="ml-auto" />
      </div>
      <div className="flex flex-row gap-12">
        <div className="flex flex-row items-center gap-1 py-6 text-lg">
          <FaHouse />
          <p>Home</p>
        </div>
        <div className="flex flex-row items-center gap-1 py-6 text-lg">
          <FaHistory />
          <p>Activities</p>
        </div>
        <div className="flex flex-row items-center gap-1 py-6 text-lg">
          <SiGoogleclassroom />
          <p>Classrooms</p>
        </div>
        <div className="flex flex-row items-center gap-1 py-6 text-lg">
          <PiCardsBold />
          <p>Flashcards</p>
        </div>
      </div>
      <div className="bg-gray-100 p-2 rounded-full text-lg ml-auto">
        <IoMenu />
      </div>
    </div>
  );
};

export default StudentHeader;
