import { Role } from "../config/roles.js";

export interface IUser {
  firstName: string;
  lastName: string;
  number: number;
  email: string;
  password: string;
  gender?: string;
  address?: string;
  picturePath?: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
