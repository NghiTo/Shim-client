import { Select } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/userSchema";
import { useMutation } from "react-query";
import { createUser } from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { TeacherRegisterForm } from "../../types/user.type";

const TeacherRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<TeacherRegisterForm>({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate: create } = useMutation(createUser, {
    onSuccess: (res) => {
      dispatch(
        setUser({
          id: res.data.id,
          role: res.data.role,
          schoolId: res.data.schoolId,
          avatarUrl: res.data.avatarUrl,
          isAuthUser: false,
        })
      );
      localStorage.removeItem("email");
      navigate("/teacher");
    },
  });

  const onSubmit: SubmitHandler<TeacherRegisterForm> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    const email = localStorage.getItem("email") as string;
    create({ ...userData, role: "teacher", email });
  };

  const title = watch("title");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isFormFilled =
    title && firstName && lastName && password && confirmPassword;

  return (
    <div className="bg-gray-100 w-1/3 min-h-full mx-auto rounded-lg flex flex-col gap-8 max-md:w-full p-8">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-center text-2xl font-semibold">
          Provide your account details
        </h1>
        <p>Signing up as teacher</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-row w-full gap-4">
          <div className="w-1/4">
            <p>Title</p>
            <Select
              {...register("title")}
              defaultValue={"--"}
              className="w-full"
              onChange={(value) => {
                setValue("title", value);
              }}
              options={[
                { value: "Mr", label: "Mr" },
                { value: "Ms", label: "Ms" },
                { value: "Mrs", label: "Mrs" },
                { value: "Dr", label: "Dr" },
                { value: "Mx", label: "Mx" },
              ]}
            ></Select>
          </div>
          <div className="w-1/4">
            <p>Grade</p>
            <Select
              {...register("grade")}
              defaultValue={"--"}
              className="w-full"
              onChange={(value) => {
                setValue("grade", value);
              }}
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
          </div>
          <div className="w-1/2">
            <p>Subject</p>
            <Select
              {...register("subject")}
              defaultValue={"--"}
              className="w-full"
              onChange={(value) => {
                setValue("subject", value);
              }}
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
          </div>
        </div>
        <div>
          <p>First name</p>
          <input
            {...register("firstName", {
              onChange: () => clearErrors("firstName"),
            })}
            type="text"
            className="w-full py-2 px-3 rounded-md border border-gray-500 outline-none"
            placeholder="Shim"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <p>Last name</p>
          <input
            {...register("lastName", {
              onChange: () => clearErrors("lastName"),
            })}
            type="text"
            className="w-full py-2 px-3 rounded-md border border-gray-500 outline-none"
            placeholder="nek"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <p>Password</p>
          <div>
            <input
              {...register("password", {
                onChange: () => clearErrors("password"),
              })}
              type="password"
              className="w-full py-2 px-3 rounded-md border border-gray-500 outline-none"
              placeholder="*******"
            />
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <p>Confirm Password</p>
          <input
            {...register("confirmPassword", {
              onChange: () => clearErrors("confirmPassword"),
            })}
            type="password"
            className="w-full py-2 px-3 rounded-md border border-gray-500 outline-none"
            placeholder="*******"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormFilled}
          className={`w-full py-2 rounded-md ${
            isFormFilled
              ? "bg-[#fe5f5c] text-white"
              : "bg-gray-300 text-gray-400"
          }`}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default TeacherRegister;
