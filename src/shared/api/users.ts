import { apiClient, ENDPOINTS } from './config';
import { User, CreateUserData, UpdateUserData } from '@/shared/types/user';

export const usersApi = {
  // Получить всех пользователей
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>(ENDPOINTS.users);
    return response.data;
  },

  // Создать пользователя
  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await apiClient.post<User>(ENDPOINTS.users, userData);
    return response.data;
  },

  // Обновить пользователя
  updateUser: async (userData: UpdateUserData): Promise<User> => {
    const response = await apiClient.put<User>(`${ENDPOINTS.users}/${userData.id}`, userData);
    return response.data;
  },

  // Удалить пользователя
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.users}/${id}`);
  },
};