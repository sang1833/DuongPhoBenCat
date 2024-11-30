export interface IUser {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  lastActive: string;
  createdDate: string;
  updatedDate: string;
}

export interface IUserList {
  users: IUser[];
  totalPages?: number;
}

export interface UserData {
  username: string;
  email: string;
  role: string;
  token: string;
  refreshToken: string;
}
