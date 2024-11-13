import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { LoginForm } from "../../types/register.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/userSchema";
import { useMutation } from "react-query";
import { login } from "../../apis/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

interface LoginFormProps {
  setContinueEmail: (value: boolean) => void;
}

const LoginBody: React.FC<LoginFormProps> = ({ setContinueEmail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    clearErrors,
    watch,
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate } = useMutation(login, {
    onSuccess: (res) => {
      localStorage.setItem("token", res.accessToken);
      dispatch(
        setUser({
          id: res.data.id,
          schoolId: res.data.schoolId,
        })
      );
      navigate("/teacher");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    mutate(data);
  };

  const email = watch("email");
  const password = watch("password");
  const isValidForm = email && password;

  return (
    <div className="w-3/5 max-md:w-full py-4 px-8 flex flex-col gap-4 min-h-full">
      <button
        onClick={() => setContinueEmail(false)}
        className="flex flex-row items-center gap-2 hover:text-[#fe5f5c] py-2 w-1/5 max-md:w-1/4 rounded-md"
      >
        <FaArrowLeft />
        <p>Go back</p>
      </button>
      <h1 className="text-2xl font-medium">Continue with email</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-4"
      >
        <div>
          <p>Enter email address</p>
          <div className="py-2 px-4 border-2 border-gray-300 rounded-md flex flex-row items-center gap-4 focus-within:border-[#fe5f5c] focus-within:border-2">
            <FaRegEnvelope className="text-gray-400" />
            <input
              {...register("email", { onChange: () => clearErrors("email") })}
              className="w-full bg-gray-100 max-md:bg-white outline-none"
              type="text"
              placeholder="name@example.com"
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <p>Password</p>
          <div className="py-2 px-4 border-2 border-gray-300 rounded-md flex flex-row items-center gap-4 focus-within:border-[#fe5f5c] focus-within:border-2">
            <GoLock className="text-gray-400" />
            <input
              {...register("password", {
                onChange: () => clearErrors("password"),
              })}
              className="w-full bg-gray-100 max-md:bg-white outline-none"
              type="password"
              placeholder="*******"
            />
          </div>
          {errors.password && (
            <span className="text-red-600 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          disabled={!isValidForm}
          type="submit"
          className={`w-full py-2 rounded-md ${
            isValidForm
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

export default LoginBody;
