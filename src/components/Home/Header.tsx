import { Drawer, DrawerProps, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("top");
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-row px-5 py-4 text-base bg-white sticky top-0 z-20 transition-shadow ${
        shadow ? "shadow-md" : ""
      }`}
    >
      <div className="flex flex-row items-center gap-4 w-1/2">
        <div className="w-1/5 h-full max-md:w-1/2 flex items-center">
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            alt="Logo"
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="flex flex-row max-md:hidden w-full">
          <Link
            to={""}
            className="rounded-lg px-4 py-2 whitespace-nowrap bg-white hover:bg-[#f6f0ff] transition-all ease-in-out"
          >
            For Schools
          </Link>
          <Link
            to={""}
            className="rounded-lg px-4 py-2 whitespace-nowrap bg-white hover:bg-[#f6f0ff] transition-all ease-in-out"
          >
            Plans
          </Link>
          <Link
            to={""}
            className="rounded-lg px-4 py-2 whitespace-nowrap bg-white hover:bg-[#f6f0ff] transition-all ease-in-out"
          >
            Solutions
          </Link>
          <Link
            to={""}
            className="rounded-lg px-4 py-2 whitespace-nowrap bg-white hover:bg-[#f6f0ff] transition-all ease-in-out"
          >
            Resources
          </Link>
          <Link
            to={""}
            className="rounded-lg px-4 py-2 whitespace-nowrap bg-white hover:bg-[#f6f0ff] transition-all ease-in-out"
          >
            For Business
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 w-1/2 justify-end">
        <Link
          to={""}
          className="max-md:hidden rounded-lg px-4 py-2 whitespace-nowrap border-2 text-[#fe5f5c] border-[#f6f0ff] hover:bg-[#f6f0ff] transition-all ease-in-out"
        >
          Get a quote
        </Link>
        <Link
          to={""}
          className="select-none rounded-lg px-4 py-2 whitespace-nowrap border-2 text-[#fe5f5c] border-[#f6f0ff] hover:bg-[#f6f0ff] transition-all ease-in-out"
        >
          Enter code
        </Link>
        <Link
          to={"/login"}
          onClick={() => localStorage.clear()}
          className="max-md:hidden rounded-lg bg-[#f6f0ff] hover:bg-[#ece0fd] text-[#ca8787] px-4 py-2 whitespace-nowrap transition-all ease-in-out"
        >
          Log in
        </Link>
        <Link
          to={"/signup"}
          className="max-md:hidden rounded-lg bg-[#fe5f5c] px-4 text-white py-2 whitespace-nowrap hover:bg-[#fc8785] transition-all ease-in-out"
        >
          Sign up
        </Link>
        <FaBars
          onClick={() => setIsOpenModal(true)}
          className="md:hidden cursor-pointer"
        />
      </div>
      <Drawer
        title={
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            alt="Logo"
            className="w-1/5 ml-4 h-auto object-cover scale-150"
          />
        }
        placement={placement}
        closable={true}
        destroyOnClose
        onClose={() => setIsOpenModal(false)}
        open={isOpenModal}
        key={placement}
        height={500}
      >
        <div className="flex flex-col gap-4 text-base">
          <Dropdown trigger={["click"]}>
            <div className="flex flex-row items-center gap-1">
              <a onClick={(e) => e.preventDefault()} className="text-base">
                For Schools
              </a>
              <IoIosArrowDown />
            </div>
          </Dropdown>
          <Link to={""}>For Work</Link>
          <Link to={""}>Plans</Link>
          <Dropdown trigger={["click"]}>
            <div className="flex flex-row items-center gap-1">
              <a onClick={(e) => e.preventDefault()} className="text-base">
                Solutions
              </a>
              <IoIosArrowDown />
            </div>
          </Dropdown>
          <Dropdown trigger={["click"]}>
            <div className="flex flex-row items-center gap-1">
              <a onClick={(e) => e.preventDefault()} className="text-base">
                Resources
              </a>
              <IoIosArrowDown />
            </div>
          </Dropdown>
          <Link
            to={""}
            className="text-center rounded-lg px-4 py-2 whitespace-nowrap border-2 text-[#fe5f5c] border-[#f6f0ff] hover:text-[#fe5f5c] transition-all ease-in-out"
          >
            Get a quote
          </Link>
          <Link
            to={"/login"}
            className="rounded-lg text-center bg-[#f6f0ff] hover:text-[#fe5f5c] text-[#fe5f5c] px-4 py-2 whitespace-nowrap transition-all ease-in-out"
          >
            Log in
          </Link>
          <Link
            to={"/signup"}
            className="rounded-lg text-center bg-[#fe5f5c] px-4 w-full text-white py-2 whitespace-nowrap hover:text-white transition-all ease-in-out"
          >
            Sign up
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
