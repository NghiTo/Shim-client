import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { passwordSchema } from "../../schemas/authSchema";
import { PasswordForm } from "../../types/auth.type";
import { useMutation } from "react-query";
import { updateUser } from "../../apis/user.api";
import { UserUpdate } from "../../types/user.type";
import { setUser } from "../../store/userSlice";

const CreatePassword = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(
    (data: UserUpdate) => updateUser(user.id, data),
    {
      onSuccess: () => {
        dispatch(setUser({ ...user, isAuthUser: false }));
        setIsModalOpen(false);
      },
    }
  );

  const onSubmit = (data: PasswordForm) => {
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
      centered
      footer={
        <Button
          form="create-password"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Save
        </Button>
      }
      cancelButtonProps={{ style: { display: "none" } }}
      confirmLoading={isLoading}
    >
      <Form layout="vertical" onFinish={onSubmit} id="create-password">
        <Form.Item<PasswordForm>
          name={"password"}
          label="Password"
          rules={passwordSchema.password}
        >
          <Input.Password
            type="password"
            className="w-full py-2 px-3 rounded-md"
            placeholder="*******"
          />
        </Form.Item>
        <Form.Item<PasswordForm>
          label="Confirm Password"
          name={"confirmPassword"}
          rules={passwordSchema.confirmPassword}
        >
          <Input.Password
            type="password"
            className="w-full py-2 px-3 rounded-md"
            placeholder="*******"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePassword;
