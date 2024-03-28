import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'API接口',
  pwa: false,
  logo: 'http://175.178.221.142:8901/api/pdx.jpg',
  iconfontUrl: 'http://175.178.221.142:8901/api/pdx.jpg',
};

export default Settings;
