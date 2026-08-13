import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { projects } from '@/data/projects';
import { useTheme } from '@/hooks/use-theme';

async function openLink(href: string) {
  if (Platform.OS === 'web') {
    // @ts-ignore
    window.open(href, '_blank');
    return;
  }
  await openBrowserAsync(href, { presentationStyle: WebBrowserPresentationStyle.AUTOMATIC });
}

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <View style={[styles.root, styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.textSecondary }}>Projet introuvable.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* header band */}
        <View style={[styles.headerBand, { backgroundColor: theme.accent + '18' }]}>
          <View style={[styles.catBadge, { backgroundColor: theme.accent + '30' }]}>
            <Text style={[styles.catText, { color: theme.accent }]}>{project.category.toUpperCase()}</Text>
          </View>
          <Text style={[styles.title, { color: theme.accent }]}>{project.title}</Text>
          {project.duration && (
            <Text style={[styles.duration, { color: theme.textSecondary }]}>⏱ {project.duration}</Text>
          )}
        </View>

        <View style={styles.content}>
          {/* stack chips */}
          <View style={styles.chips}>
            {project.stack.map((tech) => (
              <View key={tech} style={[styles.chip, { backgroundColor: theme.backgroundElement }]}>
                <Text style={[styles.chipText, { color: theme.accentBlue }]}>{tech}</Text>
              </View>
            ))}
          </View>

          {/* full description */}
          <Text style={[styles.description, { color: theme.text }]}>{project.fullDescription}</Text>

          {/* links */}
          {(project.github || project.demo) && (
            <View style={styles.linksRow}>
              {project.github && (
                <Pressable
                  style={({ pressed }) => [styles.linkOutline, { borderColor: theme.accent }, pressed && { opacity: 0.7 }]}
                  onPress={() => openLink(project.github!)}>
                  <Text style={[styles.linkText, { color: theme.accent }]}>Code source →</Text>
                </Pressable>
              )}
              {project.demo && (
                <Pressable
                  style={({ pressed }) => [styles.linkFilled, { backgroundColor: theme.accent }, pressed && { opacity: 0.7 }]}
                  onPress={() => openLink(project.demo!)}>
                  <Text style={styles.linkFilledText}>Démo live →</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  scroll: { flexGrow: 1, paddingBottom: Spacing.six },
  headerBand: { padding: Spacing.four, paddingTop: Spacing.three, paddingBottom: Spacing.five },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: Spacing.two },
  catText: { fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '800', lineHeight: 34 },
  duration: { fontSize: 13, marginTop: Spacing.one },
  content: {
    alignSelf: 'center', width: '100%', maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four, gap: Spacing.four,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  chip: { paddingVertical: Spacing.one, paddingHorizontal: Spacing.two, borderRadius: Spacing.two },
  chipText: { fontSize: 13, fontWeight: '600' },
  description: { fontSize: 15, lineHeight: 26 },
  linksRow: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' },
  linkOutline: { paddingVertical: 12, paddingHorizontal: Spacing.four, borderRadius: 30, borderWidth: 2 },
  linkText: { fontWeight: '700', fontSize: 14 },
  linkFilled: { paddingVertical: 12, paddingHorizontal: Spacing.four, borderRadius: 30 },
  linkFilledText: { color: '#18142A', fontWeight: '700', fontSize: 14 },
});
