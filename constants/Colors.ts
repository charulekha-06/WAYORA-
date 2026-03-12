// Wayora Brand Colors
export const WayoraColors = {
  coral: '#E8637A',
  coralLight: '#F4A5B3',
  coralDark: '#C44D63',
  orange: '#F28C38',
  orangeLight: '#F5A85C',
  orangeDark: '#D97518',
  lavender: '#B8C4F0',
  lavenderLight: '#E0E5F8',
  blue: '#4A90D9',
  blueLight: '#7CB3EA',
  green: '#3CB371',
  greenLight: '#A8E6C3',
  red: '#E85D6F',
  redLight: '#F5A0AB',
  purple: '#C77DBA',

  black: '#1A1A2E',
  darkGray: '#4A4A5A',
  gray: '#8A8A9A',
  lightGray: '#E8E8EE',
  offWhite: '#F8F8FC',
  white: '#FFFFFF',
};

const tintColorLight = WayoraColors.orange;
const tintColorDark = '#fff';

export default {
  light: {
    text: WayoraColors.black,
    background: WayoraColors.offWhite,
    tint: tintColorLight,
    tabIconDefault: WayoraColors.gray,
    tabIconSelected: tintColorLight,
    card: WayoraColors.white,
    border: WayoraColors.lightGray,
  },
  dark: {
    text: '#fff',
    background: '#0a0a1a',
    tint: tintColorDark,
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
    card: '#1a1a2e',
    border: '#2a2a3e',
  },
};
