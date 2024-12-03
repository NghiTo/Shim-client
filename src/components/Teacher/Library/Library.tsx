import { Menu, MenuProps } from "antd";
import { FaUser } from "react-icons/fa6";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [{ key: "1", icon: <FaUser />, label: "Created by me" },
    
];

const Library = () => {
  return (
    <div className="bg-gray-100 h-full p-6 flex flex-row gap-2">
      <div className="w-1/4 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">My library</h1>
        <Menu items={items} mode="inline" theme="light" className="text-sm bg-gray-100 Shim" />
      </div>
      <div className="p-4 w-3/4">hello</div>
    </div>
  );
};

export default Library;
