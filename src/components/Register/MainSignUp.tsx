import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail } from "../../apis/user.api";
import { EmailForm } from "../../types/user.type";
import { emailSchema } from "../../schemas/userSchema";
import { FaRegEnvelope } from "react-icons/fa6";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

const MainSignUp = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [isEmailValid, setIsEmailValid] = useState(false);

  const { mutate, isLoading } = useMutation(findUserByEmail, {
    onSuccess: () => {
      message.error("This email address is already registered. Please log in");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        localStorage.setItem("email", form.getFieldValue("email"));
        navigate("/signup/occupation");
      } else {
        message.error("An error occurred while checking the email address");
      }
    },
  });

  const onSubmit = (data: EmailForm) => {
    mutate(data.email);
  };

  return (
    <div className="w-3/5 max-md:w-full py-4 px-8">
      <h1 className="font-medium text-2xl">Welcome to Shim</h1>
      <h1 className="text-gray-600 text-xl">
        Create a free account in 2 steps
      </h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        className="pb-4 mt-4"
        onValuesChange={(_, allValues) => {
          const { email } = allValues;
          if (email) {
            setIsEmailValid(true);
          } else {
            setIsEmailValid(false);
          }
        }}
      >
        <Form.Item<EmailForm>
          label="Email"
          name={"email"}
          className=""
          rules={emailSchema}
        >
          <Input
            prefix={<FaRegEnvelope />}
            className="w-full bg-gray-100 max-md:bg-white py-2"
            type="text"
            name="email"
            id="email"
            placeholder="name@example.com"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={isLoading}
          disabled={!isEmailValid}
          className={`w-full py-5 rounded-md`}
        >
          Continue
        </Button>
      </Form>
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
