import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import backgroundImg from "/src/assets/header_96c74815-3497-4ccf-bf3c-3dfdfa17e313.webp";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col gap-8">
      <div className="py-4 px-4 flex flex-row items-center">
        <Link to={"/"} className="w-1/12">
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            alt="Logo"
            className="w-full h-auto object-cover"
          />
        </Link>
        <div className="flex flex-row gap-4 ml-auto">
          <Link
            to={""}
            className="px-8 py-2 text-[#fe5f5c] bg-[#f6f0ff] hover:bg-[#ece0fd] transition-all duration-100 ease-in-out rounded-md"
          >
            Join a game
          </Link>
          <Link
            to={""}
            className="px-8 py-2 bg-[#fe5f5c] rounded-md text-white hover:bg-[#f8a09f] transition-all ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 w-2/3 h-3/4 mx-auto rounded-lg flex flex-row gap-4">
        <div className="w-3/5 py-4 px-8">
          <h1 className="font-medium text-2xl">Welcome to Shim</h1>
          <h1 className="text-gray-600 text-xl">
            Create a free account in 2 steps
          </h1>
          <Link
            to={""}
            className="flex flex-row items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-md"
          >
            <img
              src="/src/assets/google-logo-1.png"
              className="w-6"
              alt="Google"
            />
            <p className="font-medium text-xl">Continue with Google</p>
            <FaArrowRight className="ml-auto" />
          </Link>
          <div className="text-gray-400">
            By signing up, you agree to our <u>Terms of Service</u> &{" "}
            <u>Privacy Policy</u>
          </div>
          <div className="flex flex-row mt-8 justify-center gap-2">
            <p className="py-1">Already have an account?</p>
            <Link to={""} className="py-1 px-4 rounded-md bg-gray-200 text-[#fe5f5c]">Login</Link>
          </div>
        </div>
        <div
          className="w-2/5 h-auto rounded-r-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
