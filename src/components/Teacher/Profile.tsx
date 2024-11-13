import { FaBook, FaCamera, FaSchool } from "react-icons/fa6";
import defaultImg from "/src/assets/default-ava.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { findUserById, updateUser } from "../../apis/user.api";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { checkImage, readAsBase64 } from "../../utils/checkImage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { UserResponse } from "../../interfaces/user.interface";

const Profile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);
  const { profileId } = useParams();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    data: res,
    isLoading,
    isError,
  } = useQuery<UserResponse>("userInfo", () => findUserById(profileId as string), {
    staleTime: 0,
  });

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const { mutate } = useMutation(
    (avatarUrl: string | ArrayBuffer | null) =>
      updateUser(user.id as string, { avatarUrl }),
    {
      onError: (err: AxiosError) => {
        const errorMessage = (err.response?.data as { message: string })
          ?.message;
        toast.error(errorMessage || "Something went wrong", {
          autoClose: 2000,
          pauseOnHover: false,
        });
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries("userInfo", { refetchActive: true });
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
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
        mutate(dataImage);
      }
    }
  };

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
        <div
          onClick={handleImageClick}
          className="w-1/6 cursor-pointer group relative"
        >
          <img
            src={res?.avatarUrl as string || defaultImg}
            alt="ava"
            className="w-full h-auto aspect-square rounded-full object-cover"
          />
          <div className="absolute rounded-full inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          <FaCamera className="absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white" />
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleImageChange}
            className="absolute opacity-0 w-0 h-0"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-lg font-semibold text-[#424242]">
              {res?.title +
                ". " +
                res?.firstName +
                " " +
                res?.lastName}
            </h1>
            <p className="uppercase text-sm py-1 px-2 text-white bg-[#fe5f5c] rounded-full whitespace-nowrap text-center">
              {res?.role}
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <FaBook className="text-[#fe5f5c]" />
              <p>English</p>
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
