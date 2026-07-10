import { StyleSheet, Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Fonts } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'caption' | 'brand';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const tintColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return (
    <Text
      style={[
        { color },
        type === 'default' && styles.default,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'caption' && styles.caption,
        type === 'link' && [styles.link, { color: tintColor }],
        type === 'brand' && [styles.brand, { color: tintColor }],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  defaultSemiBold: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
    letterSpacing: -0.6, // tight tracking for display sizes
  },
  subtitle: {
    fontFamily: Fonts.rounded,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  caption: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: '#8A8A8E',
    letterSpacing: 0.2, // slightly positive tracking for readability
  },
  link: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  brand: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

