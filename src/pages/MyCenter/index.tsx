import {PageContainer} from '@ant-design/pro-components';
import {useEffect, useRef, useState} from "react";
import React from 'react';
import {Avatar, Button, Card, Col, message, Row, Tooltip} from 'antd';
import {getLoginUserUsingGET, updateUserKeyUsingPOST, UserSignUsingPOST} from "@/services/yuapi-backend/userController";
import {CX, CXYY} from "@/constants";

/**
 * 个人中心
 * @constructor
 */
const Index: React.FC = () => {
  const [showKeys, setShowKeys] = useState(false); // 状态用于控制是否显示公钥和私钥
  const [userInfo, setData] = useState<API.UserVO>();
  const videoPath = "/static/chouxiang.mp4"

  const userData = async () => {
    const res = await getLoginUserUsingGET();
    setData(res.data);
  }

  const updateKey = async () => {
    // @ts-ignore
    const res = await updateUserKeyUsingPOST({id: userInfo.id, userAccount: userInfo.userAccount});
    if (res.code === 0) {
      message.success("更换成功")
      userData();
    } else {
      message.error(res.message);
    }
  }

  const sign = async () => {
    try {
      const res = await UserSignUsingPOST({id: userInfo.id, userAccount: userInfo.userAccount});
      if (res.code === 0) {
        message.success("签到成功")
        userData();
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  // 点击“查看”按钮时触发的函数
  const handleViewKeys = () => {
    setShowKeys(true); // 设置 showKeys 状态为 true，以显示公钥和私钥
    setTimeout(() => {
      setShowKeys(false); // 五秒后设置 showKeys 状态为 false，隐藏公钥和私钥
    }, 5000);
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <PageContainer title="个人中心">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card style={{width: 600}}>
            <div className="container">
              <div className="cardContainer">
                <div className="avatarWrapper">
                  <Avatar size={200} src={userInfo?.userAvatar || "https://example.com/avatar.jpg"} className="avatar"/>
                </div>
                <div className="content">
                  <div className="titleWrapper">
                    <span className="title">用户信息</span>
                  </div>
                  <div className="description">
                    <div className="item">
                      <span className="icon">👤</span>
                      <span>昵称: {userInfo?.userName || '用户昵称'}</span>
                    </div>
                    <div className="item">
                      <span className="icon">🆔</span>
                      <span>账号: {userInfo?.userAccount || '用户账号'}</span>
                    </div>
                    <div className="item">
                      <span className="icon">🎭</span>
                      <span>角色: {userInfo?.userRole || '用户角色'}</span>
                    </div>
                    <div className="item">
                      <span className="icon">🌟</span>
                      <span>积分: {userInfo?.leftNum || '100'}</span>
                    </div>
                    {/* 用户信息内容 */}
                    <div className="item">
                      <span className="icon">🔑</span>
                      <span>公钥: {showKeys ? userInfo?.accessKey || '牛至' : '******'}</span> {/* 当 showKeys 为 true 时显示公钥 */}
                    </div>
                    <div className="item">
                      <span className="icon">🔑</span>
                      <span>私钥: {showKeys ? userInfo?.secretKey || '牛至' : '******'}</span> {/* 当 showKeys 为 true 时显示私钥 */}
                    </div>
                  </div>
                  <Tooltip title="五秒后自动隐藏">
                    <Button type="primary" style={{right: 10}}
                            onClick={handleViewKeys}>查看公/私钥</Button> {/* 点击按钮触发 handleViewKeys 函数 */}
                  </Tooltip>
                  <div className="actions">
                    <Tooltip title="更换密钥">
                      <Button type="primary" style={{right: 10, top: 10}} icon={<span className="icon">🔑</span>}
                              onClick={updateKey}>点击更换密钥</Button>
                    </Tooltip>
                    <Tooltip title="签到">
                      <Button type="primary" style={{top: 10}} icon={<span className="icon">✨</span>}
                              onClick={sign}>点击签到</Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          {/*muted={false}自动播放声音*/}
          <video autoPlay muted={false} controls loop playsInline
                 style={{width: '100%', height: '466px', marginLeft: '-300px'}}>
            <source src={videoPath} type="video/mp4"/>
          </video>
          <Card style={{width: '100%', marginLeft: '-300px'}}>
            <a>{CX}</a>
          </Card>
          <Card style={{width: '100%', marginLeft: '-300px'}}>
            <a>{CXYY}</a>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Index;
