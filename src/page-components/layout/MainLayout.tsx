import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { Layout, Menu, Button, message, Input, Form, Cascader, Select } from 'antd';
import { HtmlMeta } from '@/components/HtmlMeta/HtmlMeta';
import { useAuth } from '@/page-components/auth/authContext';
import {
  removeUserCookies,
  aes,
  isNoLoginPage,
  setAuth,
} from '@/utils';
import authRouter from '@/utils/authRoute'
import styles from './styles/mainLayout.module.less'
import BackstageLayout from './BackstageLayout';

const { Header, Content } = Layout;

export interface IProps {
  children: React.ReactNode;
  disableHeader?: boolean;
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

const Child: React.FC<IProps> = props => {
  const router = useRouter();
  const { user, clearUserInfo } = useAuth();
  const [selectMenu, setSelectMenu] = useState('');
  const { pathname } = router;

  // 变化选中的菜单
  useEffect(() => {
    setSelectMenu(pathname);
  }, [pathname]);

  const logout = () => {
    message.success('已退出', 1, () => {
      removeUserCookies();
      router.push('/login').then(() => {
        clearUserInfo();
      });
    });
  };

  const login = () => {
    router.push('/login');
  };

  // fullscreen layout
  if (pathname.startsWith('/login') || pathname.startsWith('/register') || ['/404', '/403'].includes(pathname)) {
    return (
      <Layout className="layout" style={{ height: '100vh' }}>
        <HtmlMeta title="管理平台" />
        <Content style={{ height: '100vh' }}>{props.children}</Content>
      </Layout>
    );
  }

  // 后台 layout
  return <BackstageLayout logout={logout}>{props.children}</BackstageLayout>;
};

// 用ant design的layout
export const MainLayout: React.FC<IProps> = props => {
  const [showChild, setShowChild] = React.useState(false);

  useEffect(() => {
    setShowChild(true);
  }, [])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Child {...props} />;
};
