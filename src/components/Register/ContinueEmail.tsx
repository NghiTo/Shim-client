import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import { EmailForm } from "../../types/register.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../schemas/userSchema";
import { useMutation } from "react-query";
import { findUserByEmail } from "../../apis/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface ContinueEmailProps {
  setContinueEmail: (value: boolean) => void;
}

const ContinueEmail: React.FC<ContinueEmailProps> = ({ setContinueEmail }) => {
  const navigate = useNavigate();

  const {
    register,
    clearErrors,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EmailForm>({
    resolver: yupResolver(emailSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate } = useMutation(findUserByEmail, {
    onSuccess: () => {
      toast.error("This email address is already registered. Please log in", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        const email = watch("email");
        localStorage.setItem("email", email);
        navigate("/signup/occupation");
      } else {
        toast.error("An error occurred while checking the email address", {
          autoClose: 3000,
          pauseOnHover: false,
        });
      }
    },
  });

  const emailValue = watch("email");
  const isEmailValid = emailValue && emailValue.length > 0;

  const onSubmit: SubmitHandler<EmailForm> = (data) => {
    mutate(data.email);
  };

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
              name="email"
              id="email"
              placeholder="name@example.com"
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={!isEmailValid}
          className={`w-full py-2 rounded-md ${
            isEmailValid
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

export default ContinueEmail;
