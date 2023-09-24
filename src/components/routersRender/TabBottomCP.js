import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREEN_NAVIGATE} from '../routersConfig/General.config';
import {PRIMARY_COLOR} from '../../styles/colors.global';
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

function TabBarCustom({state, descriptors, navigation}) {
  return (
    <View
      style={tw.style(
        'w-full flex-row items-center justify-around bg-white shadow-xl',
      )}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label = options.tabBarLabel;
        const tabIconLabel = options.tabIconLabel;
        const isIconLabelCustom = options.isIconLabelCustom;
        const iconName = options.iconName;
        const typeIcon = options.typeIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            activeOpacity={0.8}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw.style('flex-1 flex-col items-center gap-1 py-1')}>
            <IconTabLabel
              isCustom={isIconLabelCustom}
              name={iconName}
              typeIcon={typeIcon}
              size={20}
              color={
                isIconLabelCustom
                  ? PRIMARY_COLOR
                  : isFocused
                  ? PRIMARY_COLOR
                  : '#222'
              }
            />
            {!isIconLabelCustom && (
              <Text
                style={tw.style(`font-bold text-[11px]`, {
                  color: isFocused ? PRIMARY_COLOR : '#222',
                })}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabBottomCP() {
  const {state} = useAppContext();
  const {isVisible_menu, submitting} = state.set_toggle;
  const {loader_slider_used} = state.set_data;
  console.log('loader_slider_used?.state:', loader_slider_used?.state);
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAVIGATE.Dashboard_Screen}
      tabBar={props =>
        isVisible_menu || loader_slider_used?.state || submitting ? null : (
          <TabBarCustom {...props} />
        )
      }>
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
              tabIconLabel: tabIconLabel,
              isIconLabelCustom: isIconLabelCustom,
              iconName: iconName,
              typeIcon: typeIcon || '',
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
