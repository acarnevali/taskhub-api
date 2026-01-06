export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
}