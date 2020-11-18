export type AuthPayload = {
  id: string;
  email: string;
  username: string;
  role: string;
};

export interface UserLoginInput {
  email: string;
  password: string;
}
