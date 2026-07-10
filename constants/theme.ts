import { Platform } from 'react-native';

// Brand Colors (exact hex codes)
export const BrandColors = {
  cherryPunch: '#D5004A',
  chartreuse: '#D7FA32',
  
  // Accent Pinks
  electricPink: '#FF2E9B',
  neonPink: '#EC2B7A',
  candyPink: '#FF67E7',
  fluorescentPurple: '#FF00FF',
  
  // Accent Yellows
  neonYellow: '#FDFF42',
  canaryYellow: '#FFF338',
  lime: '#C1FF1A',
};

export const Colors = {
  light: {
    text: '#1A1A1A', // Dark near-black text on glass cards
    secondaryText: '#999999', // Muted gray text
    background: '#FAFAFA', // Clean off-white base
    tint: BrandColors.cherryPunch,
    primary: BrandColors.cherryPunch,
    secondary: BrandColors.chartreuse,
    card: 'rgba(255, 255, 255, 0.75)', // Glass base card
    border: 'rgba(255, 255, 255, 0.4)', // Near-invisible white border
    icon: '#999999',
    tabIconDefault: '#999999',
    tabIconSelected: BrandColors.cherryPunch,
  },
  dark: {
    text: '#FFFFFF',
    secondaryText: '#888888',
    background: '#0B0104', // Deep cherry-black background
    tint: BrandColors.chartreuse,
    primary: BrandColors.chartreuse,
    secondary: BrandColors.cherryPunch,
    card: 'rgba(21, 3, 10, 0.75)', // Dark glass base card
    border: 'rgba(255, 255, 255, 0.1)',
    icon: '#888888',
    tabIconDefault: '#888888',
    tabIconSelected: BrandColors.chartreuse,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

