import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { emailSchema } from "../../schemas/userSchema";
import { EmailForm } from "../../types/user.type";
import { useMutation } from "react-query";
import { forgotPassword } from "../../apis/auth.api";
import { onError } from "../../constants/onError";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: () => {
      message.info("A verification email has been sent to your email");
    },
    onError: onError,
  });

  return (
    <div className="min-h-screen flex relative">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt=""
        className="absolute w-1/12 top-4 left-4 max-md:w-1/5"
      />
      <Form
        layout="vertical"
        onFinish={(data: EmailForm) => mutate(data.email)}
        className="bg-gray-100 m-auto p-8 max-md:w-full w-2/5 rounded-lg flex flex-col gap-4"
      >
        <h1 className="font-semibold text-2xl">Forgot your password</h1>
        <p>We will send you a verified link to reset your password</p>
        <div className="bg-[#ec0b431a] border border-[#ec0b4333] p-4 rounded-md text-gray-500 text-sm">
          Your password will be reseted. Please enter your main email for this
          account.
        </div>
        <Form.Item label="Enter your email" name={"email"} rules={emailSchema}>
          <Input
            type="text"
            placeholder="Start typing..."
            className="p-2 w-full"
          />
        </Form.Item>
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
      </Form>
    </div>
  );
};

export default ForgotPassword;
