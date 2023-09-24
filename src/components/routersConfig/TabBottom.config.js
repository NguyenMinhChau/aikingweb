import {SCREEN_NAVIGATE} from './General.config';
import DashboardPage from '../screen/Dashboard/Dashboard';
import InfoScreen from '../screen/Info/Info';
import SettingScreen from '../screen/Setting/Setting';
import TimeKeepingScreen from '../screen/TimeKeeping/TimeKeeping';
import PlanCP from '../screen/Plan/Plan';

const {
  Dashboard_Screen,
  Info_Screen,
  Setting_Screen,
  TimeKeeping_Screen,
  Plan_Screen,
} = SCREEN_NAVIGATE;

export const TabBottomRouterObj = {
  [Plan_Screen]: {
    screen: PlanCP,
    tabBarLabel: 'Kế hoạch',
    tabIconLabel: 'calendar',
    iconName: 'calendar-number-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
  [TimeKeeping_Screen]: {
    screen: TimeKeepingScreen,
    tabBarLabel: 'Chấm công',
    tabIconLabel: 'clock',
    iconName: 'calendar-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Dashboard_Screen]: {
    screen: DashboardPage,
    tabBarLabel: 'Dashboard',
    tabIconLabel: 'home',
    iconName: 'home-outline',
    isIconLabelCustom: true,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Info_Screen]: {
    screen: InfoScreen,
    tabBarLabel: 'Tài khoản',
    tabIconLabel: 'user',
    iconName: 'person-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Setting_Screen]: {
    screen: SettingScreen,
    tabBarLabel: 'Cài đặt',
    tabIconLabel: 'cog',
    iconName: 'settings-outline',
    isIconLabelCustom: false,
    navigationOptions: {
      headerShown: false,
    },
  },
};

export default TabBottomRouterObj;
