import { UserRole } from "../entity/User";

export interface CreateUserInput {
  fName: string;
  lName: string;
  age: number;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}
