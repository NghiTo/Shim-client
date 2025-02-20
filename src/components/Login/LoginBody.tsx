import React, { useState } from "react";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { LoginForm } from "../../types/user.type";
import { loginSchema } from "../../schemas/userSchema";
import { useMutation } from "react-query";
import { login } from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";

interface LoginFormProps {
  setContinueEmail: (value: boolean) => void;
}

const LoginBody: React.FC<LoginFormProps> = ({ setContinueEmail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValidForm, setIsValidForm] = useState(false);
  const [form] = useForm();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (res) => {
      dispatch(
        setUser({
          id: res.data.id,
          role: res.data.role,
          schoolId: res.data.schoolId,
          avatarUrl: res.data.avatarUrl,
          isAuthUser: false,
        })
      );
      navigate(`/${res.data.role}`);
    },
    onError: () => {
      message.error("Invalid email or password");
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutate(data);
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
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        className="flex flex-col pb-4"
        onValuesChange={(_, allValues) => {
          const { email, password } = allValues;
          if (email && password) {
            setIsValidForm(true);
          } else {
            setIsValidForm(false);
          }
        }}
      >
        <Form.Item<LoginForm>
          label="Email"
          name={"email"}
          rules={loginSchema.email}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Input
            prefix={<FaRegEnvelope />}
            className="w-full bg-gray-100 max-md:bg-white py-2"
            type="text"
            placeholder="name@example.com"
          />
        </Form.Item>
        <Form.Item<LoginForm>
          label="Password"
          name={"password"}
          rules={loginSchema.password}
        >
          <Input
            prefix={<GoLock />}
            className="w-full bg-gray-100 max-md:bg-white py-2"
            type="password"
            placeholder="*******"
          />
        </Form.Item>
        <Button
          disabled={!isValidForm}
          loading={isLoading}
          htmlType="submit"
          className={`w-full py-4 hover:text-white rounded-md ${
            isValidForm
              ? "bg-[#fe5f5c] text-white"
              : "bg-gray-300 text-gray-400"
          }`}
        >
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default LoginBody;
