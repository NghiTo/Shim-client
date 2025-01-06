import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const MainTeacher = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/teacher/search/${query}`);
  };
  return (
    <div className="overflow-y-auto">
      <div className="bg-gray-100 h-full py-6">
        <div className="py-6 flex flex-col gap-6 items-center">
          <h1 className="text-3xl font-medium">
            What are you teaching today ?
          </h1>
          <form
            onSubmit={onSearch}
            className="w-3/5 rounded-full p-4 text-2xl border border-gray-400 bg-white flex flex-row items-center gap-4"
          >
            <IoSearch />
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="outline-none w-full"
              placeholder="Search for any topic"
            />
            <MdArrowForwardIos className="ml-auto cursor-pointer" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainTeacher;
