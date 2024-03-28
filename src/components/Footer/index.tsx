import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import '@umijs/max';
import React from "react";

const Footer: React.FC = () => {
  const defaultMessage = '牛至集团体验技术部出品';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'API接口',
          title: 'API接口',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: '',
          blankTarget: true,
        },
        {
          key: 'API接口',
          title: 'API接口',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
