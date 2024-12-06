import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { passwordSchema } from "../../schemas/authSchema";
import { PasswordForm } from "../../types/auth.type";
import { useMutation } from "react-query";
import { resetPassword } from "../../apis/auth.api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm<PasswordForm>({
    resolver: yupResolver(passwordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate, isLoading } = useMutation(
    (password: string) => resetPassword(token as string, password),
    {
      onSuccess: () => {
        toast.success("Password changed successfully");
        navigate("/login");
      },
    }
  );

  const onSubmit: SubmitHandler<PasswordForm> = (data) => {
    mutate(data.password);
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
        <h1 className="font-semibold text-2xl">Create your password</h1>
        <div className="bg-[#ec0b431a] border border-[#ec0b4333] p-4 rounded-md text-gray-500 text-sm">
          Your password will be reseted. Please enter a strong password and
          different from your current password.
        </div>
        <div>
          <p>New password</p>
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
        <div className="w-full flex flex-row gap-2">
          <Button
            type="default"
            onClick={() => navigate("/login")}
            className="w-1/2 px-auto text-center p-4"
          >
            Back
          </Button>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className={` w-1/2 px-auto text-center p-4`}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
