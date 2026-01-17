import * as React from 'react';
import { useState } from 'react';
import { 
  Button, 
  Table, 
  Avatar, 
  Space, 
  Typography, 
  Layout, 
  Card,
  Spin,
  Alert,
  notification
} from 'antd';
import { UserOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useUsers } from '@/shared/hooks/use-users';
import { useAuth } from '@/shared/hooks/use-auth';
import { User } from '@/shared/types/user';
import { UserModal } from '@/features/user-modal';
import { StatsCard } from '@/shared/ui/stats-card';

const { Title } = Typography;
const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledContent = styled(Content)`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: #f5f5f5;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
`;

const ClickableCell = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #1890ff;
  }
`;

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: users, isLoading, error } = useUsers();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleLogout = () => {
    logout();
    notification.success({
      message: 'Выход выполнен',
      description: 'До свидания!',
    });
    navigate('/login');
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingUser(null);
  };

  const columns = [
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string, record: User) => (
        <ClickableCell onClick={() => handleEditUser(record)}>
          <Avatar 
            src={avatar} 
            icon={<UserOutlined />}
            size={40}
          />
        </ClickableCell>
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: User) => (
        <ClickableCell onClick={() => handleEditUser(record)}>
          <Typography.Text strong>{name}</Typography.Text>
        </ClickableCell>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => email || '—',
    },
    {
      title: 'Зарегистрирован',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
  ];

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <StyledContent>
        <Alert
          message="Ошибка загрузки"
          description="Не удалось загрузить список пользователей"
          type="error"
          showIcon
        />
      </StyledContent>
    );
  }

  return (
    <Layout>
      <StyledHeader>
        <Title level={3} style={{ margin: 0 }}>
          База пользователей
        </Title>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreateUser}
          >
            Создать пользователя
          </Button>
          <Button 
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Выход
          </Button>
        </Space>
      </StyledHeader>
      
      <StyledContent>
        {users && <StatsCard users={users} />}
        
        <StyledCard>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            locale={{
              emptyText: 'Пользователи не найдены',
            }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Всего пользователей: ${total}`,
            }}
          />
        </StyledCard>
      </StyledContent>

      <UserModal
        visible={modalVisible}
        user={editingUser}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};