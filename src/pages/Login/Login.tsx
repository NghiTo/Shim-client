import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import backgroundImg from "/src/assets/header_96c74815-3497-4ccf-bf3c-3dfdfa17e313.webp";

const Login = () => {
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
            to={"/signup"}
            className="px-8 py-2 bg-[#fe5f5c] rounded-md text-white hover:bg-[#f8a09f] transition-all ease-in-out"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 max-md:bg-white w-2/3 h-3/4 mx-auto rounded-lg flex flex-row gap-4 max-md:w-full">
        <div className="w-3/5 max-md:w-full py-4 px-8">
          <h1 className="font-medium text-2xl">Log in to Shim</h1>
          <Link
            to={""}
            className="flex flex-row items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
          >
            <img
              src="/src/assets/google-logo-1.png"
              className="w-6"
              alt="Google"
            />
            <p className="font-medium text-xl">Continue with Google</p>
            <FaArrowRight className="ml-auto" />
          </Link>
          <Link
            to={""}
            className="flex flex-row items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
          >
            <img
              src="/src/assets/envelope-regular.png"
              className="w-6"
              alt="Google"
            />
            <p className="font-medium text-xl">Continue with Email</p>
            <FaArrowRight className="ml-auto" />
          </Link>
          <Link
            to={""}
            className="flex flex-row items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
          >
            <img
              src="/src/assets/facebook(1).png"
              className="w-6"
              alt="Google"
            />
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
                className="w-12 h-12 bg-white shadow-lg flex items-center justify-center p-1 rounded-sm"
              >
                <img src="/src/assets/Phone.png" alt="Phone" />
              </Link>
              <p className="text-sm">Phone</p>
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
          <div className="flex flex-row mt-8 justify-center gap-2 max-md:hidden">
            <p className="py-1">Don't have an account?</p>
            <Link
              to={"/signup"}
              className="py-1 px-4 rounded-md bg-gray-200 text-[#fe5f5c]"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div
          className="w-2/5 h-auto rounded-r-lg bg-cover bg-center max-md:hidden"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
