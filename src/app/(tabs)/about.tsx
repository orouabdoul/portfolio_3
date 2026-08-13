import { useRouter } from 'expo-router';
import {
  Image,
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
import { educationEntries, TimelineEntry } from '@/data/education';
import { experienceEntries } from '@/data/experience';
import { skillCategories } from '@/data/skills';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bonjour";
  if (h >= 12 && h < 18) return "Bon après-midi";
  return "Bonsoir";
}

// ── Timeline glass card ───────────────────────────────────────────────────────
function GlassCard({ entry }: { entry: TimelineEntry }) {
  return (
    <View style={gl.item}>
      <View style={gl.dot} />
      <View
        // @ts-ignore
        className="glass-card-rn"
        style={gl.card}>
        <Text style={gl.title}>{entry.title}</Text>
        {(entry.institution || entry.period) ? (
          <Text style={gl.meta}>
            {[entry.institution, entry.period].filter(Boolean).join(' — ')}
          </Text>
        ) : null}
        {entry.description ? <Text style={gl.desc}>{entry.description}</Text> : null}
      </View>
    </View>
  );
}

const gl = StyleSheet.create({
  item: { position: 'relative', marginBottom: Spacing.four },
  dot: {
    position: 'absolute',
    left: -20,
    top: 14,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#38bdf8',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: 1,
  },
  card: {
    backgroundColor: 'rgba(30,25,45,0.95)',
    borderRadius: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#38bdf8',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  title: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, marginBottom: 4 },
  meta: { color: 'rgba(255,255,255,0.70)', fontSize: 12, marginBottom: 6 },
  desc: { color: 'rgba(255,255,255,0.82)', fontSize: 13, lineHeight: 20 },
});

// ── Screen ────────────────────────────────────────────────────────────────────
export default function AboutScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width >= 992;
  const isMedium = width >= 600;
  const topPad = Platform.OS === 'web' ? 110 : insets.top + Spacing.three;

  // ── Responsive card width calculation (pixels, not %) ──────────────────────
  // Using pixels avoids the gap-overflow bug with flexWrap + percentage widths.
  const CARD_GAP = 12;
  const H_PAD = Spacing.four * 2; // 24px each side = 48px total
  const containerW = Math.min(width, 1151) - H_PAD;

  function cardWidth(cols: number): number {
    return Math.floor((containerW - CARD_GAP * (cols - 1)) / cols);
  }

  function colsForCat(catName: string): number {
    if (catName === 'IA') {
      // IA has 5 cards with descriptions — fewer cols for readability
      return width >= 992 ? 3 : width >= 600 ? 2 : 1;
    }
    return width >= 992 ? 4 : width >= 600 ? 3 : 2;
  }

  return (
    <View style={s.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: BottomTabInset + Spacing.five }}
        showsVerticalScrollIndicator={false}>

        {/* ══════════════════════════════════════════════════════════
            BIO SECTION
        ══════════════════════════════════════════════════════════ */}
        <View style={[s.bioOuter, { paddingTop: topPad }]}>
          <View style={[s.bioRow, isDesktop && s.bioRowDesktop]}>

            {/* Photo */}
            <View style={[s.photoCol, isDesktop && s.photoColDesktop]}>
              <View style={s.photoWrap}>
                <Image
                  source={require('@/assets/images/profil.png')}
                  style={s.profilePhoto}
                  resizeMode="contain"
                />
                {/* Cyan glow ring */}
                <View style={s.photoGlow} />
              </View>
            </View>

            {/* Text */}
            <View style={[s.textCol, isDesktop && s.textColDesktop]}>

              <Text style={s.bioEyebrow}>À propos de moi</Text>

              <Text style={s.bioH2}>
                {getGreeting() + ', je suis '}
                <Text style={s.bioCyan}>Abdoulaye</Text>
              </Text>

              <Text style={s.bioPara}>
                {'Artisan du mobile, passionné par l\'alliance entre technologie fonctionnelle et design intuitif. J\'accompagne les startups et solopreneurs à transformer leurs idées en '}
                <Text style={s.bioCyan}>applications mobiles concrètes, élégantes et prêtes à conquérir le marché.</Text>
              </Text>

              <View style={s.missionBox}>
                <Text style={s.missionLabel}>Ma mission</Text>
                <Text style={s.missionText}>
                  {'🚀 '}
                  <Text style={s.bioCyan}>Développement Flutter & React Native</Text>
                  {' — apps performantes, scalables et multiplateformes.\n'}
                  {'🎨 '}
                  <Text style={s.bioCyan}>Design UX/UI</Text>
                  {' — expériences fluides, esthétiques et efficaces.'}
                </Text>
              </View>

              <View style={s.ctaRow}>
                <Pressable
                  style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.85 }]}
                  onPress={() => router.push('/projects')}>
                  <Text style={s.ctaBtnText}>Voir mes projets</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [s.ctaBtnOutline, pressed && { opacity: 0.85 }]}
                  onPress={() => router.push('/contact')}>
                  <Text style={s.ctaBtnOutlineText}>Me contacter</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* ══════════════════════════════════════════════════════════
            COMPÉTENCES
        ══════════════════════════════════════════════════════════ */}
        <View style={s.skillsOuter}>
          <View style={s.skillsInner}>

            <Text style={s.sectionLabel}>Compétences</Text>
            <Text style={s.sectionTitle}>
              {'Stack '}
              {/* @ts-ignore */}
              <Text className="text-gradient-rn" style={[s.sectionTitleGrad, { color: '#6366f1' }]}>
                Techniques
              </Text>
            </Text>

            {skillCategories.map((cat) => {
              const isIA = cat.category === 'IA';
              const cols = colsForCat(cat.category);
              const cw = cardWidth(cols);

              return (
                <View key={cat.category} style={s.catBlock}>
                  {/* Category label */}
                  {/* @ts-ignore */}
                  <Text className="text-gradient-rn" style={[s.catTitle, { color: '#6366f1' }]}>
                    {cat.category}
                  </Text>

                  {/* Cards */}
                  <View style={[s.cardGrid, { gap: CARD_GAP }]}>
                    {cat.skills.map((sk) => (
                      <View
                        key={sk.name}
                        // @ts-ignore
                        className="skill-card-rn"
                        style={[
                          s.skillCard,
                          { width: cw },
                          isIA && s.skillCardIA,
                        ]}>

                        {/* Icon */}
                        <View
                          // @ts-ignore
                          className="skill-icon-rn"
                          style={s.iconWrap}>
                          <Image
                            source={{ uri: sk.iconUrl }}
                            style={s.iconImg}
                            resizeMode="contain"
                          />
                        </View>

                        {/* Name */}
                        <Text style={s.skillName}>{sk.name}</Text>

                        {/* Level badge */}
                        <View style={s.levelBadge}>
                          <Text style={s.levelText}>{sk.level}</Text>
                        </View>

                        {/* Description — IA only */}
                        {isIA && sk.desc ? (
                          <Text style={s.skillDesc}>{sk.desc}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ══════════════════════════════════════════════════════════
            PARCOURS
        ══════════════════════════════════════════════════════════ */}
        <View style={s.eduOuter}>
          <View style={s.eduInner}>

            <Text style={s.sectionLabel}>Mon parcours</Text>
            <Text style={s.sectionTitle}>
              {'Formation & '}
              {/* @ts-ignore */}
              <Text className="text-gradient-rn" style={[s.sectionTitleGrad, { color: '#6366f1' }]}>
                Expériences
              </Text>
            </Text>
            <Text style={s.sectionSub}>Académique et professionnel</Text>

            <View style={[s.eduRow, isDesktop && s.eduRowDesktop]}>

              {/* Formation */}
              <View style={s.eduCol}>
                {/* @ts-ignore */}
                <Text className="text-gradient-rn" style={[s.colTitle, { color: '#38bdf8' }]}>
                  📚 Formation
                </Text>
                <View style={s.timeline}>
                  <View
                    // @ts-ignore
                    className="timeline-line-rn"
                    style={s.timelineLine}
                  />
                  {educationEntries.map((e) => <GlassCard key={e.id} entry={e} />)}
                </View>
              </View>

              {/* Expérience */}
              <View style={s.eduCol}>
                {/* @ts-ignore */}
                <Text className="text-gradient-rn" style={[s.colTitle, { color: '#38bdf8' }]}>
                  💼 Expérience
                </Text>
                <View style={s.timeline}>
                  <View
                    // @ts-ignore
                    className="timeline-line-rn"
                    style={s.timelineLine}
                  />
                  {experienceEntries.map((e) => <GlassCard key={e.id} entry={e} />)}
                </View>
              </View>

            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#18142A' },

  // ── Bio ──────────────────────────────────────────────────────────────────
  bioOuter: {
    backgroundColor: '#1E192D',
    paddingBottom: Spacing.six,
  },
  bioRow: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.five,
  },
  bioRowDesktop: { flexDirection: 'row', alignItems: 'center' },

  photoCol: { alignItems: 'center' },
  photoColDesktop: { flex: 5 },
  photoWrap: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(15,237,211,0.35)',
    shadowColor: '#0FEDD3',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 14,
    backgroundColor: '#1a1530',
  },
  profilePhoto: {
    width: 340,
    height: 430,
  },
  photoGlow: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(15,237,211,0.15)',
  },

  textCol: { gap: Spacing.three },
  textColDesktop: { flex: 7 },

  bioEyebrow: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0ea5e9',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  bioH2: { fontSize: 30, fontWeight: '800', color: '#FFFFFF', lineHeight: 38 },
  bioCyan: { color: '#0ea5e9', fontWeight: '700' },
  bioPara: { fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 26 },

  missionBox: {
    backgroundColor: 'rgba(14,165,233,0.06)',
    borderLeftWidth: 3,
    borderLeftColor: '#0ea5e9',
    borderRadius: 10,
    padding: Spacing.three,
    gap: 6,
  },
  missionLabel: { color: '#0ea5e9', fontWeight: '700', fontSize: 13 },
  missionText: { color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 24 },

  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, marginTop: 4 },
  ctaBtn: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 12,
    paddingHorizontal: Spacing.four,
    borderRadius: 40,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  ctaBtnOutline: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    paddingVertical: 12,
    paddingHorizontal: Spacing.four,
    borderRadius: 40,
  },
  ctaBtnOutlineText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },

  // ── Skills ────────────────────────────────────────────────────────────────
  skillsOuter: { backgroundColor: '#18122B', paddingVertical: Spacing.six },
  skillsInner: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
  },

  sectionLabel: {
    color: '#0ea5e9',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  sectionTitleGrad: { fontSize: 30, fontWeight: '800' },
  sectionSub: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: Spacing.five,
  },

  catBlock: { marginBottom: Spacing.five },
  catTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: Spacing.two,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99,102,241,0.25)',
    letterSpacing: 0.5,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Standard skill card (marginBottom géré par gap du parent)
  skillCard: {
    backgroundColor: '#1E192D',
    borderRadius: 16,
    padding: Spacing.three,
    alignItems: 'center',
    gap: 8,
    minHeight: 130,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  // IA card — taller, description visible
  skillCardIA: {
    minHeight: 220,
    justifyContent: 'flex-start',
    paddingTop: Spacing.three,
    gap: 8,
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  iconImg: { width: 36, height: 36 },

  skillName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },

  // Level — styled badge instead of gradient text (avoids invisible text on native)
  levelBadge: {
    backgroundColor: 'rgba(99,102,241,0.18)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  levelText: {
    color: '#a5b4fc',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  skillDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 4,
    flex: 1,
  },

  // ── Parcours ──────────────────────────────────────────────────────────────
  eduOuter: { backgroundColor: '#1E192D', paddingVertical: Spacing.six },
  eduInner: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
  },
  eduRow: { flexDirection: 'column', gap: Spacing.five, marginTop: Spacing.five },
  eduRowDesktop: { flexDirection: 'row', alignItems: 'flex-start' },
  eduCol: { flex: 1 },
  colTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: Spacing.four,
  },
  timeline: { position: 'relative', paddingLeft: 28 },
  timelineLine: {
    position: 'absolute',
    left: 8,
    top: 0,
    bottom: 0,
    width: 2,
  },
});
