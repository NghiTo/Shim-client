import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import {
  FaClockRotateLeft,
  FaFileImport,
  FaHeart,
  FaShare,
  FaUser,
} from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const menu: MenuItem[] = [
  { key: "1", icon: <FaUser />, label: "Created by me" },
  { key: "2", icon: <FaFileImport />, label: "Imported" },
  { key: "3", icon: <FaClockRotateLeft />, label: "Previously used" },
  { key: "4", icon: <FaHeart />, label: "Liked by me" },
  { key: "5", icon: <FaShare />, label: "Shared with me" },
];

const Library = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<string[]>(() => {
    const savedKeys = localStorage.getItem("selectedMenu");
    return savedKeys ? JSON.parse(savedKeys) : ["1"];
  });

  useEffect(() => {
    localStorage.setItem("selectedMenu", JSON.stringify(selectedMenu));
  }, [selectedMenu]);

  const handleMenuClick = (key: string) => {
    setSelectedMenu([key]);
    switch (key) {
      case "1":
        navigate("/teacher/library/created-by-me");
        break;
    }
  };
  return (
    <div className="bg-gray-100 h-full p-6 max-md:p-4 flex flex-row gap-2">
      <div className="w-1/4 flex flex-col gap-10">
        <h1 className="text-2xl font-semibold max-md:text-lg">My library</h1>
        <Menu
          selectedKeys={selectedMenu}
          onSelect={({ key }) => handleMenuClick(key)}
          items={menu}
          mode="inline"
          theme="light"
          className="text-sm bg-gray-100 Shim"
        />
      </div>
      <div className="px-2 w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default Library;
