import { Button, Form, Input, Select } from "antd";
import { teacherRegisterSchema } from "../../schemas/userSchema";
import { useMutation } from "react-query";
import { createUser } from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { TeacherRegisterForm } from "../../types/user.type";
import {
  gradeOptions,
  subjectOptions,
  titleOptions,
} from "../../constants/constants";
import { useState } from "react";

const TeacherRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      navigate("/teacher");
    },
  });

  const onSubmit = (data: TeacherRegisterForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;
    const email = localStorage.getItem("email") as string;
    create({ ...userData, role: "teacher", email });
  };

  return (
    <div className="bg-gray-100 w-1/3 min-h-full mx-auto rounded-lg flex flex-col gap-4 max-md:w-full p-8">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-center text-2xl font-semibold">
          Provide your account details
        </h1>
        <p>Signing up as teacher</p>
      </div>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        onValuesChange={(_, allValues) => {
          const requiredFields = [
            "grade",
            "title",
            "subject",
            "firstName",
            "lastName",
            "confirmPassword",
            "password",
          ];
          setIsFormFilled(
            requiredFields.every(
              (field) => allValues[field as keyof TeacherRegisterForm]
            )
          );
        }}
      >
        <div className="flex flex-row w-full gap-4">
          <Form.Item<TeacherRegisterForm>
            label="Title"
            name={"title"}
            className="w-1/4"
            rules={teacherRegisterSchema.title}
          >
            <Select className="w-full" options={titleOptions}></Select>
          </Form.Item>
          <Form.Item<TeacherRegisterForm>
            label="Grade"
            name={"grade"}
            className="w-1/4"
            rules={teacherRegisterSchema.grade}
          >
            <Select className="w-full" options={gradeOptions}></Select>
          </Form.Item>
          <Form.Item<TeacherRegisterForm>
            label="Subject"
            name={"subject"}
            className="w-1/2"
            rules={teacherRegisterSchema.subject}
          >
            <Select className="w-full" options={subjectOptions}></Select>
          </Form.Item>
        </div>
        <Form.Item<TeacherRegisterForm>
          label="First name"
          name={"firstName"}
          rules={teacherRegisterSchema.firstName}
        >
          <Input
            type="text"
            className="w-full py-2 px-3 rounded-md border border-gray-500 outline-none"
            placeholder="Enter your first name"
          />
        </Form.Item>
        <Form.Item<TeacherRegisterForm>
          label="Last name"
          name={"lastName"}
          rules={teacherRegisterSchema.lastName}
        >
          <input
            type="text"
            className="w-full py-2 px-3 rounded-md border border-gray-500 outline-none"
            placeholder="nek"
          />
        </Form.Item>
        <Form.Item<TeacherRegisterForm>
          name={"password"}
          label="Password"
          rules={teacherRegisterSchema.password}
        >
          <Input.Password
            type="password"
            className="w-full py-2 px-3 rounded-md"
            placeholder="*******"
          />
        </Form.Item>
        <Form.Item<TeacherRegisterForm>
          label="Confirm Password"
          name={"confirmPassword"}
          rules={teacherRegisterSchema.confirmPassword}
        >
          <Input.Password
            type="password"
            className="w-full py-2 px-3 rounded-md"
            placeholder="*******"
          />
        </Form.Item>
        <Button htmlType="submit" type="primary" disabled={!isFormFilled}>
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default TeacherRegister;
