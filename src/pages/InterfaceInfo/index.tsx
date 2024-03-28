import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Form, message, Input, Spin, Divider, Image} from 'antd';
import moment from 'moment'
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/yuapi-backend/interfaceInfoController';
import {useParams} from '@@/exports';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [urlRes, setUrl] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      const createTime = res.data.createTime;
      const updateTime = res.data.updateTime;
      res.data.createTime = moment(createTime).format('YYYY-MM-DD HH:mm:ss');
      res.data.updateTime = moment(updateTime).format('YYYY-MM-DD HH:mm:ss');
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setUrl(null);
      setInvokeRes(res.data);
      try {
        const responseObject = JSON.parse(res.data);
        if (responseObject && responseObject.url !== null && responseObject.url !== undefined && responseObject.url !== ''){
          setUrl(responseObject.url);
          setImageLoad(true);
          console.log(responseObject.url)
        }
      } catch (error) {
      }
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  // 图片加载完成时触发的回调函数
  const handleImageLoad = () => {
    setImageLoad(false); // 图片加载完成后，设置loading为false，不再显示加载指示器
  };

  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.host + "" + data.restful}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider/>
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea/>
          </Form.Item>
          <Form.Item wrapperCol={{span: 16}}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
      <Card>
        <Spin spinning={imageLoad}>
          <Image
            width={600}
            src={urlRes}
            onLoad={handleImageLoad} // 监听图片加载完成事件
          />
        </Spin>
        {imageLoad && (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <h1>图片加载中请耐心等待</h1>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default Index;
