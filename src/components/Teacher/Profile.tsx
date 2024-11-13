import { FaBook, FaSchool } from "react-icons/fa6";
import defaultImg from "/src/assets/default-ava.png";
import { useQuery } from "react-query";
import { findUserById } from "../../apis/user.api";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();
  const { data: res, isLoading, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => findUserById(profileId as string),
  });
  if (isLoading) {
    return (
      <div className="bg-gray-100 p-8 h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-100 p-8 h-full flex justify-center items-center">
        <p className="text-center text-lg text-gray-700">
          Something went wrong...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 h-full">
      <div className="rounded-xl bg-white p-8 flex flex-row gap-8">
        <img src={defaultImg} alt="ava" className="w-1/6 h-auto rounded-full" />
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-lg font-semibold text-[#424242]">
              {res.data.title + ". " + res.data.firstName + " " + res.data.lastName}
            </h1>
            <p className="uppercase text-sm py-1 px-2 text-white bg-[#fe5f5c] rounded-full whitespace-nowrap text-center">
              {res.data.role}
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <FaBook className="text-[#fe5f5c]" />
              <p>English</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <FaSchool className="text-[#fe5f5c]" />
              <p>Hà Nội</p>
              <p className="uppercase text-sm py-1 px-2 text-white bg-[#00a06a] rounded-md whitespace-nowrap text-center">
                11th Grade
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
