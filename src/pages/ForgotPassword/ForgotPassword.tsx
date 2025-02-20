import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailSchema } from "../../schemas/userSchema";
import { EmailForm } from "../../types/user.type";
import { useMutation } from "react-query";
import { forgotPassword } from "../../apis/auth.api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: yupResolver(emailSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: () => {
      toast.info("A verification email has been sent to your email");
    },
    onError: () => {
      toast.error("An error has occurred");
    },
  });

  const onSubmit: SubmitHandler<EmailForm> = (data) => {
    mutate(data.email);
  };
  return (
    <div className="min-h-screen flex relative">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt=""
        className="absolute w-1/12 top-4 left-4 max-md:w-1/5"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 m-auto p-8 max-md:w-full w-2/5 rounded-lg flex flex-col gap-4"
      >
        <h1 className="font-semibold text-2xl">Forgot your password</h1>
        <p>We will send you a verified link to reset your password</p>
        <div className="bg-[#ec0b431a] border border-[#ec0b4333] p-4 rounded-md text-gray-500 text-sm">
          Your password will be reseted. Please enter your main email for this
          account.
        </div>
        <div>
          <p>Enter your email</p>
          <input
            {...register("email")}
            type="text"
            placeholder="Start typing..."
            className="p-2 outline-none border border-gray-400 rounded-md w-full focus:border-[#fe5f5c]"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="w-full flex flex-row gap-2">
          <Button
            type="default"
            onClick={() => navigate("/login")}
            className="w-1/2 px-auto text-center p-4"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className={` w-1/2 px-auto text-center p-4`}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
