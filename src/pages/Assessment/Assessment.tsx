import { FaArrowLeft } from "react-icons/fa6";
import Activities from "../../components/Assessment/Activities";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";

const Assessment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBack = () => {
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
      <div className="w-full h-full">
        <Activities />
      </div>
    </div>
  );
};

export default Assessment;
