import { SubmitHandler, useForm } from "react-hook-form";
import { FaLock, FaTrash } from "react-icons/fa6";
import { PasswordForm, UserPassword } from "../../../types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../../schemas/userSchema";
import { useMutation } from "react-query";
import { changePassword } from "../../../apis/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { toast } from "react-toastify";
import { MdManageAccounts } from "react-icons/md";
import { sendOtp } from "../../../apis/auth.api";

const Setting = () => {
  const user = useSelector((state: RootState) => state.user);
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
    setError,
  } = useForm<PasswordForm>({
    resolver: yupResolver(passwordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate } = useMutation(
    (data: UserPassword) => changePassword(user.id, data),
    {
      onError: () => {
        setError("oldPassword", { message: "Invalid current password" });
      },
      onSuccess: () => {
        toast.success("Password changed successfully");
        reset();
      },
    }
  );

  const handleDeleteAccount = () => {
    sendOtp();
  };

  const onSubmit: SubmitHandler<PasswordForm> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newData } = data;
    mutate(newData);
  };

  return (
    <div className="h-full bg-gray-100 py-4 max-md:px-2">
      <div className="bg-white px-6 py-8 rounded-lg w-1/2 max-md:w-full mx-auto">
        <h1 className="text-3xl font-semibold text-[#424242]">Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 py-2 mt-4 border-b border-gray-400">
            <FaLock />
            <p>Password</p>
          </div>
          <div>
            <p>Old password</p>
            <input
              {...register("oldPassword")}
              type="password"
              onInput={() => {}}
              onChange={() => clearErrors("oldPassword")}
              className="border border-gray-400 p-2 w-full rounded-md"
            />
            {errors.oldPassword && (
              <span className="text-red-600 text-sm">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div>
            <p>New password {"(At least 6 characters)"}</p>
            <input
              {...register("newPassword")}
              onInput={() => {}}
              type="password"
              onChange={() => clearErrors("newPassword")}
              className="border border-gray-400 p-2 w-full rounded-md"
            />
            {errors.newPassword && (
              <span className="text-red-600 text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div>
            <p>Confirm password</p>
            <input
              {...register("confirmPassword")}
              onInput={() => {}}
              onChange={() => clearErrors("confirmPassword")}
              type="password"
              className="border border-gray-400 p-2 w-full rounded-md"
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="py-2 rounded-lg bg-gray-300 text-gray-400 hover:bg-[#fe5f5c] hover:text-white transition-all ease-in-out"
          >
            Update password
          </button>
        </form>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 py-2 mt-4 border-b border-gray-400">
            <MdManageAccounts className="text-2xl" />
            <p>Change account type</p>
          </div>
          <button className="py-2 rounded-lg bg-[#1677ff] text-white hover:bg-[#68a5fa] transition-all ease-in-out">
            Convert to student account
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 py-2 mt-4 border-b border-gray-400">
            <FaTrash />
            <p>Delete account</p>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="py-2 rounded-lg border border-[#fe5f5c] text-[#fe5f5c] hover:bg-[#fe5f5c] hover:text-white transition-all ease-in-out"
          >
            Permanently delete your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
