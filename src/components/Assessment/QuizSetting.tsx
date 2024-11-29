import { Modal, Select } from "antd";
import defaultImg from "/src/assets/default-ava.png";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizSettingSchema } from "../../schemas/quizSchema";
import { QuizResponse, quizSetting } from "../../types/quiz.type";
import { useMutation, useQueryClient } from "react-query";
import { updateQuiz } from "../../apis/quiz.api";

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

  const { mutate } = useMutation(
    (data: quizSetting) => updateQuiz(quiz.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz", quiz.id]);
        setOpenSetting(false);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

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
    },
  });

  const handleSave: SubmitHandler<quizSetting> = (data) => {
    mutate(data);
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
        <div className="h-full">
          <img
            src={defaultImg}
            alt="ava"
            className="w-3/4 m-auto h-auto aspect-square rounded-md object-cover"
          />
        </div>
      </div>
    </Modal>
  );
};

export default QuizSetting;
