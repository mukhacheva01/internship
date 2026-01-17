import * as React from 'react';
import { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginApi, LoginCredentials } from '@/shared/api/auth';
import { useAuth } from '@/shared/hooks/use-auth';

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 24px !important;
`;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [form] = Form.useForm();

  // Если пользователь уже авторизован, перенаправляем на страницу пользователей
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.token);
      notification.success({
        message: 'Успешная авторизация',
        description: 'Добро пожаловать в систему!',
      });
      navigate('/users', { replace: true });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка авторизации',
        description: error.message,
      });
    },
  });

  const handleSubmit = (values: LoginCredentials) => {
    loginMutation.mutate(values);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <StyledTitle level={2}>Вход в систему</StyledTitle>
        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Пожалуйста, введите логин!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Логин"
              disabled={loginMutation.isPending}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              disabled={loginMutation.isPending}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isPending}
              block
            >
              {loginMutation.isPending ? 'Вход...' : 'Войти'}
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: 'center', marginTop: 16, color: '#666' }}>
          <small>Логин: admin, Пароль: admin</small>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};