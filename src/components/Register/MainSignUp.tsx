import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail } from "../../apis/user.api";
import { EmailForm } from "../../types/user.type";
import { emailSchema } from "../../schemas/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa6";

const MainSignUp = () => {
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
      toast.error("This email address is already registered. Please log in");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        const email = watch("email");
        localStorage.setItem("email", email);
        navigate("/signup/occupation");
      } else {
        toast.error("An error occurred while checking the email address");
      }
    },
  });

  const emailValue = watch("email");
  const isEmailValid = emailValue && emailValue.length > 0;

  const onSubmit: SubmitHandler<EmailForm> = (data) => {
    mutate(data.email);
  };

  return (
    <div className="w-3/5 max-md:w-full py-4 px-8">
      <h1 className="font-medium text-2xl">Welcome to Shim</h1>
      <h1 className="text-gray-600 text-xl">
        Create a free account in 2 steps
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-4 mt-4"
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
      <div className="text-gray-400 mt-2 max-md:hidden">
        By signing up, you agree to our{" "}
        <Link to={""} className="underline">
          Terms of Service
        </Link>{" "}
        &{" "}
        <Link to={""} className="underline">
          Privacy Policy
        </Link>
      </div>
      <div className="flex flex-row mt-2 justify-center gap-2 max-md:hidden">
        <p className="py-1">Already have an account?</p>
        <Link
          to={"/login"}
          className="py-1 px-4 rounded-md bg-gray-200 text-[#fe5f5c]"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default MainSignUp;
