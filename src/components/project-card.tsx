import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { Project } from '@/data/projects';
import { useTheme } from '@/hooks/use-theme';

const CATEGORY_COLORS: Record<string, string> = {
  mobile: '#0FEDD3',
  design: '#38bdf8',
  web: '#7C3AED',
};

const CATEGORY_LABELS: Record<string, string> = {
  mobile: 'Mobile',
  design: 'UI/UX',
  web: 'Web',
};

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const theme = useTheme();
  const accent = CATEGORY_COLORS[project.category] ?? theme.accent;

  return (
    <Pressable
      onPress={() => router.push(`/project/${project.id}`)}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>

        {/* colored header strip */}
        <View style={[styles.header, { backgroundColor: accent + '20', borderBottomColor: accent + '30' }]}>
          <View style={[styles.catBadge, { backgroundColor: accent }]}>
            <Text style={styles.catText}>{CATEGORY_LABELS[project.category] ?? project.category.toUpperCase()}</Text>
          </View>
          {project.featured && (
            <View style={[styles.featuredBadge, { borderColor: accent + '80' }]}>
              <Text style={[styles.featuredText, { color: accent }]}>★ Vedette</Text>
            </View>
          )}
          {project.duration && (
            <Text style={[styles.duration, { color: theme.textSecondary }]}>{project.duration}</Text>
          )}
        </View>

        {/* body */}
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{project.title}</Text>
            <Text style={[styles.arrow, { color: accent }]}>→</Text>
          </View>
          <Text style={[styles.desc, { color: theme.textSecondary }]} numberOfLines={2}>
            {project.shortDescription}
          </Text>
          <View style={styles.chips}>
            {project.stack.slice(0, 4).map((t) => (
              <View key={t} style={[styles.chip, { backgroundColor: accent + '15', borderColor: accent + '35' }]}>
                <Text style={[styles.chipText, { color: accent }]}>{t}</Text>
              </View>
            ))}
            {project.stack.length > 4 && (
              <View style={[styles.chip, { backgroundColor: theme.backgroundSelected, borderColor: 'transparent' }]}>
                <Text style={[styles.chipText, { color: theme.textSecondary }]}>+{project.stack.length - 4}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { marginBottom: Spacing.three },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  card: { borderRadius: Spacing.two, overflow: 'hidden' },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.two,
    paddingHorizontal: Spacing.three, paddingVertical: Spacing.two,
    borderBottomWidth: 1,
  },
  catBadge: { paddingHorizontal: Spacing.two, paddingVertical: 4, borderRadius: 20 },
  catText: { fontSize: 11, fontWeight: '700', color: '#18142A', letterSpacing: 0.5 },
  featuredBadge: { paddingHorizontal: Spacing.two, paddingVertical: 3, borderRadius: 20, borderWidth: 1 },
  featuredText: { fontSize: 11, fontWeight: '600' },
  duration: { fontSize: 12, marginLeft: 'auto' },

  body: { padding: Spacing.three, gap: Spacing.two },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 17, fontWeight: '700', flex: 1, marginRight: Spacing.two },
  arrow: { fontSize: 18, fontWeight: '700' },
  desc: { fontSize: 13, lineHeight: 19 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one },
  chip: { paddingVertical: 3, paddingHorizontal: Spacing.two, borderRadius: Spacing.one, borderWidth: 1 },
  chipText: { fontSize: 11, fontWeight: '600' },
});
