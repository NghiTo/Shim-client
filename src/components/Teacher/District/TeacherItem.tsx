import React from "react";
import defaultAva from "/src/assets/default-ava.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface TeacherItemProps {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  subject: string;
}

const TeacherItem: React.FC<TeacherItemProps> = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  subject
}) => {
  console.log(id);
  
  return (
    <Link to={`/teacher/profile/${id}`} className="border border-gray-300 rounded-lg p-3 flex flex-row gap-4 cursor-pointer hover:bg-[#f5f3f3] transition-all ease-in-out">
      <img
        src={avatarUrl || defaultAva}
        alt="Avatar"
        className="w-10 aspect-square rounded-full object-cover"
      />
      <div className="w-full">
        <div className="flex flex-row items-center w-full">
          <p className="font-medium">
            {firstName} {lastName}
          </p>
          <FaArrowRight className="ml-auto text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">40 activities - {subject}</p>
      </div>
    </Link>
  );
};

export default TeacherItem;
