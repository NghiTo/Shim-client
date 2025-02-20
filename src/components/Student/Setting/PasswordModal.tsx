import { Button, Form, Input, message, Modal } from "antd";
import React, { memo } from "react";
import { PasswordForm, UserPassword } from "../../../types/user.type";
import { passwordSchema } from "../../../schemas/userSchema";
import { useMutation } from "react-query";
import { changePassword } from "../../../apis/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useForm } from "antd/es/form/Form";
import { onError } from "../../../constants/onError";

interface PasswordModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ open, setOpen }) => {
  const user = useSelector((state: RootState) => state.user);
  const [form] = useForm();

  const { mutate, isLoading } = useMutation(
    (data: UserPassword) => changePassword(user.id, data),
    {
      onSuccess: () => {
        message.success("Password changed successfully");
        form.resetFields();
        setOpen(false);
      },
      onError: onError,
    }
  );

  const onSubmit = (data: PasswordForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newData } = data;
    mutate(newData);
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="Update password"
      footer={
        <>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            form="change-password"
          >
            Save
          </Button>
        </>
      }
    >
      <Form
        form={form}
        onFinish={onSubmit}
        id="change-password"
        layout="vertical"
      >
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
          rules={passwordSchema.newPassword}
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
      </Form>
    </Modal>
  );
};

export default memo(PasswordModal);
