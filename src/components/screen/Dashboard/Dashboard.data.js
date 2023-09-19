import {Iconify} from 'react-native-iconify';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import {PRIMARY_COLOR} from '../../../styles/colors.global';

export const CARD_DATA = role => {
  return [
    {
      id: 1,
      title: 'Chấm công',
      category: 'Calendar',
      icon: <Iconify icon="ion:time-outline" size={35} color={PRIMARY_COLOR} />,
      router: SCREEN_NAVIGATE.TimeKeeping_Screen,
    },
    {
      id: 2,
      title: 'Nhân sự',
      category: 'Department',
      icon: (
        <Iconify
          icon="healthicons:human-resoruces-outline"
          size={35}
          color={PRIMARY_COLOR}
        />
      ),
      router: SCREEN_NAVIGATE.HR_Screen,
    },
    {
      id: 3,
      title: 'Marketing',
      category: 'Department',
      icon: <Iconify icon="nimbus:marketing" size={35} color={PRIMARY_COLOR} />,
      router: SCREEN_NAVIGATE.Marketing_Screen,
    },
    {
      id: 4,
      title: 'IT',
      category: 'Department',
      icon: <Icon name="unity" size={35} color={PRIMARY_COLOR} />,
      router: SCREEN_NAVIGATE.IT_Screen,
    },
    {
      id: 5,
      title: 'Duyệt chấm công',
      category: 'Admin',
      icon: <Icon name="calendar-check" size={35} color={PRIMARY_COLOR} />,
      router: SCREEN_NAVIGATE.Verify_TimeKeeping_Screnn,
    },
  ];
};
