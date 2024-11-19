import * as Yup from "yup";

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "Invalid input")
    .required("OTP is required"),
});
