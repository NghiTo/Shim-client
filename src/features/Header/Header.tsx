import { Drawer, DrawerProps } from "antd";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("top");

  return (
    <div className="flex flex-row px-5 py-2 text-lg">
      <div className="flex flex-row items-center gap-7">
        <a href={"/"} className="w-1/12 max-md:w-1/3">
          <img
            src="/public/202316445.png"
            alt="Logo"
            className="w-full h-auto object-cover scale-150"
          />
        </a>
        <div className="flex flex-row gap-3 max-md:hidden">
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
      <div className="flex flex-row items-center gap-4">
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
          to={""}
          className="max-md:hidden rounded-lg bg-[#f6f0ff] hover:bg-[#ece0fd] text-[#fe5f5c] px-4 py-2 whitespace-nowrap transition-all ease-in-out"
        >
          Log in
        </Link>
        <Link
          to={""}
          className="max-md:hidden rounded-lg bg-[#fe5f5c] px-4 text-white py-2 whitespace-nowrap hover:bg-[#f8a09f] transition-all ease-in-out"
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
            src="/public/202316445.png"
            alt="Logo"
            className="w-1/5 ml-2 h-auto object-cover scale-150"
          />
        }
        placement={placement}
        closable={true}
        destroyOnClose
        onClose={() => setIsOpenModal(false)}
        open={isOpenModal}
        key={placement}
      >
        <div className="flex flex-col gap-4 text-base">
          <Link to={""}>For Work</Link>
          <Link to={""}>Plans</Link>
          <Link
            to={""}
            className="text-center rounded-lg px-4 py-2 whitespace-nowrap border-2 text-[#fe5f5c] border-[#f6f0ff] hover:text-[#fe5f5c] transition-all ease-in-out"
          >
            Get a quote
          </Link>
          <Link
            to={""}
            className="rounded-lg text-center bg-[#f6f0ff] hover:text-[#fe5f5c] text-[#fe5f5c] px-4 py-2 whitespace-nowrap transition-all ease-in-out"
          >
            Log in
          </Link>
          <Link
            to={""}
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
