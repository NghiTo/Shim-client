import { useState } from "react";
import { BiCategory, BiMath } from "react-icons/bi";
import { FaChartBar, FaCheck, FaHand, FaLayerGroup } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuFileType2, LuRectangleHorizontal } from "react-icons/lu";
import { MdLabel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setType } from "../../store/quizSlice";

const descriptions = {
  "Multiple Choice":
    "Check for retention by asking students to pick one or more correct answers. Use text, images, or math equations to spice things up!",
  "Fill in the Blank":
    "Prompt your students for text and check if they remember the correct spelling of accommodate.",
  "Open Ended":
    "Get opinions or provide an essay prompt and grade it later! A longer answer type, students can enter up to 1000 characters.",
  Poll: "Understand whether the majority of the class understood the topic or find out what they want their next field trip to be.",
  Match:
    "Revamp the good ol’ classic & ask students to match anything—from capital cities with states to fractions with their percentages!",
  "Drag and Drop":
    "Challenge students to think more critically by using visually interactive drag and drop questions.",
  "Drop Down":
    "Upgrade your fill in the blanks to easy drop down questions so students can select from a list of options.",
  Categorize:
    "Assess students' ability to categorize concepts or items into the appropriate groups. It is an effective way to test students' knowledge of categorization and their ability to organize information into meaningful groups.",
  Labeling:
    "Engage students with media-rich questions where they can drag and drop text labels onto specific parts of an image.",
  "Math Response":
    "Students can respond to questions with numbers, operators, fractions, exponents, and more!",
} as const;

type QuestionType = keyof typeof descriptions;

const questionTypes = [
  { label: "Multiple Choice", icon: <FaCheck />, color: "#8854c0" },
  {
    label: "Fill in the Blank",
    icon: <LuRectangleHorizontal />,
    color: "#8854c0",
  },
  { label: "Open Ended", icon: <LuFileType2 />, color: "#2d70ae" },
  { label: "Poll", icon: <FaChartBar />, color: "#2d70ae" },
  { label: "Match", icon: <FaLayerGroup />, color: "#00a06a" },
  { label: "Drag and Drop", icon: <FaHand />, color: "#00a06a" },
  { label: "Drop Down", icon: <IoMdArrowDropdown />, color: "#e57c1a" },
  { label: "Categorize", icon: <BiCategory />, color: "#e57c1a" },
  { label: "Labeling", icon: <MdLabel />, color: "red" },
  { label: "Math Response", icon: <BiMath />, color: "red" },
];

const Scratch = () => {
  const [selectedType, setSelectedType] = useState<QuestionType | "">("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProceed = () => {
    if (selectedType === "Multiple Choice") {
      dispatch(setType("multipleChoice"));
      navigate("/create-quiz/multiple-choice");
    }
  };

  return (
    <div className="h-full p-6">
      <div className="bg-white border border-gray-400 rounded-md p-6 flex flex-col gap-6">
        <div className="flex flex-row max-md:flex-col max-md:gap-4 items-start w-full">
          <div className="flex flex-row gap-2">
            <img
              src="/src/assets/create_from_scratch.png"
              alt="Pencil"
              className="object-cover w-12 max-md:w-6 h-auto"
            />
            <h1 className="text-4xl max-md:text-2xl font-normal">
              Create from scratch
            </h1>
          </div>
          <div className="ml-auto w-2/5 max-md:w-full">
            <label className="font-medium">
              Search questions from Shim made by other teachers
            </label>
            <div className="border border-gray-400 flex flex-row items-center rounded-md px-2 gap-2">
              <FiSearch className="ml-2" />
              <input
                type="text"
                placeholder="Search from millions of free Shim quizzes"
                className="p-2 w-full outline-none max-md:text-sm"
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
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            {questionTypes.map((type) => (
              <div
                key={type.label}
                onClick={() => setSelectedType(type.label as QuestionType)}
                className={`flex flex-row items-center h-fit gap-2 ${
                  selectedType === type.label ? "bg-gray-200" : ""
                } hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md`}
              >
                <div
                  className="p-2 rounded-md"
                  style={{
                    backgroundColor: type.color,
                    color: "white",
                  }}
                >
                  {type.icon}
                </div>
                <p>{type.label}</p>
                {selectedType === type.label && (
                  <FaCheck className="text-green-500 ml-auto" />
                )}
              </div>
            ))}
          </div>
          <div className="bg-gray-200 rounded-lg h-full w-full ml-auto p-6 flex flex-col gap-4">
            <h1 className="font-semibold text-2xl">
              {selectedType || "Select a question type"}
            </h1>
            <p className="text-gray-600">
              {selectedType
                ? descriptions[selectedType]
                : "Please select a question type to view its description."}
            </p>
            <button
              className={`w-1/4 py-1 rounded-md ml-auto mt-auto ${
                selectedType
                  ? "bg-[#fe5f5c] text-white hover:bg-[#fc8785]"
                  : "bg-gray-300 cursor-not-allowed text-gray-400"
              }`}
              disabled={!selectedType}
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scratch;
