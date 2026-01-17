import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import { User } from '@/shared/types/user';
import dayjs from 'dayjs';

interface StatsCardProps {
  users: User[];
}

export const StatsCard: React.FC<StatsCardProps> = ({ users }) => {
  const totalUsers = users.length;
  const usersWithEmail = users.filter(user => user.email).length;
  const recentUsers = users.filter(user => 
    dayjs().diff(dayjs(user.createdAt), 'days') <= 7
  ).length;

  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Всего пользователей"
            value={totalUsers}
            prefix={<TeamOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="С указанным email"
            value={usersWithEmail}
            prefix={<UserOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Новых за неделю"
            value={recentUsers}
            prefix={<CalendarOutlined />}
          />
        </Col>
      </Row>
    </Card>
  );
};