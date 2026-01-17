export interface User {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email?: string;
}

export interface CreateUserData {
  name: string;
  avatar: string;
  email?: string;
}

export interface UpdateUserData extends CreateUserData {
  id: string;
}