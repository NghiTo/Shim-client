import { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { AiOutlinePicture } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import defaultImg from "/src/assets/default-ava.png";

interface NavBarProps {
  setSelectedKeys(selectedKeys: string[]): void;
}

const NavBar: React.FC<NavBarProps> = ({ setSelectedKeys }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
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

  return (
    <div className="flex flex-row justify-end w-full py-2 px-4 gap-2 border-b border-gray-400">
      <FaRegBell className="border border-gray-400 h-auto w-9 p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-all ease-in duration-100" />
      <div className="border border-gray-400 whitespace-nowrap font-medium p-2 cursor-pointer transition-all ease-in duration-100 rounded-md hover:bg-gray-200">
        Enter code
      </div>
      <div className="flex flex-row items-center justify-center p-2 border border-gray-400 rounded-md font-medium gap-1 hover:bg-gray-200 transition-all ease-in duration-100 cursor-pointer">
        <TbMessageQuestion className="w-full" />
        <p className="whitespace-nowrap">Get help</p>
      </div>
      <Popover
        placement="bottomRight"
        title={"NghiTo"}
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
              to={""}
              className="flex flex-row items-center gap-2"
              onClick={closePopover}
            >
              <LuSettings />
              <p>Settings</p>
            </Link>
            <Link
              to={""}
              className="flex flex-row items-center gap-2"
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
