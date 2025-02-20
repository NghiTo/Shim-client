import { Rule } from "antd/es/form";
import * as Yup from "yup";

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "Invalid input")
    .required("OTP is required"),
});

export const passwordSchema = {
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
