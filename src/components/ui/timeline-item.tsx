import { StyleSheet, Text, View } from 'react-native';

import { TimelineEntry } from '@/data/education';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface Props {
  item: TimelineEntry;
  isLast?: boolean;
}

export function TimelineItem({ item, isLast = false }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {/* Left: dot + line */}
      <View style={styles.spine}>
        <View style={[styles.dot, { backgroundColor: theme.accent }]} />
        {!isLast && <View style={[styles.line, { backgroundColor: theme.backgroundSelected }]} />}
      </View>

      {/* Right: content */}
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        {item.institution ? (
          <Text style={[styles.institution, { color: theme.accent }]}>{item.institution}</Text>
        ) : null}
        {item.period ? (
          <Text style={[styles.period, { color: theme.textSecondary }]}>{item.period}</Text>
        ) : null}
        {item.description ? (
          <Text style={[styles.desc, { color: theme.textSecondary }]}>{item.description}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.two, marginBottom: Spacing.two },
  spine: { alignItems: 'center', width: 20, paddingTop: 4 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  line: { width: 2, flex: 1, marginTop: 4 },
  card: {
    flex: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.one,
    marginBottom: Spacing.half,
  },
  title: { fontSize: 14, fontWeight: '700' },
  institution: { fontSize: 13, fontWeight: '600' },
  period: { fontSize: 12 },
  desc: { fontSize: 13, lineHeight: 19, marginTop: 2 },
});
