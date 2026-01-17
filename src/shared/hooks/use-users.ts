import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/users';
import { CreateUserData, UpdateUserData } from '@/shared/types/user';

const USERS_QUERY_KEY = ['users'];

export const useUsers = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: usersApi.getUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};