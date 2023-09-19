import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import useAppContext from './hooks/useAppContext';
import {DARK_WHITE_COLOR, WHITE_COLOR} from '../styles/colors.global';

export const useGetColorThemeDisplay = () => {
  const {state} = useAppContext();
  const {appearance_display} = state.set_data;
  const themeDark = {
    colors: {
      ...MD3DarkTheme.colors,
      background: WHITE_COLOR,
    },
  };

  const themeLight = {
    colors: {
      ...MD3LightTheme.colors,
      background: WHITE_COLOR,
    },
  };
  const colors =
    appearance_display?.value === 'dark'
      ? themeDark?.colors
      : themeLight?.colors;

  return {
    colors,
  };
};
