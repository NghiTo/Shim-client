import * as Yup from "yup";

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "Invalid input")
    .required("OTP is required"),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must have at least 6 characters!")
    .required("Please enter a password!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
