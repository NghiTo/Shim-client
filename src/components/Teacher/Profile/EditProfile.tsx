import { Modal, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { RootState } from "../../../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateSchema } from "../../../schemas/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfile, UserResponse } from "../../../types/user.type";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../../../apis/user.api";

interface EditProfileProps {
  data?: UserResponse;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfileProps> = ({
  data,
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UserProfile>({
    resolver: yupResolver(updateSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      title: data?.title,
      firstName: data?.firstName,
      lastName: data?.lastName,
      subject: data?.subject,
      grade: data?.grade,
    },
  });

  const { mutate } = useMutation(
    (data: UserProfile) => updateUser(user.id, data),
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo", user.id]);
        setIsModalOpen(false);
      },
    }
  );

  const onSubmit: SubmitHandler<UserProfile> = (formData) => {
    mutate(formData);
  };

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        firstName: data.firstName,
        lastName: data.lastName,
        subject: data.subject,
        grade: data.grade,
      });
    }
  }, [data, reset]);

  return (
    <Modal
      open={isModalOpen}
      title="Edit Profile"
      okText="Save"
      width={700}
      onCancel={() => {
        if (!data?.title || !data?.subject || !data?.grade) {
          return
        }
        setIsModalOpen(false);
      }}
      onOk={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-full">
          <div className="w-1/5">
            <p>Title</p>
            <Select
              {...register("title")}
              defaultValue={data?.title}
              className="w-full"
              onChange={(value) => setValue("title", value)}
              options={[
                { value: "Mr", label: "Mr" },
                { value: "Ms", label: "Ms" },
                { value: "Mrs", label: "Mrs" },
                { value: "Dr", label: "Dr" },
                { value: "Mx", label: "Mx" },
              ]}
            ></Select>
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="w-full">
            <p>First Name</p>
            <input
              {...register("firstName")}
              className="border w-full border-gray-500 outline-none rounded-lg p-1"
              type="text"
              defaultValue={data?.firstName as string}
            />
          </div>
          <div className="w-full">
            <p>Last Name</p>
            <input
              {...register("lastName")}
              type="text"
              className="border w-full border-gray-500 outline-none rounded-lg p-1"
              defaultValue={data?.lastName as string}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-1/6">
            <p>Grade</p>
            <Select
              {...register("grade")}
              defaultValue={data?.grade}
              className="w-full"
              onChange={(value) => setValue("grade", value)}
              options={[
                { value: "1st", label: "1st" },
                { value: "2nd", label: "2nd" },
                { value: "3rd", label: "3rd" },
                { value: "4th", label: "4th" },
                { value: "5th", label: "5th" },
                { value: "6th", label: "6th" },
                { value: "7th", label: "7th" },
                { value: "8th", label: "8th" },
                { value: "9th", label: "9th" },
                { value: "10th", label: "10th" },
                { value: "11th", label: "11th" },
                { value: "12th", label: "12th" },
              ]}
            ></Select>
            {errors.grade && (
              <p className="text-red-500">{errors.grade.message}</p>
            )}
          </div>
          <div className="w-1/3">
            <p>Subject</p>
            <Select
              {...register("subject")}
              defaultValue={data?.subject}
              className="w-full"
              onChange={(value) => setValue("subject", value)}
              options={[
                { value: "Mathematics", label: "Mathematics" },
                { value: "English", label: "English" },
                { value: "Literature", label: "Literature" },
                { value: "History", label: "History" },
                { value: "Geography", label: "Geography" },
                { value: "Physics", label: "Physics" },
                { value: "Chemistry", label: "Chemistry" },
                { value: "Biology", label: "Biology" },
                { value: "Art", label: "Art" },
                { value: "Music", label: "Music" },
                {
                  value: "Information technology",
                  label: "Information technology",
                },
                { value: "Physical education", label: "Physical education" },
                { value: "Civic education", label: "Civic education" },
                { value: "German", label: "German" },
                { value: "Japanese", label: "Japanese" },
                { value: "Chinese", label: "Chinese" },
                { value: "Russian", label: "Russian" },
                { value: "French", label: "French" },
                { value: "Korean", label: "Korean" },
              ]}
            ></Select>
            {errors.subject && (
              <p className="text-red-500">{errors.subject.message}</p>
            )}
          </div>
        </div>
        <div>
          <p>School</p>
          <div className="border w-full border-gray-500 rounded-lg p-2 flex flex-row items-center">
            <p>
              {data?.school.name +
                ", " +
                data?.school.city +
                ", " +
                data?.school.country}
            </p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                dispatch(setUser({ ...user, schoolId: "" }));
              }}
              className="py-1 px-2 bg-gray-300 hover:bg-gray-200 rounded-md ml-auto transition-colors ease-in-out"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
