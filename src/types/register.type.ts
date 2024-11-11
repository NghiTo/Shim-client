export type EmailForm = {
  email: string;
};

export type RegisterForm = {
  title: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  role?: string;
  password: string;
};
