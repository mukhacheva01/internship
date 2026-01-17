import * as React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, notification, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User, CreateUserData } from '@/shared/types/user';
import { useCreateUser, useUpdateUser } from '@/shared/hooks/use-users';

interface UserModalProps {
  visible: boolean;
  user?: User | null;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ visible, user, onClose }) => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const isEditing = !!user;
  const isLoading = createUserMutation.isPending || updateUserMutation.isPending;

  useEffect(() => {
    if (visible) {
      if (user) {
        form.setFieldsValue({
          id: user.id,
          name: user.name,
          email: user.email || '',
          avatar: user.avatar,
        });
        setAvatarUrl(user.avatar);
      } else {
        form.resetFields();
        setAvatarUrl('');
      }
    }
  }, [visible, user, form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setAvatarUrl(url);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (isEditing && user) {
        updateUserMutation.mutate({
          id: user.id,
          name: values.name,
          email: values.email,
          avatar: values.avatar,
        }, {
          onSuccess: () => {
            notification.success({
              message: 'Пользователь обновлен',
              description: 'Данные пользователя успешно обновлены',
            });
            onClose();
          },
          onError: (error) => {
            notification.error({
              message: 'Ошибка обновления',
              description: 'Не удалось обновить пользователя',
            });
          },
        });
      } else {
        createUserMutation.mutate({
          name: values.name,
          email: values.email,
          avatar: values.avatar,
        }, {
          onSuccess: () => {
            notification.success({
              message: 'Пользователь создан',
              description: 'Новый пользователь успешно создан',
            });
            onClose();
          },
          onError: (error) => {
            notification.error({
              message: 'Ошибка создания',
              description: 'Не удалось создать пользователя',
            });
          },
        });
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal
      title={isEditing ? 'Редактировать пользователя' : 'Создать пользователя'}
      open={visible}
      onCancel={handleCancel}
      closable={!isLoading}
      maskClosable={!isLoading}
      footer={[
        <Button 
          key="cancel" 
          onClick={handleCancel}
          disabled={isLoading}
        >
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          {isEditing ? 'Сохранить' : 'Создать'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        {isEditing && (
          <Form.Item
            label="ID"
            name="id"
          >
            <Input disabled />
          </Form.Item>
        )}
        
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            { required: true, message: 'Пожалуйста, введите имя!' },
            { min: 2, message: 'Имя должно содержать минимум 2 символа' },
          ]}
        >
          <Input placeholder="Введите имя пользователя" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: 'email', message: 'Введите корректный email!' },
          ]}
        >
          <Input placeholder="Введите email (необязательно)" />
        </Form.Item>

        <Form.Item
          label="Аватар (URL)"
          name="avatar"
          rules={[
            { required: true, message: 'Пожалуйста, введите URL аватара!' },
            { 
              type: 'url', 
              message: 'Введите корректную ссылку!' 
            },
            {
              pattern: /\.(jpg|jpeg|png|gif|webp)$/i,
              message: 'URL должен содержать изображение (jpg, jpeg, png, gif, webp)',
            },
          ]}
        >
          <Input 
            placeholder="https://example.com/avatar.jpg" 
            onChange={handleAvatarChange}
            addonAfter={
              <Avatar 
                src={avatarUrl} 
                icon={<UserOutlined />} 
                size="small"
              />
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};