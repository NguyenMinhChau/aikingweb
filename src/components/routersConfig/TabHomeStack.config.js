import {SCREEN_NAVIGATE} from './General.config';
import Banner from '../screen/Banner/Banner';
import Login from '../screen/Login/Login';
import NavPane from '../screen/NavPane/NavPane';
import AppearanceScreen from '../screen/Setting/Appearance';
import TabBottomCP from '../routersRender/TabBottomCP';
import TabBottomRouterObj from './TabBottom.config';
import LoaderSliderCP from '../LoaderApp/LoaderSlider';
import HRScreen from '../screen/Department/HR/HR';
import MarketingScreen from '../screen/Department/Marketing/Marketing';
import ITScreen from '../screen/Department/IT/IT';
import CalculatorSalaryScreen from '../screen/Department/GeneralComponent/CalculatorSalary';
import SalaryDetailScreen from '../screen/Department/GeneralComponent/SalaryDetail';
import VerifyTimeKeepingScreen from '../screen/Admin/VerifyTimeKeeping/VerifyTimeKeeping';
import PlanDetailScreen from '../screen/Plan/PlanDetail';

const {
  Login_Screen,
  NavPane_Screen,
  Banner_Screen,
  Appearance_Screen,
  HR_Screen,
  Marketing_Screen,
  IT_Screen,
  Calculator_Screen,
  Salary_Detail_Screen,
  Verify_TimeKeeping_Screnn,
  Plan_Detail_Screen,
  Bottom_Tab_Screen,
  LoaderSliderCP_Screen,
} = SCREEN_NAVIGATE;

export const TabHomeStackRouterObj = {
  ...TabBottomRouterObj,
  [Login_Screen]: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  [NavPane_Screen]: {
    screen: NavPane,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Banner_Screen]: {
    screen: Banner,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Appearance_Screen]: {
    screen: AppearanceScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [HR_Screen]: {
    screen: HRScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Marketing_Screen]: {
    screen: MarketingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [IT_Screen]: {
    screen: ITScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Calculator_Screen]: {
    screen: CalculatorSalaryScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Salary_Detail_Screen]: {
    screen: SalaryDetailScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Verify_TimeKeeping_Screnn]: {
    screen: VerifyTimeKeepingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Plan_Detail_Screen]: {
    screen: PlanDetailScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  [LoaderSliderCP_Screen]: {
    screen: LoaderSliderCP,
    navigationOptions: {
      headerShown: false,
    },
  },
  [Bottom_Tab_Screen]: {
    screen: TabBottomCP,
    navigationOptions: {
      headerShown: false,
    },
  },
};

export default TabHomeStackRouterObj;
