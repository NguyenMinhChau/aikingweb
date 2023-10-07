import {Platform} from 'react-native';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import PRIVACY_POLICY from '../../../assets/www/privacy_policy.html';

export const DATA_SETTING_CONFIG = [
  {
    label: 'Giao diện',
    iconName: 'phone-portrait-outline',
    router: SCREEN_NAVIGATE.Appearance_Screen,
  },
  {
    label: 'Thông tin ứng dụng',
    iconName: 'information-circle-outline',
    router: SCREEN_NAVIGATE.AppInfo_Screen,
    noneBorderBottom: true,
  },
];

export const DATA_SETTING_APP_INFO_CONFIG = [
  {
    label: 'Điều khoản sử dụng',
    iconName: 'information-circle-outline',
    sourceHTML:
      Platform.OS === 'android'
        ? {uri: 'file:///android_asset/www/privacy_policy.html'}
        : PRIVACY_POLICY,
  },
  {
    label: 'Hướng dẫn tính năng',
    iconName: 'receipt-outline',
    urlWeb: '',
  },
  {
    label: 'Câu hỏi thường gặp',
    iconName: 'help-circle-outline',
    urlWeb: '',
    noneBorderBottom: true,
  },
];
