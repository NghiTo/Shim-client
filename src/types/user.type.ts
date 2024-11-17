import { School } from "./school.type";

export type LoginForm = {
  email: string;
  password: string;
};

export type EmailForm = Omit<LoginForm, "password">;

export type RegisterForm = {
  title: string;
  grade: string;
  subject: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export type UserRegister = {
  title: string;
  grade: string;
  subject: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  email: string;
};

export type UserUpdate = {
  title?: string;
  firstName?: string;
  lastName?: string;
  subject?: string;
  schoolId?: string;
  grade?: string;
  avatarUrl?: string | ArrayBuffer;
};

export type UserState = {
  id: string;
  schoolId: string;
  avatarUrl: string;
};

export type UserResponse = {
  avatarUrl: string;
  title: string;
  firstName: string;
  lastName: string;
  role: string;
  subject: string;
  school: School;
  grade: string;
};

export type UserProfile = {
  title: string;
  firstName: string;
  lastName: string;
  grade: string;
  subject: string;
};

export type PasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UserPassword = {
  oldPassword: string;
  newPassword: string;
}
