import {Iconify} from 'react-native-iconify';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import {PRIMARY_COLOR} from '../../../styles/colors.global';
import {IconCP} from '../../../utils/icon.utils';

export const CARD_DATA = role => {
  return [
    {
      id: 1,
      title: 'Chấm công',
      category: 'Calendar',
      iconName: 'calendar-outline',
      router: SCREEN_NAVIGATE.TimeKeeping_Screen,
    },
    {
      id: 2,
      title: 'Nhân sự',
      group: 'NHAN_SU',
      category: 'Department',
      iconName: 'people-outline',
      router: SCREEN_NAVIGATE.HR_Screen,
    },
    {
      id: 3,
      title: 'Marketing',
      group: 'MARKETING',
      category: 'Department',
      iconName: 'megaphone-outline',
      router: SCREEN_NAVIGATE.Marketing_Screen,
    },
    {
      id: 4,
      title: 'IT',
      group: 'IT',
      category: 'Department',
      iconName: 'code-slash-outline',
      router: SCREEN_NAVIGATE.IT_Screen,
    },
    ...(role === 'admin'
      ? [
          {
            id: 5,
            title: 'Duyệt chấm công',
            category: 'Admin',
            iconName: 'checkmark-done-circle-outline',
            router: SCREEN_NAVIGATE.Verify_TimeKeeping_Screnn,
          },
          {
            id: 6,
            title: 'Danh sách nhân viên',
            category: 'Admin',
            iconName: 'person-add-outline',
            router: SCREEN_NAVIGATE.Employee_List_Screen,
          },
          {
            id: 7,
            title: 'Push notification',
            category: 'Admin',
            iconName: 'megaphone-outline',
          },
        ]
      : []),
  ];
};
