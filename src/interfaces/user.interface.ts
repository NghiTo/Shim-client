import { School } from "./school.interface";

export interface User {
  id?: string | null;
  email?: string | null;
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | ArrayBuffer | null;
  role?: string | null;
  schoolId?: string | null;
  subject?: string | null;
  grade?: string | null;
}

export interface UserResponse extends User {
  school: School;
}
