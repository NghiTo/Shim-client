import { Select } from "antd";
import { StudentRegisterForm } from "../../types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentRegisterSchema } from "../../schemas/userSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { createUser } from "../../apis/user.api";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const StudentRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<StudentRegisterForm>({
    resolver: yupResolver(studentRegisterSchema),
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
      navigate("/student");
    },
  });

  const onSubmit: SubmitHandler<StudentRegisterForm> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    const email = localStorage.getItem("email") as string;
    create({ ...userData, role: "student", email });
  };

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isFormFilled = firstName && lastName && password && confirmPassword;

  return (
    <div className="bg-gray-100 w-1/3 min-h-full mx-auto rounded-lg flex flex-col gap-8 max-md:w-full p-8">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-center text-2xl font-semibold">
          Provide your account details
        </h1>
        <p>Signing up as student</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="w-1/4">
          <p>Grade</p>
          <Select
            {...register("grade")}
            defaultValue={"--"}
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
          <input
            {...register("password", {
              onChange: () => clearErrors("password"),
            })}
            type="password"
            className="w-full py-2 px-3 rounded-md border border-gray-500 outline-none"
            placeholder="*******"
          />
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

export default StudentRegister;
