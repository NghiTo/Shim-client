import { FaArrowLeft } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const Search = () => {
  const { query } = useParams();
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-row items-start">
        <Link
          to={"/teacher"}
          className="flex flex-row gap-2 items-center hover:text-[#fe5f5c]"
        >
          <FaArrowLeft />
          <h1 className="text-lg font-medium">Back</h1>
        </Link>
        <form className="w-2/5 ml-auto rounded-full px-4 py-2 text-xl border border-gray-400 bg-white flex flex-row items-center gap-4">
          <IoSearch />
          <input
            defaultValue={query}
            type="text"
            className="outline-none w-full"
            placeholder="Search for any topic"
          />
          <MdArrowForwardIos className="ml-auto cursor-pointer" />
        </form>
      </div>
    </div>
  );
};

export default Search;
