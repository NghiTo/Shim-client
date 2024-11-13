import { Select } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm } from "../../types/register.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/userSchema";
import { useMutation } from "react-query";
import { createUser } from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

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
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate } = useMutation(createUser, {
    onSuccess: (res) => {
      dispatch(
        setUser({
          id: res.data.id,
          schoolId: res.data.schoolId,
        })
      );
      localStorage.removeItem("email");
      navigate("/teacher");
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    const email = localStorage.getItem("email");
    mutate({ ...data, role: "teacher", email: email });
  };

  const title = watch("title");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const password = watch("password");
  const isFormFilled = title && firstName && lastName && password;

  return (
    <div className="bg-gray-100 w-1/3 min-h-full mx-auto rounded-lg flex flex-col gap-8 max-md:w-full p-8">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-center text-2xl font-semibold">
          Provide your account details
        </h1>
        <p>Signing up as teacher</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <p>Title</p>
          <Select
            {...register("title")}
            defaultValue={"--"}
            onChange={(value) => {
              setValue("title", value);
            }}
            style={{ width: "17%" }}
            options={[
              { value: "Mr", label: "Mr" },
              { value: "Ms", label: "Ms" },
              { value: "Mrs", label: "Mrs" },
              { value: "Dr", label: "Dr" },
              { value: "Mx", label: "Mx" },
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
