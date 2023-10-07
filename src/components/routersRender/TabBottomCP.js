import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../styles/colors.global';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from '../../styles/twrnc.global';
import useAppContext from '../../utils/hooks/useAppContext';
import TabBottomRouterObj from '../routersConfig/TabBottom.config';
import {IconCP} from '../../utils/icon.utils';

const Tab = createBottomTabNavigator();

function IconTabLabel({color, name, size = 20, isCustom = false, typeIcon}) {
  return (
    <>
      {isCustom ? (
        <View
          style={tw.style(
            `w-[45px] h-[45px] rounded-full border-[2px] border-[${PRIMARY_COLOR}] items-center justify-center`,
          )}>
          <IconCP name={name} size={size} color={color} typeIcon={typeIcon} />
        </View>
      ) : (
        <IconCP name={name} size={size} color={color} typeIcon={typeIcon} />
      )}
    </>
  );
}

export default function TabBottomCP() {
  const {state} = useAppContext();
  const {loader_slider_used} = state.set_data;
  const {submitting} = state.set_toggle;
  return (
    <Tab.Navigator initialRouteName={SCREEN_NAVIGATE.Dashboard_Screen}>
      {Object.keys(TabBottomRouterObj).map((key, index) => {
        const {
          screen,
          navigationOptions,
          tabBarLabel,
          tabIconLabel,
          isIconLabelCustom,
          iconName,
          typeIcon,
        } = {
          ...TabBottomRouterObj[key],
        };
        return (
          <Tab.Screen
            key={index}
            name={tabBarLabel}
            component={screen}
            options={{
              ...navigationOptions,
              tabBarHideOnKeyboard: true,
              tabBarLabel: tabBarLabel,
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                display: isIconLabelCustom ? 'none' : 'flex',
              },
              tabBarVisible: false,
              tabBarActiveTintColor: PRIMARY_COLOR,
              tabBarInactiveTintColor: BLACK_COLOR,
              tabBarStyle: {
                display:
                  loader_slider_used?.state || submitting ? 'none' : 'flex',
                height: 60,
                paddingBottom: 10,
                paddingTop: 5,
                backgroundColor: WHITE_COLOR,
              },
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <IconTabLabel
                    isCustom={isIconLabelCustom}
                    name={iconName}
                    size={20}
                    typeIcon={typeIcon}
                    color={
                      isIconLabelCustom
                        ? PRIMARY_COLOR
                        : focused
                        ? PRIMARY_COLOR
                        : BLACK_COLOR
                    }
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
