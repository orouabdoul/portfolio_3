import { useState } from 'react';
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, Spacing } from '@/constants/theme';
import { Project, ProjectCategory, projects } from '@/data/projects';

type Filter = 'all' | ProjectCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'design', label: 'UI/UX' },
  { key: 'mobile', label: 'Mobile' },
];

const CAT_COLOR: Record<string, string> = {
  mobile: '#0FEDD3',
  design: '#7C3AED',
  web: '#F472B6',
};

const CAT_LABEL: Record<string, string> = {
  mobile: 'Mobile',
  design: 'UI/UX',
  web: 'Web',
};

const CAT_GRAD: Record<string, string> = {
  mobile: 'linear-gradient(135deg,#0FEDD3,#0D91ED)',
  design: 'linear-gradient(135deg,#7C3AED,#F472B6)',
  web: 'linear-gradient(135deg,#F472B6,#FB923C)',
};

async function openLink(url: string) {
  if (Platform.OS === 'web') { (window as any).open(url, '_blank'); return; }
  await Linking.openURL(url);
}

function projectInitials(title: string) {
  return title
    .replace(/[^A-Za-zÀ-ÿ ]/g, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}

// ── Project card ─────────────────────────────────────────────────────────────
function ProjCard({ project, cardWidth, onPress }: { project: Project; cardWidth: any; onPress: () => void }) {
  const accent = CAT_COLOR[project.category] ?? '#6366f1';
  const gradBg = Platform.OS === 'web'
    ? ({ backgroundImage: CAT_GRAD[project.category] ?? 'linear-gradient(135deg,#6366f1,#38bdf8)' } as any)
    : { backgroundColor: accent };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [cs.pressable, { width: cardWidth }, pressed && { opacity: 0.85 }]}>
      <View
        // @ts-ignore
        className="proj-card-rn"
        style={cs.card}>

        {/* ── Image area ── */}
        <View style={[cs.imgArea, gradBg]}>
          {/* bottom gradient overlay */}
          <View
            // @ts-ignore
            className="proj-grad-overlay-rn"
            style={cs.gradOverlay}
          />
          {/* Initials */}
          <Text style={cs.initials}>{projectInitials(project.title)}</Text>
          {/* Category badge — top left */}
          <View style={[cs.catBadge, { backgroundColor: accent === '#0FEDD3' ? '#0ea5e9' : accent }]}>
            <Text style={cs.catBadgeText}>
              {(CAT_LABEL[project.category] ?? project.category).toUpperCase()}
            </Text>
          </View>
          {/* Duration badge — top right */}
          {project.duration && (
            <View style={cs.durationBadge}>
              <Text style={cs.durationText}>{project.duration}</Text>
            </View>
          )}
          {/* Icon overlay on hover (controlled by CSS on web) */}
          <View
            // @ts-ignore
            className="proj-icon-overlay-rn"
            style={cs.iconOverlay}>
            <View style={cs.iconCircle}>
              <Text style={{ fontSize: 22 }}>🔍</Text>
            </View>
          </View>
        </View>

        {/* ── Card body ── */}
        <View style={cs.body}>
          <Text style={cs.title} numberOfLines={1}>{project.title}</Text>
          <Text style={cs.desc} numberOfLines={3}>
            {project.shortDescription.length > 120
              ? project.shortDescription.slice(0, 120) + '…'
              : project.shortDescription}
          </Text>
          {/* Tech chips */}
          <View style={cs.chips}>
            {project.stack.slice(0, 3).map((t) => (
              <View key={t} style={cs.chip}>
                <Text style={cs.chipText}>{t}</Text>
              </View>
            ))}
            {project.stack.length > 3 && (
              <View style={cs.chip}>
                <Text style={cs.chipText}>+{project.stack.length - 3}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// ── Detail modal ─────────────────────────────────────────────────────────────
function ProjModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const accent = CAT_COLOR[project.category] ?? '#6366f1';
  const gradBg = Platform.OS === 'web'
    ? ({ backgroundImage: CAT_GRAD[project.category] ?? 'linear-gradient(135deg,#6366f1,#38bdf8)' } as any)
    : { backgroundColor: accent };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={ms.overlay}>
        {/* Backdrop — close on tap outside */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={ms.dialog}>
          {/* Header */}
          <View style={ms.header}>
            <View style={{ flex: 1 }}>
              <View style={[ms.catBadge, { backgroundColor: accent === '#0FEDD3' ? '#0ea5e9' : accent }]}>
                <Text style={ms.catBadgeText}>
                  {(CAT_LABEL[project.category] ?? project.category).toUpperCase()}
                </Text>
              </View>
              <Text style={ms.title}>{project.title}</Text>
            </View>
            <Pressable onPress={onClose} style={ms.closeBtn}>
              <Text style={ms.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={ms.body} showsVerticalScrollIndicator={false}>
            {/* Image placeholder */}
            <View style={[ms.imgPlaceholder, gradBg]}>
              <Text style={ms.imgInitials}>{projectInitials(project.title)}</Text>
            </View>

            {/* Description */}
            <Text style={ms.desc}>{project.fullDescription}</Text>

            {/* Technologies */}
            {project.stack.length > 0 && (
              <View style={ms.techWrap}>
                {/* @ts-ignore */}
                <Text className="text-gradient-rn" style={[ms.techLabel, { color: '#6366f1' }]}>Technologies :</Text>
                <View style={ms.chips}>
                  {project.stack.map((t) => (
                    <View key={t} style={ms.chip}>
                      <Text style={ms.chipText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Links */}
            {(project.demo || project.github) && (
              <View style={ms.links}>
                {project.demo && (
                  <Pressable
                    style={({ pressed }) => [ms.linkBtnGrad, pressed && { opacity: 0.85 }]}
                    onPress={() => openLink(project.demo!)}>
                    <Text style={ms.linkBtnText}>
                      🔗 {project.category === 'design' ? 'Prototype' : 'Démo'}
                    </Text>
                  </Pressable>
                )}
                {project.github && (
                  <Pressable
                    style={({ pressed }) => [ms.linkBtnDark, pressed && { opacity: 0.85 }]}
                    onPress={() => openLink(project.github!)}>
                    <Text style={ms.linkBtnText}>GitHub</Text>
                  </Pressable>
                )}
              </View>
            )}

            <View style={{ height: Spacing.four }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ── Screen ───────────────────────────────────────────────────────────────────
export default function ProjectsScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const isDesktop = width >= 992;
  const isMedium = width >= 768;
  const cols = isDesktop ? 3 : isMedium ? 2 : 1;
  const cardWidth = cols === 1 ? '100%' : (`${Math.floor(100 / cols) - 1}%` as any);
  const topPad = Platform.OS === 'web' ? 110 : insets.top + Spacing.three;

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <View style={ss.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: BottomTabInset + Spacing.five }}>
        <View style={[ss.outer, { paddingTop: topPad }]}>
          <View style={ss.inner}>

            {/* Title */}
            <View style={ss.titleWrap}>
              <Text style={ss.sectionTitle}>
                {'Mes '}
                {/* @ts-ignore */}
                <Text className="text-gradient-rn" style={ss.sectionTitleAccent}>Projets</Text>
              </Text>
              <Text style={ss.subtitle}>Découvrez une sélection de réalisations modernes et élégantes</Text>
            </View>

            {/* Filters */}
            <View style={ss.filterRow}>
              {FILTERS.map((f) => {
                const isActive = f.key === active;
                return (
                  <Pressable
                    key={f.key}
                    onPress={() => setActive(f.key)}
                    // @ts-ignore
                    className={isActive ? 'filter-btn-rn active' : 'filter-btn-rn'}
                    style={({ pressed }) => [
                      ss.filterBtn,
                      isActive && ss.filterBtnActive,
                      pressed && { opacity: 0.85 },
                    ]}>
                    <Text style={[ss.filterText, isActive && ss.filterTextActive]}>{f.label}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Card grid */}
            {filtered.length === 0 ? (
              <View style={ss.emptyWrap}>
                <Text style={ss.emptyText}>📁 Aucun projet trouvé.</Text>
              </View>
            ) : (
              <View style={ss.grid}>
                {filtered.map((p) => (
                  <ProjCard
                    key={p.id}
                    project={p}
                    cardWidth={cardWidth}
                    onPress={() => setSelected(p)}
                  />
                ))}
              </View>
            )}

          </View>
        </View>
      </ScrollView>

      {selected && <ProjModal project={selected} onClose={() => setSelected(null)} />}
    </View>
  );
}

// ── Card styles ───────────────────────────────────────────────────────────────
const cs = StyleSheet.create({
  pressable: { marginBottom: Spacing.three },
  card: {
    backgroundColor: '#18122B',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  imgArea: {
    height: 220,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradOverlay: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
  },
  initials: {
    fontSize: 64,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 4,
  },
  catBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  catBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  durationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  durationText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  iconOverlay: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99,102,241,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#212529',
    padding: 20,
    gap: Spacing.two,
  },
  title: { color: '#FFFFFF', fontWeight: '700', fontSize: 18 },
  desc: { color: 'rgba(255,255,255,0.78)', fontSize: 13, lineHeight: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  chipText: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600' },
});

// ── Modal styles ──────────────────────────────────────────────────────────────
const ms = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  dialog: {
    backgroundColor: 'rgba(24,18,43,0.97)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.3)',
    width: '100%',
    maxWidth: 700,
    maxHeight: '90%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    gap: Spacing.three,
  },
  catBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  catBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  title: { color: '#FFFFFF', fontWeight: '800', fontSize: 20, lineHeight: 26 },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  closeBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  body: { maxHeight: 520 },
  imgPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgInitials: {
    fontSize: 72,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 4,
  },
  desc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    lineHeight: 24,
    padding: 20,
  },
  techWrap: { paddingHorizontal: 20, paddingBottom: 16 },
  techLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chipText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  linkBtnGrad: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  linkBtnDark: {
    backgroundColor: '#2d2d2d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  linkBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});

// ── Screen styles ─────────────────────────────────────────────────────────────
const ss = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1E192D' },
  outer: {
    backgroundColor: '#1E192D',
    paddingBottom: Spacing.five,
    minHeight: '100%' as any,
  },
  inner: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
  },
  titleWrap: { alignItems: 'center', marginBottom: Spacing.five },
  sectionTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  sectionTitleAccent: { fontSize: 38, fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 16, textAlign: 'center' },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.five,
  },
  filterBtn: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: 'transparent',
  },
  filterBtnActive: {
    backgroundColor: '#6366f1',
    borderColor: 'transparent',
  },
  filterText: { fontSize: 14, fontWeight: '600', color: '#bbb' },
  filterTextActive: { color: '#fff' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    justifyContent: 'center',
  },

  emptyWrap: { alignItems: 'center', paddingVertical: Spacing.five },
  emptyText: { color: 'rgba(255,255,255,0.5)', fontSize: 16, textAlign: 'center' },
});
