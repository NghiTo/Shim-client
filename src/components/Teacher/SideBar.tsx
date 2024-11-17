import { Menu, MenuProps } from "antd";
import React from "react";
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
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <FaHouse />, label: "Explore" },
  { key: "2", icon: <RiBook2Line />, label: "Library" },
  { key: "3", icon: <IoPieChartOutline />, label: "Report" },
  {
    key: "4",
    label: "Classes",
    icon: <SiGoogleclassroom />,
  },
  {
    key: "5",
    label: "Accommodations",
    icon: <FaHandHoldingHeart />,
  },
  {
    key: "6",
    label: "Teachers",
    icon: <FaSchool />,
  },
  {
    key: "sub1",
    label: "Help and Resources",
    icon: <FaQuestion />,
    children: [
      { key: "7", label: "Teacher Resources" },
      { key: "8", label: "Teacher wish list" },
      { key: "9", label: "Contact Support" },
      { key: "10", label: "Help Center" },
    ],
  },
];

interface SideBarProps {
  selectedKeys: string[];
  setSelectedKeys(selectedKeys: string[]): void;
}

const SideBar: React.FC<SideBarProps> = ({ selectedKeys, setSelectedKeys }) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    setSelectedKeys([key]);
    if (key === "1") {
      navigate("/teacher");
    }
  };

  return (
    <div className="border-r border-gray-400 w-1/5 py-2 flex flex-col gap-2 min-h-screen max-md:hidden">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt="Logo"
        className="object-cover w-2/5 flex mx-auto mb-3"
      />
      <button className="bg-[#fe5f5c] mx-2 flex flex-row items-center justify-center gap-1 text-white rounded-md py-2 hover:bg-[#fc8785] transition-all ease-in-out">
        <FaPlus className="text-xs" />
        <p>Create</p>
      </button>
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
