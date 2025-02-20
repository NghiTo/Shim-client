import { Menu, MenuProps } from "antd";
import React, { useEffect } from "react";
import {
  FaHandHoldingHeart,
  FaHouse,
  FaPlus,
  FaQuestion,
  FaSchool,
} from "react-icons/fa6";
import { IoPieChartOutline } from "react-icons/io5";
import { RiBook2Line } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";
import CreateQuiz from "./CreateQuiz";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/teacher", icon: <FaHouse />, label: "Explore" },
  { key: "/teacher/library/created-by-me", icon: <RiBook2Line />, label: "Library" },
  { key: "/teacher/reports", icon: <IoPieChartOutline />, label: "Report" },
  {
    key: "/teacher/classes",
    label: "Classes",
    icon: <SiGoogleclassroom />,
  },
  {
    key: "/teacher/accommodations",
    label: "Accommodations",
    icon: <FaHandHoldingHeart />,
  },
  {
    key: "/teacher/district",
    label: "Teachers",
    icon: <FaSchool />,
  },
  {
    key: "sub1",
    label: "Help and Resources",
    icon: <FaQuestion />,
    children: [
      { key: "/teacher/resources", label: "Teacher Resources" },
      { key: "/teacher/wishlist", label: "Teacher wish list" },
      { key: "/teacher/support", label: "Contact Support" },
      { key: "/teacher/help-center", label: "Help Center" },
    ],
  },
];

interface SideBarProps {
  selectedKeys: string[];
  setSelectedKeys(selectedKeys: string[]): void;
}

const SideBar: React.FC<SideBarProps> = ({ selectedKeys, setSelectedKeys }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleMenuClick = (key: string) => {
    setSelectedKeys([key]);
    navigate(key);
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname, setSelectedKeys]);

  return (
    <div className="sticky top-0 w-1/5 py-2 flex flex-col gap-2 h-screen max-md:hidden">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt="Logo"
        className="object-cover w-2/5 flex mx-auto mb-3"
      />
      <button
        onClick={() => dispatch(openModal())}
        className="bg-[#fe5f5c] mx-2 flex flex-row items-center justify-center gap-1 text-white rounded-md py-2 hover:bg-[#fc8785] transition-all ease-in-out"
      >
        <FaPlus className="text-xs" />
        <p>Create</p>
      </button>
      <CreateQuiz />
      <Menu
        selectedKeys={selectedKeys}
        onSelect={({ key }) => handleMenuClick(key)}
        mode="inline"
        theme="light"
        items={items}
        className="text-sm"
      />
    </div>
  );
};

export default SideBar;
