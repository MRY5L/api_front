import {LogoutOutlined} from '@ant-design/icons';
import {history, useModel} from '@umijs/max';
import {Avatar, Menu, Spin} from 'antd';
import type {ItemType} from 'antd/es/menu/hooks/useItems';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback, useEffect, useRef} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {userLogoutUsingPOST} from "@/services/yuapi-backend/userController";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu}) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const {initialState, setInitialState} = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({...s, loginUser: undefined}));
        });
        userLogoutUsingPOST();
        const {search, pathname} = window.location;
        const redirect = pathname + search;
        history.replace('/user/login', {redirect})
        window.location.reload();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const {loginUser} = initialState;

  if (!loginUser || !loginUser.userName) {
    return loading;
  }

  const menuItems: ItemType[] = [
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems}/>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.userAvatar} src={loginUser.userAvatar} alt="userAvatar"/>
        <span className={`${styles.userName} anticon`}>{loginUser.userName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
