import { Rule } from "antd/es/form";
import * as Yup from "yup";

export const emailSchema: Rule[] = [
  { required: true, message: "Email is required" },
  { type: "email", message: "Invalid email address" },
];

export const teacherRegisterSchema = {
  title: [{ required: true, message: "Title is required" }],
  grade: [{ required: true, message: "Grade is required" }],
  subject: [{ required: true, message: "Subject is required" }],
  firstName: [{ required: true, message: "First name is required" }],
  lastName: [{ required: true, message: "Last name is required" }],
  password: [
    {
      required: true,
      message: "Please enter a password!",
    },
    {
      min: 6,
      message: "Password must have at least 6 characters!",
    },
  ],
  confirmPassword: [
    {
      required: true,
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Password do not match!"));
      },
    }),
  ] as Rule[],
};

export const loginSchema = {
  email: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Invalid email address" },
  ] as Rule[],
  password: [
    {
      required: true,
      message: "Please enter a password!",
    },
    {
      min: 6,
      message: "Password must have at least 6 characters!",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Please confirm your password",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Password do not match!"));
      },
    }),
  ] as Rule[],
};

export const updateSchema = {
  title: [{ required: true, message: "Title is required" }],
  grade: [{ required: true, message: "Grade is required" }],
  subject: [{ required: true, message: "Subject is required" }],
  firstName: [{ required: true, message: "First name is required" }],
  lastName: [{ required: true, message: "Last name is required" }],
};

export const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Please enter your current password")
    .min(6, "Password must have at least 6 characters!"),
  newPassword: Yup.string()
    .required("Please enter a new password!")
    .min(6, "Password must have at least 6 characters!")
    .test(
      "not-same-as-old-password",
      "New password cannot be the same as the old password",
      function (value) {
        const { oldPassword } = this.parent;
        return value !== oldPassword;
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Password must match")
    .required("Please confirm your new password"),
});

export const studentRegisterSchema = {
  grade: [{ required: true, message: "Grade is required" }],
  firstName: [{ required: true, message: "First name is required" }],
  lastName: [{ required: true, message: "Last name is required" }],
  password: [
    {
      required: true,
      message: "Please enter a password!",
    },
    {
      min: 6,
      message: "Password must have at least 6 characters!",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Please confirm your password",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Password do not match!"));
      },
    }),
  ] as Rule[],
};
