import { Modal } from "antd";
import React, { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordForm, UserPassword } from "../../../types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../../schemas/userSchema";
import { useMutation } from "react-query";
import { changePassword } from "../../../apis/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { toast } from "react-toastify";

interface PasswordModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ open, setOpen }) => {
  const user = useSelector((state: RootState) => state.user);
  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: yupResolver(passwordSchema),
  });

  const { mutate, isLoading } = useMutation(
    (data: UserPassword) => changePassword(user.id, data),
    {
      onSuccess: () => {
        toast.success("Password changed successfully");
        reset();
        setOpen(false);
      },
      onError: () => {
        setError("oldPassword", { message: "Current password is incorrect" });
      },
    }
  );

  const onSubmit: SubmitHandler<PasswordForm> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newData } = data;
    mutate(newData);
  };
  return (
    <Modal
      open={open}
      onOk={handleSubmit(onSubmit)}
      onCancel={() => setOpen(false)}
      title="Update password"
      confirmLoading={isLoading}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p>Current password</p>
          <input
            {...register("oldPassword", {
              onChange: () => clearErrors("oldPassword"),
            })}
            type="password"
            placeholder="Current password"
            className="outline-none border border-gray-400 rounded-lg p-2 w-full"
          />
          {errors.oldPassword && (
            <span className="text-red-600 text-sm">
              {errors.oldPassword.message}
            </span>
          )}
        </div>
        <div>
          <p>New password</p>
          <input
            {...register("newPassword", {
              onChange: () => clearErrors("newPassword"),
            })}
            type="password"
            placeholder="New password"
            className="outline-none border border-gray-400 rounded-lg p-2 w-full"
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
            type="password"
            {...register("confirmPassword", {
              onChange: () => clearErrors("confirmPassword"),
            })}
            placeholder="Confirm password"
            className="outline-none border border-gray-400 rounded-lg p-2 w-full"
          />
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default memo(PasswordModal);
