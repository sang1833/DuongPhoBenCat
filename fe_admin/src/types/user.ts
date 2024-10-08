export interface IUser {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  createdDate: string;
  updatedDate: string;
}

export interface IUserList {
  users: IUser[];
  totalPages?: number;
}
