import { Link } from "react-router-dom";
import backgroundImg from "/src/assets/header_96c74815-3497-4ccf-bf3c-3dfdfa17e313.webp";
import MainSignUp from "../../components/Register/MainSignUp";
import { useState } from "react";
import ContinueEmail from "../../components/Register/ContinueEmail";

const Register = () => {
  const [continueEmail, setContinueEmail] = useState(false);
  return (
    <div className="min-h-screen flex flex-col gap-5">
      <div className="py-4 px-4 flex flex-row items-center">
        <Link to={"/"} className="w-1/12 max-md:w-1/4">
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            alt="Logo"
            className="w-full h-auto object-cover"
          />
        </Link>
        <div className="flex flex-row gap-4 ml-auto max-md:hidden">
          <Link
            to={""}
            className="px-8 py-2 text-[#fe5f5c] bg-[#f6f0ff] hover:bg-[#ece0fd] transition-all duration-100 ease-in-out rounded-md"
          >
            Join a game
          </Link>
          <Link
            to={"/login"}
            className="px-8 py-2 bg-[#fe5f5c] rounded-md text-white hover:bg-[#f8a09f] transition-all ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 max-md:bg-white w-2/3 min-h-full mx-auto rounded-lg flex flex-row gap-4 max-md:w-full">
        {continueEmail ? (
          <ContinueEmail setContinueEmail={setContinueEmail} />
        ) : (
          <MainSignUp setContinueEmail={setContinueEmail} />
        )}

        <div
          className="w-2/5 h-auto rounded-r-lg bg-cover bg-center max-md:hidden"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
