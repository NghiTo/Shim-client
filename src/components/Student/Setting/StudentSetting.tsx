import { FaUserEdit } from "react-icons/fa";
import { useQuery } from "react-query";
import { findUserById } from "../../../apis/user.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IoIosArrowForward } from "react-icons/io";
import { UserResponse } from "../../../types/user.type";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import FirstNameModal from "./FirstNameModal";
import LastNameModal from "./LastNameModal";
import GradeModal from "./GradeModal";
import { clearUser } from "../../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import PasswordModal from "./PasswordModal";
import { sendOtp } from "../../../apis/auth.api";
import { Popconfirm, PopconfirmProps } from "antd";

const StudentSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstNameModal, setFirstNameModal] = useState(false);
  const [lastNameModal, setLastNameModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [gradeModal, setGradeModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
  };
  const confirm: PopconfirmProps["onConfirm"] = () => {
    sendOtp();
    navigate("/delete-account");
    toast.info("An OTP has been sent to your email");
  };
  const { data } = useQuery<UserResponse>({
    queryKey: ["studentProfile", user.id],
    queryFn: () => findUserById(user.id),
  });

  return (
    <div className="bg-gray-100 pt-4 pb-8 flex flex-col gap-4">
      <h1 className="text-3xl text-center">Settings</h1>
      <div className="bg-white rounded-lg w-1/3 mx-auto p-4 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <FaUserEdit className="text-[#efa929]" />
          <p className="text-[#9d9da4]">Profile</p>
        </div>
        <div
          onClick={() => setFirstNameModal(true)}
          className="flex flex-row items-center cursor-pointer group"
        >
          <div>
            <p className="font-semibold">First name</p>
            <p className="text-[#9d9da4] text-sm">{data?.firstName}</p>
          </div>
          <IoIosArrowForward className="ml-auto group-hover:text-[#fe5f5c]" />
        </div>
        <FirstNameModal
          open={firstNameModal}
          setOpen={setFirstNameModal}
          firstName={data?.firstName as string}
        />
        <div
          onClick={() => setLastNameModal(true)}
          className="flex flex-row items-center cursor-pointer group"
        >
          <div>
            <p className="font-semibold">Last name</p>
            <p className="text-[#9d9da4] text-sm">{data?.lastName}</p>
          </div>
          <IoIosArrowForward className="ml-auto group-hover:text-[#fe5f5c]" />
        </div>
        <LastNameModal
          open={lastNameModal}
          setOpen={setLastNameModal}
          lastName={data?.lastName as string}
        />
        <div
          onClick={() => setGradeModal(true)}
          className="flex flex-row items-center cursor-pointer group"
        >
          <div>
            <p className="font-semibold">Grade</p>
            <p className="text-[#9d9da4] text-sm">{data?.grade}</p>
          </div>
          <IoIosArrowForward className="ml-auto group-hover:text-[#fe5f5c]" />
        </div>
        <GradeModal
          open={gradeModal}
          setOpen={setGradeModal}
          grade={data?.grade}
        />
        <div className="flex flex-row items-center cursor-pointer group">
          <div>
            <p className="font-semibold">Language</p>
            <p className="text-[#9d9da4] text-sm">English</p>
          </div>
          <IoIosArrowForward className="ml-auto group-hover:text-[#fe5f5c]" />
        </div>
      </div>
      <div className="bg-white rounded-lg w-1/3 mx-auto p-4 flex flex-col gap-8">
        <div className="flex flex-row items-center gap-2">
          <FaCircleUser className="text-[#d5546d]" />
          <p className="text-[#9d9da4]">Account</p>
        </div>
        <div
          onClick={() => setPasswordModal(true)}
          className="flex flex-row items-center cursor-pointer group"
        >
          <p className="font-semibold">Update password</p>
          <IoIosArrowForward className="ml-auto group-hover:text-[#fe5f5c]" />
        </div>
        <PasswordModal open={passwordModal} setOpen={setPasswordModal} />
        <Popconfirm
          title="Delete account"
          description="Are you sure to delete your account? All the data will be deleted"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
          placement="top"
        >
          <div className="flex flex-row items-center cursor-pointer group">
            <p className="font-semibold">Delete account</p>
            <IoIosArrowForward className="ml-auto group-hover:text-[#fe5f5c]" />
          </div>
        </Popconfirm>
        <Link
          to={"/"}
          onClick={handleLogout}
          className="flex flex-row items-center cursor-pointer group"
        >
          <p className="font-semibold">Log out</p>
          <IoIosArrowForward className="ml-auto group-hover:text-[#fe5f5c]" />
        </Link>
      </div>
    </div>
  );
};

export default StudentSetting;
