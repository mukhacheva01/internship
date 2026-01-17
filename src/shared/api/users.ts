import { apiClient, ENDPOINTS } from './config';
import { User, CreateUserData, UpdateUserData } from '@/shared/types/user';
import { mockUsers } from './mock-data';

// Временное хранилище для демонстрации
let localUsers: User[] = [...mockUsers];
let nextId = 6;

// Функция для имитации задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const usersApi = {
  // Получить всех пользователей
  getUsers: async (): Promise<User[]> => {
    await delay(500); // Имитация задержки сети
    
    // Попробуем сначала реальный API
    try {
      const response = await apiClient.get<User[]>(ENDPOINTS.users);
      return response.data;
    } catch (error) {
      // Если API недоступен, используем локальные данные
      console.warn('MockAPI недоступен, используем локальные данные');
      return [...localUsers];
    }
  },

  // Создать пользователя
  createUser: async (userData: CreateUserData): Promise<User> => {
    await delay(500);
    
    try {
      const response = await apiClient.post<User>(ENDPOINTS.users, userData);
      return response.data;
    } catch (error) {
      // Локальная реализация
      const newUser: User = {
        id: nextId.toString(),
        createdAt: new Date().toISOString(),
        ...userData,
      };
      localUsers.push(newUser);
      nextId++;
      return newUser;
    }
  },

  // Обновить пользователя
  updateUser: async (userData: UpdateUserData): Promise<User> => {
    await delay(500);
    
    try {
      const response = await apiClient.put<User>(`${ENDPOINTS.users}/${userData.id}`, userData);
      return response.data;
    } catch (error) {
      // Локальная реализация
      const index = localUsers.findIndex(user => user.id === userData.id);
      if (index !== -1) {
        localUsers[index] = { ...localUsers[index], ...userData };
        return localUsers[index];
      }
      throw new Error('Пользователь не найден');
    }
  },

  // Удалить пользователя
  deleteUser: async (id: string): Promise<void> => {
    await delay(500);
    
    try {
      await apiClient.delete(`${ENDPOINTS.users}/${id}`);
    } catch (error) {
      // Локальная реализация
      const index = localUsers.findIndex(user => user.id === id);
      if (index !== -1) {
        localUsers.splice(index, 1);
      }
    }
  },
};