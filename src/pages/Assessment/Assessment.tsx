import { FaArrowLeft } from "react-icons/fa6";
import Scratch from "../../components/Assessment/Scratch";
import Activities from "../../components/Assessment/Activities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";

const Assessment = () => {
  const [showScratch, setShowScratch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBack = () => {
    if (showScratch) {
      setShowScratch(false);
      return;
    }
    localStorage.setItem("selectedKeys", JSON.stringify(["1"]));
    dispatch(closeModal());
    navigate("/teacher");
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <div className="bg-white border-b border-gray-400">
        <div
          onClick={handleBack}
          className="p-4 flex flex-row items-center gap-4 font-medium text-xl text-gray-500 hover:text-[#fe5f5c] cursor-pointer transition-all ease-in-out h-1/6 w-fit"
        >
          <FaArrowLeft />
          <h1>Create a new activity</h1>
        </div>
      </div>
      <div className="relative w-full h-full">
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
            showScratch ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <Activities onCreateFromScratch={() => setShowScratch(true)} />
        </div>
        <div
          className={`absolute top-0 left-full w-full h-full transition-transform duration-500 ${
            showScratch ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <Scratch />
        </div>
      </div>
    </div>
  );
};

export default Assessment;
