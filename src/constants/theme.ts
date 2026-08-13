import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#111827',
    background: '#FFFFFF',
    backgroundElement: '#F3F4F6',
    backgroundSelected: '#E5E7EB',
    textSecondary: '#6B7280',
    accent: '#0FEDD3',
    accentBlue: '#0ea5e9',
    accentPurple: '#6366f1',
  },
  dark: {
    text: '#FFFFFF',
    background: '#18142A',
    backgroundElement: '#1E192D',
    backgroundSelected: '#23203A',
    textSecondary: '#B0B4BA',
    accent: '#0FEDD3',
    accentBlue: '#38bdf8',
    accentPurple: '#7C3AED',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

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
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
