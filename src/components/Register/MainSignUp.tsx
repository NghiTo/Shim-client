import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface MainSignUpProps {
  setContinueEmail: (value: boolean) => void;
}

const MainSignUp: React.FC<MainSignUpProps> = ({ setContinueEmail }) => {
  return (
    <div className="w-3/5 max-md:w-full py-4 px-8">
      <h1 className="font-medium text-2xl">Welcome to Shim</h1>
      <h1 className="text-gray-600 text-xl">
        Create a free account in 2 steps
      </h1>
      <Link
        to={""}
        className="flex flex-row items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
      >
        <img src="/src/assets/google-logo-1.png" className="w-6" alt="Google" />
        <p className="font-medium text-xl">Continue with Google</p>
        <FaArrowRight className="ml-auto" />
      </Link>
      <button
        onClick={() => setContinueEmail(true)}
        className="flex flex-row w-full items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
      >
        <img
          src="/src/assets/envelope-regular.png"
          className="w-6"
          alt="Google"
        />
        <p className="font-medium text-xl">Continue with Email</p>
        <FaArrowRight className="ml-auto" />
      </button>
      <Link
        to={""}
        className="flex flex-row items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
      >
        <img src="/src/assets/facebook(1).png" className="w-6" alt="Google" />
        <p className="font-medium text-xl">Continue with Facebook</p>
        <FaArrowRight className="ml-auto" />
      </Link>
      <div className="text-center mt-4">or continue with</div>
      <div className="flex flex-row items-center justify-center gap-4 mt-2">
        <div className="flex flex-col justify-center items-center">
          <Link
            to={""}
            className="w-12 h-12 bg-white shadow-lg flex items-center justify-center p-3 rounded-sm"
          >
            <img src="/src/assets/ms-logo.png" alt="Microsoft" />
          </Link>
          <p className="text-sm">Microsoft</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            to={""}
            className="w-12 h-12 bg-black flex items-center justify-center p-2 rounded-sm"
          >
            <img src="/src/assets/Apple.png" alt="Apple" />
          </Link>
          <p className="text-sm">Apple</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            to={""}
            className="w-12 h-12 bg-[#fe5f5c] flex items-center justify-center p-3 rounded-sm"
          >
            <img
              src="/src/assets/shield-halved.png"
              className="w-full h-full"
              alt="Others"
            />
          </Link>
          <p className="text-sm">Others</p>
        </div>
      </div>
      <div className="text-gray-400 mt-8 max-md:hidden">
        By signing up, you agree to our{" "}
        <Link to={""} className="underline">
          Terms of Service
        </Link>{" "}
        &{" "}
        <Link to={""} className="underline">
          Privacy Policy
        </Link>
      </div>
      <div className="flex flex-row mt-2 justify-center gap-2 max-md:hidden">
        <p className="py-1">Already have an account?</p>
        <Link
          to={"/login"}
          className="py-1 px-4 rounded-md bg-gray-200 text-[#fe5f5c]"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default MainSignUp;
