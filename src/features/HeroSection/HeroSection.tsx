import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import backgroundImg from "/public/64c12a1c4aa4f4832e6d349b_UCT-OHS_Banner-B_V1.webp"

const HeroSection = () => {
  return (
    <div className="bg-cover bg-center py-32 pl-20 max-md:px-8 max-md:text-center" style={{backgroundImage: `url(${backgroundImg})`}}>
      <div className="flex flex-col gap-6 justify-start mb-6">
        <p className="text-3xl max-md:text-xl">
          Introducing <b className="text-[#fe5f5c]">Shimnek course</b>
        </p>
        <p className="text-6xl font-bold md:w-1/2 max-md:text-4xl">I had no idea Shim could do that.</p>
        <p className="text-2xl pb-6 text-[#666666] max-md:text-lg">- Almost everybody</p>
        <p className="text-3xl md:w-1/2 max-md:text-base">
          Create and deliver bell-to-bell curriculum resources that meet the
          needs of every student.
        </p>
      </div>
      <div className="flex flex-row max-md:flex-col justify-start gap-4">
        <Link to={""}>
          <div className="bg-[#fe5f5c] rounded-md py-2 px-4 flex flex-col items-start w-48 max-md:w-full">
            <p className="uppercase">Teachers</p>
            <div className="flex flex-row items-center text-white">
              <p>Sign up for free</p>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <Link to={""}>
          <div className="rounded-md py-2 px-4 flex flex-col items-start bg-[#ece0fd] w-48 max-md:w-full">
            <p className="uppercase">Students</p>
            <div className="flex flex-row items-center text-[#fe5f5c]">
              <p>Learn more</p>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
