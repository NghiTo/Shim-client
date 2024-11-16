import { FaBook, FaCamera, FaSchool } from "react-icons/fa6";
import defaultImg from "/src/assets/default-ava.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { findUserById, updateUser } from "../../../apis/user.api";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { checkImage, readAsBase64 } from "../../../utils/checkImage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { RootState } from "../../../store/store";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { FaUserEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";
import { UserResponse } from "../../../types/user.type";

const Profile = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);
  const { profileId } = useParams();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    data: res,
    isLoading: dataLoading,
    isError,
  } = useQuery<UserResponse>(
    "userInfo",
    () => findUserById(profileId as string),
    {
      staleTime: 0,
    }
  );

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const { mutate, isLoading } = useMutation(
    (avatarUrl: string | ArrayBuffer) =>
      updateUser(user.id as string, { avatarUrl }),
    {
      onError: (err: AxiosError) => {
        const errorMessage = (err.response?.data as { message: string })
          ?.message;
        toast.error(errorMessage || "Something went wrong");
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries("userInfo")
        dispatch(setUser({ ...user, avatarUrl: res.data.avatarUrl }));
      },
    }
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.files) {
      const file: File = target.files[0];
      const isValid = checkImage(file, "image");
      if (isValid) {
        const dataImage: string | ArrayBuffer = await readAsBase64(file);
        mutate(dataImage);
      }
    }
  };

  if (dataLoading) {
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
    <div className="bg-gray-100 p-8 max-md:py-8 max-md:px-0 max-md:min-h-screen h-full">
      <div className="rounded-xl bg-white p-8 max-md:p-4 flex flex-row gap-8 max-md:gap-2">
        <div
          onClick={handleImageClick}
          className="w-1/6 cursor-pointer group relative max-md:hidden"
        >
          <img
            src={(res?.avatarUrl as string) || defaultImg}
            alt="ava"
            className="w-full h-auto aspect-square rounded-full object-cover"
          />
          <div className="absolute rounded-full inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          {isLoading && (
            <div className="rounded-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          <FaCamera className="absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white" />
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleImageChange}
            className="absolute opacity-0 w-0 h-0"
          />
        </div>
        <div className="flex flex-col max-md:gap-4 w-full">
          <div className="flex flex-row gap-4 items-start">
            <img
              src={(res?.avatarUrl as string) || defaultImg}
              alt="ava"
              className="w-1/6 h-auto aspect-square rounded-full object-cover md:hidden"
            />
            <div className="flex flex-row gap-2 items-center max-md:flex-col max-md:items-start">
              <h1 className="text-lg max-md:text-base font-semibold text-[#424242]">
                {res?.title + ". " + res?.firstName + " " + res?.lastName}
              </h1>
              <p className="uppercase text-sm max-md:text-xs py-1 px-2 text-white bg-[#fe5f5c] rounded-full whitespace-nowrap text-center">
                {res?.role}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-auto font-medium border border-gray-300 py-1 rounded-md flex flex-row gap-1 items-center px-2 hover:bg-gray-200 transition-all ease-in-out duration-100"
            >
              <FaUserEdit />
              <p className="max-md:hidden">Edit profile</p>
            </button>
            <EditProfile
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              data={res}
            />
          </div>
          <div className="mt-auto flex flex-col gap-2 max-md:text-sm">
            <div className="flex flex-row items-center gap-1">
              <FaBook className="text-[#fe5f5c]" />
              <p>{res?.subject}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <FaSchool className="text-[#fe5f5c]" />
              <p>
                {res?.school.name +
                  ", " +
                  res?.school.city +
                  ", " +
                  res?.school.country}
              </p>
              <p className="text-sm py-1 px-2 text-white bg-[#00a06a] rounded-md whitespace-nowrap text-center">
                {res?.grade}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;