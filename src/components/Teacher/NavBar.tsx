import { useEffect, useState } from "react";
import {
  FaHandHoldingHeart,
  FaHouse,
  FaPlus,
  FaQuestion,
  FaRegBell,
  FaSchool,
} from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
import { Drawer, Menu, MenuProps, Popover } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { AiOutlinePicture } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import defaultImg from "/src/assets/default-ava.png";
import { IoMdMenu } from "react-icons/io";
import { RiBook2Line } from "react-icons/ri";
import { IoPieChartOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { openModal } from "../../store/modalSlice";

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

interface NavBarProps {
  selectedKeys: string[];
  setSelectedKeys(selectedKeys: string[]): void;
}

const NavBar: React.FC<NavBarProps> = ({ selectedKeys, setSelectedKeys }) => {
  const navigate = useNavigate();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    setPopoverVisible(false);
  };

  const closePopover = () => {
    setPopoverVisible(false);
  };

  const handleMenuClick = (key: string) => {
    setSelectedKeys([key]);
    switch (key) {
      case "1":
        navigate("/teacher");
        break;
    }
  };

  const handleOrientationChange = () => {
    if (window.innerWidth > window.innerHeight) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <div className="flex flex-row justify-end items-center w-full py-2 px-4 gap-2 border-b border-gray-400">
      <IoMdMenu
        className="mr-auto text-2xl cursor-pointer md:hidden"
        onClick={() => setOpen(true)}
      />
      <Drawer
        title={
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            className="object-cover w-2/3"
            alt="Logo"
          />
        }
        placement={"left"}
        closable={true}
        onClose={() => setOpen(false)}
        open={open}
        width={200}
      >
        <button onClick={() => dispatch(openModal())} className="bg-[#fe5f5c] w-11/12 ml-2 my-2 flex flex-row items-center justify-center gap-1 text-white rounded-md py-2 hover:bg-[#f8a09f]">
          <FaPlus className="text-xs" />
          <p>Create</p>
        </button>
        <Menu
          selectedKeys={selectedKeys}
          onSelect={({ key }) => {
            handleMenuClick(key);
            setOpen(false);
          }}
          mode="inline"
          theme="light"
          items={items}
          className="text-sm"
        />
      </Drawer>
      <FaRegBell className="border border-gray-400 h-auto w-9 p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-all ease-in duration-100" />
      <div className="border border-gray-400 whitespace-nowrap font-medium p-2 cursor-pointer transition-all ease-in duration-100 rounded-md hover:bg-gray-200">
        Enter code
      </div>
      <div className="flex flex-row max-md:hidden items-center justify-center p-2 border border-gray-400 rounded-md font-medium gap-1 hover:bg-gray-200 transition-all ease-in duration-100 cursor-pointer">
        <TbMessageQuestion className="w-full" />
        <p className="whitespace-nowrap">Get help</p>
      </div>
      <Popover
        placement="bottomRight"
        title={"Shim"}
        trigger="click"
        open={popoverVisible}
        onOpenChange={setPopoverVisible}
        content={
          <div className="flex flex-col gap-2">
            <Link
              to={`/teacher/profile/${user.id}`}
              className="flex flex-row items-center gap-2 hover:text-[#fe5f5c]"
              onClick={() => {
                closePopover();
                setSelectedKeys([]);
              }}
            >
              <FaRegUserCircle />
              <p>View profile</p>
            </Link>
            <Link
              to={"/teacher/settings"}
              className="flex flex-row items-center gap-2 hover:text-[#fe5f5c]"
              onClick={() => {
                closePopover();
                setSelectedKeys([]);
              }}
            >
              <LuSettings />
              <p>Settings</p>
            </Link>
            <Link
              to={""}
              className="flex flex-row items-center gap-2 hover:text-[#fe5f5c]"
              onClick={closePopover}
            >
              <AiOutlinePicture />
              <p>Memes</p>
            </Link>
            <Link
              to={"/"}
              onClick={() => {
                handleLogout();
                closePopover();
              }}
              className="flex flex-row items-center gap-2 hover:text-[#fe5f5c]"
            >
              <MdLogout />
              <p>Logout</p>
            </Link>
          </div>
        }
      >
        <img
          src={(user.avatarUrl as string) || defaultImg}
          alt="avatar"
          className="w-auto h-11 border-2 aspect-square object-cover border-gray-100 hover:border-gray-400 transition-all duration-100 ease-in-out cursor-pointer rounded-full "
          onClick={() => setPopoverVisible(!popoverVisible)}
        />
      </Popover>
    </div>
  );
};

export default NavBar;
