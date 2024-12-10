import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordSchema } from "../../schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordForm } from "../../types/auth.type";
import { useMutation } from "react-query";
import { updateUser } from "../../apis/user.api";
import { UserUpdate } from "../../types/user.type";
import { setUser } from "../../store/userSlice";

const CreatePassword = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate, isLoading } = useMutation(
    (data: UserUpdate) => updateUser(user.id, data),
    {
      onSuccess: () => {
        dispatch(setUser({ ...user, isAuthUser: false }));
        setIsModalOpen(false);
      },
    }
  );

  const onSubmit: SubmitHandler<PasswordForm> = (data) => {
    mutate({ password: data.password });
  };

  useEffect(() => {
    if (user.isAuthUser) {
      setIsModalOpen(true);
    }
  }, [user.isAuthUser]);

  return (
    <Modal
      title="Create password"
      open={isModalOpen}
      closable={false}
      onOk={handleSubmit(onSubmit)}
      okText="Save"
      cancelButtonProps={{ style: { display: "none" } }}
      confirmLoading={isLoading}
    >
      <div className="flex flex-col gap-4">
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
      </div>
    </Modal>
  );
};

export default CreatePassword;
