import { FaLock, FaTrash } from "react-icons/fa6";
import { PasswordForm, UserPassword } from "../../../types/user.type";
import { passwordSchema } from "../../../schemas/userSchema";
import { useMutation } from "react-query";
import { changePassword } from "../../../apis/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MdManageAccounts } from "react-icons/md";
import { sendOtp } from "../../../apis/auth.api";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { onError } from "../../../constants/onError";

const Setting = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [isFillForm, setIsFillForm] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const { mutate } = useMutation(
    (data: UserPassword) => changePassword(user.id, data),
    {
      onError: onError,
      onSuccess: () => {
        message.success("Password changed successfully");
        form.resetFields();
      },
    }
  );

  const { mutate: send, isLoading } = useMutation(sendOtp, {
    onSuccess: () => {
      navigate("/delete-account");
      message.info("An OTP has been sent to your email");
    },
    onError: onError,
  });

  const onSubmit = (data: PasswordForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newData } = data;
    mutate(newData);
  };

  return (
    <div className="h-full bg-gray-100 py-4 max-md:px-2">
      <div className="bg-white px-6 py-8 rounded-lg w-1/2 max-md:w-full mx-auto">
        <h1 className="text-3xl font-semibold text-[#424242]">Settings</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onValuesChange={(_, allValues) => {
            const requiredFields = [
              "oldPassword",
              "confirmPassword",
              "password",
            ];
            setIsFillForm(
              requiredFields.every(
                (field) => allValues[field as keyof PasswordForm]
              )
            );
          }}
        >
          <div className="flex flex-row items-center text-base gap-2 py-2 my-4 border-b border-gray-400">
            <FaLock />
            <p>Password</p>
          </div>
          <Form.Item<PasswordForm>
            label="Old password"
            name={"oldPassword"}
            rules={passwordSchema.oldPassword}
          >
            <Input.Password
              type="password"
              className="w-full py-2"
              placeholder="Enter your current password"
            />
          </Form.Item>
          <Form.Item<PasswordForm>
            label="New password"
            name={"newPassword"}
            rules={passwordSchema.password}
          >
            <Input.Password
              type="password"
              className="w-full py-2"
              placeholder="Enter new password"
            />
          </Form.Item>
          <Form.Item<PasswordForm>
            label="Confirm new password"
            name={"confirmPassword"}
            rules={passwordSchema.confirmPassword}
          >
            <Input.Password
              type="password"
              className="w-full py-2"
              placeholder="Confirm your new password"
            />
          </Form.Item>
          <button
            type="submit"
            disabled={!isFillForm}
            className={` w-full py-2 rounded-lg ${
              isFillForm
                ? "bg-[#fe5f5c] text-white"
                : "bg-gray-300 text-gray-400"
            }   transition-all ease-in-out`}
          >
            Update password
          </button>
        </Form>
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
          <Button
            onClick={() => send()}
            loading={isLoading}
            className="py-4 border text-base border-[#fe5f5c] text-[#fe5f5c] hover:bg-[#fe5f5c] hover:text-white transition-all ease-in-out"
          >
            Permanently delete your account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
