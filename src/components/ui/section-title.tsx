import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

interface Props {
  label: string;
  accent: string;
  subtitle?: string;
  style?: ViewStyle;
}

export function SectionTitle({ label, accent, subtitle, style }: Props) {
  const theme = useTheme();
  const parts = label.split('|');

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {parts[0]}
        {parts[1] && <Text style={{ color: theme.accent }}>{parts[1]}</Text>}
      </Text>
      {subtitle && <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', lineHeight: 34 },
  subtitle: { fontSize: 14, marginTop: 6, textAlign: 'center' },
});
