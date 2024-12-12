import { Popover } from "antd";
import { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoMenu, IoSearch } from "react-icons/io5";
import { PiCardsBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
import { LuSettings } from "react-icons/lu";

const StudentHeader = () => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const closePopover = () => {
    setPopoverVisible(false);
  };

  return (
    <div className="flex flex-row items-center gap-8 w-full px-4 border-b border-gray-400">
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
        <Link
          to={"/student"}
          className={`flex flex-row items-center gap-1 py-6 text-lg ${
            activeTab === "home" ? "text-red-500" : "text-black"
          }`}
          onClick={() => setActiveTab("home")}
        >
          <FaHouse />
          <p>Home</p>
        </Link>
        <div
          className={`flex flex-row items-center gap-1 py-6 text-lg ${
            activeTab === "activities" ? "text-red-500" : "text-black"
          }`}
          onClick={() => setActiveTab("activities")}
        >
          <FaHistory />
          <p>Activities</p>
        </div>
        <div
          className={`flex flex-row items-center gap-1 py-6 text-lg ${
            activeTab === "classrooms" ? "text-red-500" : "text-black"
          }`}
          onClick={() => setActiveTab("classrooms")}
        >
          <SiGoogleclassroom />
          <p>Classrooms</p>
        </div>
        <div
          className={`flex flex-row items-center gap-1 py-6 text-lg ${
            activeTab === "flashcards" ? "text-red-500" : "text-black"
          }`}
          onClick={() => setActiveTab("flashcards")}
        >
          <PiCardsBold />
          <p>Flashcards</p>
        </div>
      </div>
      <Popover
        placement="bottomRight"
        title={"Shim"}
        trigger="click"
        open={popoverVisible}
        onOpenChange={setPopoverVisible}
        content={
          <div className="flex flex-col gap-2">
            <Link
              to={"/student/settings"}
              className="flex flex-row items-center gap-2 hover:text-[#fe5f5c]"
              onClick={() => {
                setActiveTab("");
                closePopover();
              }}
            >
              <LuSettings />
              <p>Settings</p>
            </Link>
          </div>
        }
      >
        <div
          onClick={() => setPopoverVisible(!popoverVisible)}
          className="bg-gray-100 p-2 rounded-full text-xl ml-auto cursor-pointer"
        >
          <IoMenu />
        </div>
      </Popover>
    </div>
  );
};

export default StudentHeader;
