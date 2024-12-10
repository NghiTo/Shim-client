import * as Yup from "yup";

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const registerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  grade: Yup.string().required("Grade is required"),
  subject: Yup.string().required("Subject is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters!")
    .required("Please enter a password!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Please confirm your password"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters!")
    .required("Please enter a password!"),
});

export const updateSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  grade: Yup.string().required("Grade is required"),
  subject: Yup.string().required("Subject is required"),
});

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

export const studentRegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  grade: Yup.string().required("Grade is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters!")
    .required("Please enter a password!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Please confirm your password"),
});
