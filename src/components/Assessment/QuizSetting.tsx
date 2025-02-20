import { Modal, Select } from "antd";
import defaultImg from "/src/assets/logo_placeholder_sm.png";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizSettingSchema } from "../../schemas/quizSchema";
import { QuizResponse, quizSetting } from "../../types/quiz.type";
import { useMutation, useQueryClient } from "react-query";
import { updateQuiz } from "../../apis/quiz.api";
import { FaCamera } from "react-icons/fa6";
import { checkImage, readAsBase64 } from "../../utils/checkImage";
import { subjectOptions } from "../../constants/constants";

interface QuizSettingProps {
  quiz: QuizResponse;
  openSetting: boolean;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizSetting: React.FC<QuizSettingProps> = ({
  openSetting,
  setOpenSetting,
  quiz,
}) => {
  const queryClient = useQueryClient();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState(defaultImg);

  const { mutate, isLoading } = useMutation(
    (data: quizSetting) => updateQuiz(quiz.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz", quiz.id]);
        setOpenSetting(false);
      },
      onError: (err) => {
        toast.error(err as string);
      },
    }
  );

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValid = checkImage(file, "image");
      if (isValid) {
        try {
          const dataImage: string | ArrayBuffer = await readAsBase64(file);

          if (typeof dataImage === "string") {
            setValue("coverImg", dataImage);
            setPreviewImage(dataImage); // Cập nhật ảnh xem trước
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          toast.error("Failed to process the image");
        }
      } else {
        toast.error("Invalid image format");
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<quizSetting>({
    resolver: yupResolver(quizSettingSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      isPublic: quiz?.isPublic,
      grade: quiz?.grade,
      subject: quiz?.subject,
      title: quiz?.title,
      coverImg: quiz?.coverImg,
    },
  });

  const handleSave: SubmitHandler<quizSetting> = (data) => {
    const updatedData: quizSetting = {
      title: data.title || "",
      subject: data.subject || "",
      grade: data.grade || "",
      isPublic: data.isPublic || true,
      coverImg: data.coverImg || "",
    };
    mutate(updatedData);
  };

  return (
    <Modal
      open={openSetting}
      title="Review quiz settings and you’re good to go"
      onCancel={() => {
        reset();
        setOpenSetting(false);
      }}
      width={600}
      onOk={handleSubmit(handleSave)}
      confirmLoading={isLoading}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p>Name</p>
            <input
              {...register("title", { onChange: () => clearErrors("title") })}
              type="text"
              placeholder="Quiz name"
              defaultValue={quiz?.title === "Untitled quiz" ? "" : quiz?.title}
              className="border border-gray-300 outline-none rounded-md py-1 px-2 w-full focus:border-gray-500"
            />
            {errors.title && (
              <span className="text-red-600 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            <p>Subject</p>
            <Select
              {...register("subject")}
              defaultValue={quiz?.subject || "--"}
              className="w-full"
              onChange={(value) => setValue("subject", value)}
              options={subjectOptions}
            ></Select>
            {errors.subject && (
              <span className="text-red-600 text-sm">
                {errors.subject.message}
              </span>
            )}
          </div>
          <div>
            <p>Grade</p>
            <Select
              {...register("grade")}
              onChange={(value) => setValue("grade", value)}
              defaultValue={quiz?.grade || "--"}
              className="w-full"
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
              <span className="text-red-600 text-sm">
                {errors.grade.message}
              </span>
            )}
          </div>
          <div>
            <p>Visibility</p>
            <Select
              {...register("isPublic")}
              onChange={(value) => setValue("isPublic", value)}
              defaultValue={quiz?.isPublic}
              className="w-full"
              options={[
                { value: true, label: "Public" },
                { value: false, label: "Private" },
              ]}
            ></Select>
            {errors.isPublic && (
              <span className="text-red-600 text-sm">
                {errors.isPublic.message}
              </span>
            )}
          </div>
        </div>
        <div
          className="relative w-full h-64 group cursor-pointer mt-auto"
          onClick={handleImageClick}
        >
          <img
            src={quiz?.coverImg || previewImage}
            alt="Quiz Cover"
            className="w-full h-full object-cover rounded-md bg-gray-200 border border-gray-400"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
            <div className="text-white flex flex-col items-center gap-2">
              <FaCamera className="text-3xl" />
              <p className="text-sm">Click to upload</p>
            </div>
          </div>
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleImageChange}
            className="absolute opacity-0 w-full h-full cursor-pointer top-0"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QuizSetting;
