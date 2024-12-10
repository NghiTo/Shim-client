import { Tabs, TabsProps } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import AllResults from "../../components/Teacher/Search/AllResults";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "All",
    children: <AllResults />,
  },
  {
    key: "2",
    label: "Assessments",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Lessons",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Interactive videos",
    children: "Content of Tab Pane 4",
  },
  {
    key: "5",
    label: "Passages",
    children: "Content of Tab Pane 5",
  },
  {
    key: "6",
    label: "Flashcards",
    children: "Content of Tab Pane 6",
  },
];

const Search = () => {
  const { query } = useParams();
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-8">
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
      <div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="custom-tabs rounded-xl w-full"
          tabBarGutter={2}
        ></Tabs>
      </div>
    </div>
  );
};

export default Search;
