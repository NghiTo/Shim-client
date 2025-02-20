import { Button, Form, Input, Select } from "antd";
import { StudentRegisterForm } from "../../types/user.type";
import { studentRegisterSchema } from "../../schemas/userSchema";
import { useMutation } from "react-query";
import { createUser } from "../../apis/user.api";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { gradeOptions } from "../../constants/constants";

const StudentRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isFormFilled, setIsFormFilled] = useState(false);

  const { mutate: create } = useMutation(createUser, {
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
      localStorage.removeItem("email");
      navigate("/student");
    },
  });

  const onSubmit = (data: StudentRegisterForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    const email = localStorage.getItem("email") as string;
    create({ ...userData, role: "student", email });
  };

  return (
    <div className="bg-gray-100 w-1/3 min-h-full mx-auto rounded-lg flex flex-col gap-8 max-md:w-full p-8">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-center text-2xl font-semibold">
          Provide your account details
        </h1>
        <p>Signing up as student</p>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        onValuesChange={(_, allValues) => {
          const { grade, firstName, lastName, confirmPassword, password } =
            allValues;
          if (grade && firstName && lastName && confirmPassword && password) {
            setIsFormFilled(true);
          } else {
            setIsFormFilled(false);
          }
        }}
      >
        <Form.Item<StudentRegisterForm>
          label="Grade"
          name={"grade"}
          className="w-1/4"
          rules={studentRegisterSchema.grade}
        >
          <Select className="w-full" options={gradeOptions}></Select>
        </Form.Item>
        <Form.Item<StudentRegisterForm>
          name="firstName"
          label="First name"
          rules={studentRegisterSchema.firstName}
        >
          <Input
            type="text"
            className="w-full py-2 px-3 rounded-md"
            placeholder="Enter your first name"
          />
        </Form.Item>
        <Form.Item<StudentRegisterForm>
          label="Last name"
          name={"lastName"}
          rules={studentRegisterSchema.lastName}
        >
          <Input
            type="text"
            className="w-full py-2 px-3 rounded-md"
            placeholder="Enter your last name"
          />
        </Form.Item>
        <Form.Item<StudentRegisterForm>
          name={"password"}
          label="Password"
          rules={studentRegisterSchema.password}
        >
          <Input.Password
            type="password"
            className="w-full py-2 px-3 rounded-md"
            placeholder="*******"
          />
        </Form.Item>
        <Form.Item<StudentRegisterForm>
          label="Confirm Password"
          name={"confirmPassword"}
          rules={studentRegisterSchema.confirmPassword}
        >
          <Input.Password
            type="password"
            className="w-full py-2 px-3 rounded-md"
            placeholder="*******"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="w-full py-4"
          disabled={!isFormFilled}
        >
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default StudentRegister;
