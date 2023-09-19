import {Iconify} from 'react-native-iconify';
import {fList} from '../../../utils/array.utils';
import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import tw from '../../../styles/twrnc.global';

export const DATA_NAV_PANE = authPage => {
  if (authPage) {
    const authPageRemoveDashboarsPath = fList(Object.entries(authPage)).map(
      ([v, k]) => {
        return [v.replace('/dashboard', ''), k];
      },
    );
    const authPageGroupsMenuParent = fList(authPageRemoveDashboarsPath).reduce(
      (acc, [key, value]) => {
        const keyGroup = key.split('/')[1];
        if (!acc[keyGroup]) {
          acc[keyGroup] = [];
        }
        acc[keyGroup].push({
          mainMenu: keyGroup,
          subMenu: key,
          role: value,
        });
        return acc;
      },
      [],
    );
    const dataMenu = {...authPageGroupsMenuParent};

    const allKeyDataMenu = Object.keys(dataMenu);

    const dataMenuFinal = fList(allKeyDataMenu).map((item, index) => {
      return {
        id: index,
        label: item,
        icon: (
          <Iconify
            size={23}
            color="#000"
            icon="carbon:ibm-secure-infrastructure-on-vpc-for-regulated-industries"
            style={tw`mr-1`}
          />
        ),
        subMenuLev1: dataMenu[item].map((itemSub, indexSub) => {
          return {
            id: indexSub,
            label: itemSub.subMenu.split('/').slice(2).join('/'),
            router: itemSub.subMenu,
          };
        }),
      };
    });

    // console.log('dataMenuFinal: ', dataMenuFinal);
  }

  return [
    {
      index: 1,
      label: 'Kế hoạch',
      icon: (
        <Iconify
          size={23}
          color="#000"
          icon="grommet-icons:plan"
          style={tw`mr-1`}
        />
      ),
      subMenuLev1: [
        {
          id: 1,
          label: 'Tổng quan',
          router: SCREEN_NAVIGATE.Dashboard_Screen,
        },
      ],
    },
    {
      index: 2,
      label: 'Phòng ban',
      icon: (
        <Iconify
          size={23}
          color="#000"
          icon="mingcute:department-line"
          style={tw`mr-1`}
        />
      ),
      subMenuLev1: [
        {
          id: 1,
          label: 'Nhân sự',
          router: SCREEN_NAVIGATE.HR_Screen,
        },
        {
          id: 2,
          label: 'Marketing',
          router: SCREEN_NAVIGATE.Marketing_Screen,
        },
        {
          id: 3,
          label: 'IT',
          router: SCREEN_NAVIGATE.IT_Screen,
        },
      ],
    },
    {
      index: 3,
      label: 'Chấm công',
      icon: (
        <Iconify
          size={23}
          color="#000"
          icon="ion:time-outline"
          style={tw`mr-1`}
        />
      ),
      router: SCREEN_NAVIGATE.TimeKeeping_Screen,
    },
    {
      index: 4,
      label: 'Thông tin',
      icon: (
        <Iconify
          size={23}
          color="#000"
          icon="material-symbols:info-outline"
          style={tw`mr-1`}
        />
      ),
      router: SCREEN_NAVIGATE.Info_Screen,
    },
    {
      index: 5,
      label: 'Cài đặt',
      icon: (
        <Iconify size={23} color="#000" icon="uil:setting" style={tw`mr-1`} />
      ),
      router: SCREEN_NAVIGATE.Setting_Screen,
    },
  ];
};
