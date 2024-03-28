import Footer from '@/components/Footer';
import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {history} from '@umijs/max';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {userRegisterUsingPOST} from "@/services/yuapi-backend/userController";
import {MY_LOGO, PLANET_LINK} from "@/constants";
import {Link} from "@@/exports";

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');

  // 表单提交
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const {userPassword, checkPassword} = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
          // 登录
          const res = await userRegisterUsingPOST(values);
          if (res.code === 0) {
            const defaultLoginSuccessMessage = '注册成功！';
            message.success(defaultLoginSuccessMessage);
            if(!history) return;
            const {query} = history.location;
            history.push({
              pathname: '/user/login',
              query,
            })
            return;
          } else {
            message.error(res.message);
          }
        } catch (error) {
          const defaultLoginFailureMessage = '登录失败，请重试！';
          console.log(error);
          message.error(defaultLoginFailureMessage);
        }
  };

  return (
    <div>
      <div>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          logo={<img alt="logo" src={MY_LOGO}/>}
          title="智能 BI"
          subTitle={<a href={PLANET_LINK} target="_blank" rel="noreferrer">最好的编程学习知识圈子</a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'}/>
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
            </>
          )}
          <Link to="/user/login">已有账号? 点击登录</Link>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
