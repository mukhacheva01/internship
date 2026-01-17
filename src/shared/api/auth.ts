export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Имитация API авторизации
export const loginApi = (credentials: LoginCredentials): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        resolve({ token: 'auth-token-' + Date.now() });
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};