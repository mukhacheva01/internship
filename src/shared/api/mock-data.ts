import { User } from '@/shared/types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    createdAt: '2024-01-15T10:30:00.000Z',
    name: 'Анна Иванова',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'anna.ivanova@example.com',
  },
  {
    id: '2',
    createdAt: '2024-01-10T14:20:00.000Z',
    name: 'Петр Петров',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'petr.petrov@example.com',
  },
  {
    id: '3',
    createdAt: '2024-01-05T09:15:00.000Z',
    name: 'Мария Сидорова',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: 'maria.sidorova@example.com',
  },
  {
    id: '4',
    createdAt: '2024-01-01T16:45:00.000Z',
    name: 'Алексей Козлов',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    email: 'alexey.kozlov@example.com',
  },
  {
    id: '5',
    createdAt: '2023-12-28T11:30:00.000Z',
    name: 'Елена Новикова',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    email: 'elena.novikova@example.com',
  },
];