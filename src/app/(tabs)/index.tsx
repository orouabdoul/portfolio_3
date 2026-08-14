import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  LayoutAnimation,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { educationEntries, TimelineEntry } from "@/data/education";
import { experienceEntries } from "@/data/experience";
import { faqEntries } from "@/data/faq";
import { profile } from "@/data/profile";
import { Project, ProjectCategory, projects } from "@/data/projects";
import { services } from "@/data/services";
import { skillCategories } from "@/data/skills";
import { testimonials } from "@/data/testimonials";

// ── Types ──────────────────────────────────────────────────────────────────────
type Filter = "all" | ProjectCategory;

// ── Constants ──────────────────────────────────────────────────────────────────
const HERO_ROLES = [
  { text: "Flutter Expert", color: "#0FEDD3" },
  { text: "React Native Expert", color: "#61DAFB" },
  { text: "UI/UX Designer", color: "#C084FC" },
  { text: "Full-Stack Mobile", color: "#0ea5e9" },
];

const WHY_ITEMS = [
  {
    icon: "⚡",
    title: "Réponse garantie sous 24h",
    desc: "Toujours joignable, toujours réactif. Chaque message reçoit une réponse rapide et claire.",
  },
  {
    icon: "🏆",
    title: "Code livré testé & documenté",
    desc: "Des apps robustes, lisibles et maintenables — prêtes à évoluer bien au-delà de la livraison.",
  },
  {
    icon: "😊",
    title: "Taux de fidélisation : 100 %",
    desc: "Tous mes clients reviennent. La satisfaction ne s'arrête pas à la livraison — un suivi post-lancement est toujours proposé.",
  },
  {
    icon: "🤖",
    title: "IA intégrée · 2× plus rapide",
    desc: "Grâce aux outils IA, je livre plus vite sans sacrifier la qualité. Vous gagnez du temps et de l'argent.",
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Analyse & UX",
    desc: "Analyse des besoins, personas, wireframes et architecture.",
    highlight:
      "Je prends en charge la rédaction ou la validation du cahier des charges si nécessaire.",
    grad:
      Platform.OS === "web"
        ? "linear-gradient(90deg,#0FEDD3,#0D91ED)"
        : "#0FEDD3",
  },
  {
    num: "2",
    title: "Design UI",
    desc: "Prototypage Figma, design system, animations et validation.",
    highlight:
      "Livraison d'un prototype cliquable pour tester l'expérience avant le développement.",
    grad:
      Platform.OS === "web"
        ? "linear-gradient(90deg,#7C3AED,#F472B6)"
        : "#7C3AED",
  },
  {
    num: "3",
    title: "Développement Mobile",
    desc: "Flutter ou React Native selon votre besoin — architecture clean, tests et intégration Firebase.",
    highlight: "",
    grad:
      Platform.OS === "web"
        ? "linear-gradient(90deg,#F472B6,#FB923C)"
        : "#F472B6",
  },
  {
    num: "4",
    title: "Déploiement & Suivi",
    desc: "Tests utilisateurs, optimisation, publication sur les stores et suivi post-lancement assuré.",
    highlight: "",
    grad:
      Platform.OS === "web"
        ? "linear-gradient(90deg,#FB923C,#FACC15)"
        : "#FB923C",
  },
];

const STATS = [
  { value: `${profile.projectCount}+`, label: "apps livrées en production" },
  { value: "100%", label: "clients qui reviennent" },
  { value: "2", label: "continents couverts" },
  { value: "<24h", label: "réponse garantie" },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "design", label: "UI/UX" },
  { key: "mobile", label: "Mobile" },
];

const CAT_COLOR: Record<string, string> = {
  mobile: "#0FEDD3",
  design: "#7C3AED",
  web: "#F472B6",
};

const CAT_LABEL: Record<string, string> = {
  mobile: "Mobile",
  design: "UI/UX",
  web: "Web",
};

const CAT_GRAD: Record<string, string> = {
  mobile: "linear-gradient(135deg,#0FEDD3,#0D91ED)",
  design: "linear-gradient(135deg,#7C3AED,#F472B6)",
  web: "linear-gradient(135deg,#F472B6,#FB923C)",
};

const SOCIAL_COLORS: Record<string, string> = {
  Email: "#0ea5e9",
  WhatsApp: "#25D366",
  LinkedIn: "#0077B5",
  GitHub: "#24292e",
  Facebook: "#1877F2",
  Telegram: "#2AABEE",
};

const CLIENTS = [
  {
    name: "COSIT-BENIN",
    abbr: "CB",
    color: "#0ea5e9",
    sector: "Organisation nationale · Bénin",
    projects: ["SIM", "MyMonto Garages", "MyMonto Users"],
    result: "3 applications livrées en production",
    scope: "Développeur Mobile Full-Stack",
  },
  {
    name: "Smart Bulk Editor",
    abbr: "SBE",
    color: "#7C3AED",
    sector: "E-commerce SaaS",
    projects: ["UI/UX Design", "Design System", "Prototype Figma"],
    result: "Prototype validé · 0 aller-retour développement",
    scope: "UI/UX Designer",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bonjour";
  if (h >= 12 && h < 18) return "Bon après-midi";
  return "Bonsoir";
}

async function openLink(href: string) {
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("https://wa.me")
  ) {
    await Linking.openURL(href);
    return;
  }
  if (Platform.OS === "web") {
    (window as any).open(href, "_blank");
    return;
  }
  await openBrowserAsync(href, {
    presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
  });
}

function projectInitials(title: string) {
  return title
    .replace(/[^A-Za-zÀ-ÿ ]/g, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

// ── HeroTypewriter ─────────────────────────────────────────────────────────────
function HeroTypewriter({ width = 400 }: { width?: number }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const cur = HERO_ROLES[roleIdx].text;
    if (!erasing) {
      if (charIdx < cur.length) {
        const t = setTimeout(() => setCharIdx((c) => c + 1), 75);
        return () => clearTimeout(t);
      }
      // fully typed → pause then erase
      const t = setTimeout(() => setErasing(true), 1900);
      return () => clearTimeout(t);
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => setCharIdx((c) => c - 1), 40);
        return () => clearTimeout(t);
      }
      // fully erased → brief pause then next role
      const t = setTimeout(() => {
        setErasing(false);
        setRoleIdx((i) => (i + 1) % HERO_ROLES.length);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [charIdx, erasing, roleIdx]);

  const cur = HERO_ROLES[roleIdx];
  const shown = cur.text.slice(0, charIdx);
  const twSize = width >= 992 ? 30 : width >= 768 ? 24 : 20;

  return (
    <Text style={[heroSt.typewriter, { fontSize: twSize }]}>
      <Text style={{ color: cur.color }}>{shown}</Text>
      <Text
        style={{
          color: erasing ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.65)",
        }}
      >
        {"│"}
      </Text>
    </Text>
  );
}

// ── GlassCard (timeline) ───────────────────────────────────────────────────────
function GlassCard({ entry }: { entry: TimelineEntry }) {
  return (
    <View style={glSt.item}>
      <View style={glSt.dot} />
      <View
        // @ts-ignore
        className="glass-card-rn"
        style={glSt.card}
      >
        <Text style={glSt.title}>{entry.title}</Text>
        {entry.institution || entry.period ? (
          <Text style={glSt.meta}>
            {[entry.institution, entry.period].filter(Boolean).join(" — ")}
          </Text>
        ) : null}
        {entry.description ? (
          <Text style={glSt.desc}>{entry.description}</Text>
        ) : null}
      </View>
    </View>
  );
}

// ── ProjCard ───────────────────────────────────────────────────────────────────
function ProjCard({
  project,
  cardWidth,
  onPress,
}: {
  project: Project;
  cardWidth: any;
  onPress: () => void;
}) {
  const accent = CAT_COLOR[project.category] ?? "#6366f1";
  const gradBg =
    Platform.OS === "web"
      ? ({
          backgroundImage:
            CAT_GRAD[project.category] ??
            "linear-gradient(135deg,#6366f1,#38bdf8)",
        } as any)
      : { backgroundColor: accent };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        projCardSt.pressable,
        { width: cardWidth },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View
        // @ts-ignore
        className="proj-card-rn"
        style={projCardSt.card}
      >
        <View style={[projCardSt.imgArea, project.imageUrl ? {} : gradBg]}>
          {project.imageUrl ? (
            <Image
              source={{ uri: project.imageUrl }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          ) : (
            <>
              <View
                // @ts-ignore
                className="proj-grad-overlay-rn"
                style={projCardSt.gradOverlay}
              />
              <Text style={projCardSt.initials}>
                {projectInitials(project.title)}
              </Text>
            </>
          )}
          <View
            style={[
              projCardSt.catBadge,
              { backgroundColor: accent === "#0FEDD3" ? "#0ea5e9" : accent },
            ]}
          >
            <Text style={projCardSt.catBadgeText}>
              {(CAT_LABEL[project.category] ?? project.category).toUpperCase()}
            </Text>
          </View>
          {project.featured && (
            <View style={projCardSt.featuredBadge}>
              <Text style={projCardSt.featuredText}>⭐ Featured</Text>
            </View>
          )}
          {project.duration && (
            <View style={projCardSt.durationBadge}>
              <Text style={projCardSt.durationText}>{project.duration}</Text>
            </View>
          )}
          <View
            // @ts-ignore
            className="proj-icon-overlay-rn"
            style={projCardSt.iconOverlay}
          >
            <View style={projCardSt.iconCircle}>
              <Text style={{ fontSize: 22 }}>🔍</Text>
            </View>
          </View>
        </View>

        <View style={projCardSt.body}>
          <Text style={projCardSt.title} numberOfLines={1}>
            {project.title}
          </Text>
          <Text style={projCardSt.desc} numberOfLines={3}>
            {project.shortDescription.length > 120
              ? project.shortDescription.slice(0, 120) + "…"
              : project.shortDescription}
          </Text>
          <View style={projCardSt.chips}>
            {project.stack.slice(0, 3).map((t) => (
              <View key={t} style={projCardSt.chip}>
                <Text style={projCardSt.chipText}>{t}</Text>
              </View>
            ))}
            {project.stack.length > 3 && (
              <View style={projCardSt.chip}>
                <Text style={projCardSt.chipText}>
                  +{project.stack.length - 3}
                </Text>
              </View>
            )}
          </View>
          <View style={projCardSt.ctaRow}>
            <Text style={projCardSt.ctaText}>Voir le projet →</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// ── ProjDetail — full-screen project page ─────────────────────────────────────
function ProjDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const accent = CAT_COLOR[project.category] ?? "#6366f1";
  const accentSafe = accent === "#0FEDD3" ? "#0ea5e9" : accent;
  const gradBg =
    Platform.OS === "web"
      ? ({
          backgroundImage:
            CAT_GRAD[project.category] ??
            "linear-gradient(135deg,#6366f1,#38bdf8)",
        } as any)
      : { backgroundColor: accent };

  const hasLinks =
    project.demo ||
    project.github ||
    project.playStoreUrl ||
    project.appStoreUrl ||
    project.figmaUrl;

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={[projDetailSt.root, { paddingTop: insets.top }]}>
        {/* ── Sticky header ── */}
        <View style={projDetailSt.header}>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              projDetailSt.backBtn,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={projDetailSt.backArrow}>←</Text>
            <Text style={projDetailSt.backLabel}>Retour</Text>
          </Pressable>
          <View style={[projDetailSt.catPill, { backgroundColor: accentSafe }]}>
            <Text style={projDetailSt.catPillText}>
              {(CAT_LABEL[project.category] ?? project.category).toUpperCase()}
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        >
          {/* ── Hero ── */}
          <View style={[projDetailSt.hero, project.imageUrl ? {} : gradBg]}>
            {project.imageUrl && (
              <Image
                source={{ uri: project.imageUrl }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
            )}
            <View style={projDetailSt.heroScrim} />
            <View style={projDetailSt.heroContent}>
              {project.featured && (
                <View style={projDetailSt.featuredPill}>
                  <Text style={projDetailSt.featuredPillText}>
                    ⭐ Projet phare
                  </Text>
                </View>
              )}
              <Text style={projDetailSt.heroTitle}>{project.title}</Text>
              <Text style={projDetailSt.heroSub} numberOfLines={2}>
                {project.shortDescription}
              </Text>
            </View>
          </View>

          {/* ── Quick stats ── */}
          <View style={projDetailSt.statsRow}>
            {project.year && (
              <View style={projDetailSt.statPill}>
                <Text style={projDetailSt.statIcon}>📅</Text>
                <Text style={projDetailSt.statText}>{project.year}</Text>
              </View>
            )}
            {project.duration && (
              <View style={projDetailSt.statPill}>
                <Text style={projDetailSt.statIcon}>⏱</Text>
                <Text style={projDetailSt.statText}>{project.duration}</Text>
              </View>
            )}
            {project.role && (
              <View style={[projDetailSt.statPill, { flex: 1 }]}>
                <Text style={projDetailSt.statIcon}>👤</Text>
                <Text style={projDetailSt.statText} numberOfLines={1}>
                  {project.role}
                </Text>
              </View>
            )}
            {project.client && (
              <View style={projDetailSt.statPill}>
                <Text style={projDetailSt.statIcon}>🏢</Text>
                <Text style={projDetailSt.statText}>{project.client}</Text>
              </View>
            )}
          </View>

          {/* ── Video preview ── */}
          {project.videoUrl && (
            <Pressable
              style={({ pressed }) => [
                projDetailSt.videoCard,
                pressed && { opacity: 0.88 },
              ]}
              onPress={() => openLink(project.videoUrl!)}
            >
              {project.videoPoster ? (
                <Image
                  source={{ uri: project.videoPoster }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              ) : (
                <View style={[StyleSheet.absoluteFill, gradBg]} />
              )}
              <View style={projDetailSt.videoScrim} />
              <View style={projDetailSt.videoPlayBtn}>
                <Text style={projDetailSt.videoPlayIcon}>▶</Text>
              </View>
              <View style={projDetailSt.videoLabel}>
                <Text style={projDetailSt.videoLabelIcon}>🎬</Text>
                <Text style={projDetailSt.videoLabelText}>
                  Voir la vidéo de présentation
                </Text>
              </View>
            </Pressable>
          )}

          <View style={projDetailSt.body}>
            {/* ── Challenge ── */}
            {project.challenge && (
              <View style={projDetailSt.section}>
                <Text style={projDetailSt.sectionTitle}>
                  🎯 Problème résolu
                </Text>
                <View style={projDetailSt.challengeBox}>
                  <Text style={projDetailSt.challengeText}>
                    {project.challenge}
                  </Text>
                </View>
              </View>
            )}

            {/* ── Impact ── */}
            {project.highlights && project.highlights.length > 0 && (
              <View style={projDetailSt.section}>
                <Text style={projDetailSt.sectionTitle}>
                  ✅ Impact & résultats
                </Text>
                {project.highlights.map((h) => (
                  <View key={h} style={projDetailSt.bulletRow}>
                    <View
                      style={[
                        projDetailSt.bulletDot,
                        { backgroundColor: "#10b981" },
                      ]}
                    />
                    <Text style={projDetailSt.bulletText}>{h}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* ── Features ── */}
            {project.features && project.features.length > 0 && (
              <View style={projDetailSt.section}>
                <Text style={projDetailSt.sectionTitle}>
                  🚀 Fonctionnalités développées
                </Text>
                {project.features.map((f) => (
                  <View key={f} style={projDetailSt.bulletRow}>
                    <View
                      style={[
                        projDetailSt.bulletDot,
                        { backgroundColor: accentSafe },
                      ]}
                    />
                    <Text style={projDetailSt.bulletText}>{f}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* ── Back-office ── */}
            {project.backOffice && (
              <View style={projDetailSt.section}>
                <Text style={projDetailSt.sectionTitle}>
                  🖥️ Back-office web
                </Text>
                <View style={projDetailSt.backOfficeBox}>
                  <Text style={projDetailSt.backOfficeText}>
                    {project.backOffice}
                  </Text>
                </View>
              </View>
            )}

            {/* ── Stack ── */}
            <View style={projDetailSt.section}>
              <Text style={projDetailSt.sectionTitle}>🛠️ Stack technique</Text>
              <View style={projDetailSt.chips}>
                {project.stack.map((t) => (
                  <View
                    key={t}
                    style={[
                      projDetailSt.chip,
                      { borderColor: accentSafe + "55" },
                    ]}
                  >
                    <Text
                      style={[projDetailSt.chipText, { color: accentSafe }]}
                    >
                      {t}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* ── Links ── */}
            {hasLinks && (
              <View style={projDetailSt.section}>
                <Text style={projDetailSt.sectionTitle}>🔗 Liens</Text>
                <View style={projDetailSt.linksRow}>
                  {project.figmaUrl && (
                    <Pressable
                      style={({ pressed }) => [
                        projDetailSt.linkBtn,
                        { backgroundColor: "#7C3AED" },
                        pressed && { opacity: 0.85 },
                      ]}
                      onPress={() => openLink(project.figmaUrl!)}
                    >
                      <Text style={projDetailSt.linkBtnText}>
                        🎨 Figma · Design
                      </Text>
                    </Pressable>
                  )}
                  {project.demo && (
                    <Pressable
                      style={({ pressed }) => [
                        projDetailSt.linkBtn,
                        { backgroundColor: accentSafe },
                        pressed && { opacity: 0.85 },
                      ]}
                      onPress={() => openLink(project.demo!)}
                    >
                      <Text style={projDetailSt.linkBtnText}>
                        {project.category === "design"
                          ? "🔗 Voir le prototype"
                          : "🔗 Voir la démo"}
                      </Text>
                    </Pressable>
                  )}
                  {project.playStoreUrl && (
                    <Pressable
                      style={({ pressed }) => [
                        projDetailSt.linkBtn,
                        { backgroundColor: "#01875f" },
                        pressed && { opacity: 0.85 },
                      ]}
                      onPress={() => openLink(project.playStoreUrl!)}
                    >
                      <Text style={projDetailSt.linkBtnText}>▶ Play Store</Text>
                    </Pressable>
                  )}
                  {project.appStoreUrl && (
                    <Pressable
                      style={({ pressed }) => [
                        projDetailSt.linkBtn,
                        { backgroundColor: "#0a84ff" },
                        pressed && { opacity: 0.85 },
                      ]}
                      onPress={() => openLink(project.appStoreUrl!)}
                    >
                      <Text style={projDetailSt.linkBtnText}> App Store</Text>
                    </Pressable>
                  )}
                  {project.github && (
                    <Pressable
                      style={({ pressed }) => [
                        projDetailSt.linkBtn,
                        { backgroundColor: "#24292e" },
                        pressed && { opacity: 0.85 },
                      ]}
                      onPress={() => openLink(project.github!)}
                    >
                      <Text style={projDetailSt.linkBtnText}>GitHub</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )}

            {/* ── Contact CTA ── */}
            <Pressable
              style={({ pressed }) => [
                projDetailSt.ctaBtn,
                pressed && { opacity: 0.85 },
              ]}
              onPress={() => openLink("https://wa.me/22959000892")}
            >
              <Text style={projDetailSt.ctaBtnIcon}>💬</Text>
              <View>
                <Text style={projDetailSt.ctaBtnTitle}>
                  Démarrer un projet similaire
                </Text>
                <Text style={projDetailSt.ctaBtnSub}>
                  Réponse garantie sous 24h · NDA disponible
                </Text>
              </View>
              <Text style={projDetailSt.ctaBtnArrow}>→</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// ── FeedbackDialog ─────────────────────────────────────────────────────────────
function FeedbackDialog({
  type,
  onClose,
}: {
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, []);

  const isSuccess = type === "success";
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={contactDialogSt.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={contactDialogSt.dialog}>
          <Text style={contactDialogSt.icon}>{isSuccess ? "✅" : "⚠️"}</Text>
          <Text style={contactDialogSt.message}>
            {isSuccess
              ? "Votre message a été envoyé avec succès !"
              : "Veuillez remplir tous les champs requis."}
          </Text>
          <Pressable
            style={[
              contactDialogSt.okBtn,
              { backgroundColor: isSuccess ? "#22c55e" : "#ef4444" },
            ]}
            onPress={onClose}
          >
            <Text style={contactDialogSt.okBtnText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// ── TestimonialsCarousel ───────────────────────────────────────────────────────
function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  function fadeTo(index: number) {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setCurrent(index);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }

  useEffect(() => {
    const id = setInterval(
      () => fadeTo((current + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(id);
  }, [current]);

  const t = testimonials[current];
  return (
    <View
      // @ts-ignore
      className="testim-outer-rn"
      style={tsSt.outer}
    >
      <View style={tsSt.inner}>
        <Text style={tsSt.sectionTitle}>Témoignages</Text>
        <Text style={tsSt.sectionSubtitle}>
          Des clients satisfaits partagent leur expérience.
        </Text>
        <Animated.View style={[tsSt.card, { opacity }]}>
          <View style={tsSt.avatarWrap}>
            {t.imageUrl ? (
              <Image source={{ uri: t.imageUrl }} style={tsSt.avatar} />
            ) : (
              <View style={tsSt.avatarFallback}>
                <Text style={tsSt.avatarInitial}>{t.name[0]}</Text>
              </View>
            )}
          </View>
          {t.rating && <Text style={tsSt.stars}>{"★".repeat(t.rating)}</Text>}
          <Text style={tsSt.quote}>"{t.quote}"</Text>
          <Text style={tsSt.name}>{t.name}</Text>
          <Text style={tsSt.role}>{t.role}</Text>
        </Animated.View>
        <View style={tsSt.dots}>
          {testimonials.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => fadeTo(i)}
              style={[tsSt.dot, i === current && tsSt.dotActive]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

// ── FAQAccordion ───────────────────────────────────────────────────────────────
function FAQAccordion() {
  const [activeId, setActiveId] = useState<string | null>(null);

  function select(id: string) {
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setActiveId((prev) => (prev === id ? null : id));
  }

  return (
    <View style={fsSt.outer}>
      <View style={fsSt.inner}>
        <Text style={fsSt.sectionTitle}>FAQ</Text>
        <Text style={fsSt.sectionSubtitle}>
          Questions fréquentes pour tout savoir avant de démarrer.
        </Text>
        <View style={fsSt.list}>
          {faqEntries.map((item, i) => {
            const isOpen = activeId === item.id;
            return (
              <View
                key={item.id}
                style={[
                  fsSt.item,
                  i > 0 && fsSt.itemBorder,
                  isOpen && fsSt.itemActive,
                ]}
              >
                {/* Question */}
                <Pressable
                  onPress={() => select(item.id)}
                  style={({ pressed }) => [
                    fsSt.btn,
                    isOpen && fsSt.btnOpen,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  {/* Trait coloré à gauche quand sélectionné */}
                  {isOpen && <View style={fsSt.activeBar} />}
                  <Text style={[fsSt.btnText, isOpen && fsSt.btnTextActive]}>
                    {item.question}
                  </Text>
                  <Text style={[fsSt.chevron, isOpen && fsSt.chevronOpen]}>
                    {isOpen ? "▴" : "▾"}
                  </Text>
                </Pressable>

                {/* Réponse — affichée uniquement quand sélectionnée */}
                {isOpen && (
                  <View style={fsSt.content}>
                    <Text style={fsSt.contentText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// ── HomeScreen ─────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const { width, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width >= 992;
  const isMedium = width >= 768;
  const isSmall = width < 400;

  // ── WHY cards — fully responsive layout ─────────────────────────────────
  const whyPad = isSmall ? Spacing.two : Spacing.four;
  const whyCols = width >= 992 ? 4 : width >= 480 ? 2 : 1;
  const whyGap = Spacing.three;
  const whyAvail = Math.min(width, 1151) - 2 * whyPad;
  const whyCardW = Math.floor((whyAvail - (whyCols - 1) * whyGap) / whyCols);
  const whyCardPad = isSmall ? Spacing.two : width >= 480 ? 20 : Spacing.three;

  // ── Social icons — fully responsive layout ───────────────────────────────
  const SOCIALS_GAP = 12;
  const socialCols = width < 480 ? 3 : 6;
  const socialAvail = Math.min(width, 700) - 2 * Spacing.three;
  const socialItemW = Math.floor(
    (socialAvail - (socialCols - 1) * SOCIALS_GAP) / socialCols,
  );
  const socialCircleD = Math.max(40, Math.min(56, socialItemW - 10));
  const socialIconSize = Math.round(socialCircleD * 0.45);

  // ── Projects state ────────────────────────────────────────────────────────
  const [active, setActive] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  // ── Contact state ─────────────────────────────────────────────────────────
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cMessage, setCMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [dialog, setDialog] = useState<"success" | "error" | null>(null);

  // ── Skills card width ─────────────────────────────────────────────────────
  const CARD_GAP = 12;
  const H_PAD = Spacing.four * 2;
  const containerW = Math.min(width, 1151) - H_PAD;
  function skillCardWidth(cols: number) {
    return Math.floor((containerW - CARD_GAP * (cols - 1)) / cols);
  }
  function colsForCat(catName: string) {
    if (catName === "IA") return width >= 992 ? 3 : width >= 600 ? 2 : 1;
    return width >= 992 ? 4 : width >= 600 ? 3 : 2;
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  const cols = isDesktop ? 3 : isMedium ? 2 : 1;
  const projPad = Spacing.four;
  const projGap = Spacing.three;
  const projAvail = Math.min(width, 1151) - 2 * projPad;
  const projCardWidth = Math.floor((projAvail - (cols - 1) * projGap) / cols);
  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  // ── Contact submit ────────────────────────────────────────────────────────
  function handleSubmit() {
    if (!cName.trim() || !cEmail.trim() || !cMessage.trim()) {
      setDialog("error");
      return;
    }
    const subject = encodeURIComponent(`Message de ${cName}`);
    const body = encodeURIComponent(
      `Nom : ${cName}\nEmail : ${cEmail}\n\n${cMessage}`,
    );
    openLink(
      `mailto:orouabdoulayeissiaka@gmail.com?subject=${subject}&body=${body}`,
    );
    setDialog("success");
    setCName("");
    setCEmail("");
    setCMessage("");
  }

  const inputFor = (field: string) => [
    contactSt.input,
    focusedField === field && contactSt.inputFocused,
  ];

  // ── Hero gradient & height ────────────────────────────────────────────────
  const heroGradient =
    Platform.OS === "web"
      ? ({
          backgroundImage: "linear-gradient(120deg, #18142A 60%, #0FEDD3 100%)",
        } as any)
      : { backgroundColor: "#18142A" };

  const heroMinHeight =
    Platform.OS === "web"
      ? ({ minHeight: "100vh" } as any)
      : { minHeight: screenHeight };

  return (
    <View style={{ flex: 1, backgroundColor: "#18142A" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: BottomTabInset + Spacing.five }}
      >
        {/* ════════════════════════════════════════════════════════════
            1. HERO
        ════════════════════════════════════════════════════════════ */}
        <View style={[heroSt.heroOuter, heroGradient, heroMinHeight]}>
          <View
            style={[
              heroSt.heroContainer,
              isDesktop && heroSt.heroContainerDesktop,
            ]}
          >
            {/* Left */}
            <View
              style={[heroSt.heroLeft, isDesktop && heroSt.heroLeftDesktop]}
            >
              <Text
                style={[
                  heroSt.h1,
                  {
                    fontSize: isDesktop ? 45 : isMedium ? 34 : 26,
                    lineHeight: isDesktop ? 58 : isMedium ? 44 : 34,
                  },
                ]}
              >
                <Text style={{ color: "#0FEDD3" }}>
                  {"Vous rêvez d'une app mobile "}
                </Text>
                <Text style={{ color: "#FFFFFF" }}>
                  qui séduit, convertit et fidélise ?
                </Text>
              </Text>

              <Text
                style={[
                  heroSt.h2,
                  {
                    fontSize: isDesktop ? 35 : isMedium ? 26 : 21,
                    lineHeight: isDesktop ? 42 : isMedium ? 34 : 28,
                  },
                ]}
              >
                <Text style={{ color: "#FFFFFF" }}>Je m'appelle </Text>
                <Text style={{ color: "#0ea5e9" }}>{profile.name}</Text>
              </Text>

              <HeroTypewriter width={width} />

              <Text style={heroSt.heroPara}>
                {"Je développe en "}
                <Text style={heroSt.accent}>Flutter</Text>
                {" et "}
                <Text style={heroSt.accent}>React Native</Text>
                {
                  " — apps iOS & Android performantes, élégantes et prêtes à scaler. Besoin d'un "
                }
                <Text style={heroSt.accent}>back-office web</Text>
                {" ? Je m'en charge aussi.\n"}
                <Text style={heroSt.secretLabel}>Mon secret ? </Text>
                {
                  "Un mix de design émotionnel, de code robuste et d'écoute attentive pour créer des expériences qui marquent et font grandir votre business."
                }
              </Text>

              {/* Badge disponibilité */}
              <View style={heroSt.availBadge}>
                <View style={heroSt.availDot} />
                <Text style={heroSt.availText}>
                  Disponible · Remote · Afrique & Europe
                </Text>
              </View>

              <View style={heroSt.ctaRow}>
                <Pressable
                  style={({ pressed }) => [
                    heroSt.ctaPrimary,
                    pressed && { opacity: 0.85 },
                  ]}
                  onPress={() => router.push("/contact")}
                >
                  <Text style={heroSt.ctaPrimaryText}>
                    Discutons de votre projet
                  </Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    heroSt.ctaOutline,
                    pressed && { opacity: 0.85 },
                  ]}
                  onPress={() => {
                    if (Platform.OS === "web") {
                      const el = document.getElementById("projects");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      router.push("/projects");
                    }
                  }}
                >
                  <Text style={heroSt.ctaOutlineText}>
                    Voir mes réalisations
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Right — desktop only */}
            {isDesktop && (
              <View style={heroSt.heroRight}>
                <View style={heroSt.avatarWrap}>
                  <Image
                    source={require("@/assets/images/profil.png")}
                    style={heroSt.avatar}
                    resizeMode="contain"
                  />
                  <View style={heroSt.expBadge}>
                    <Text style={heroSt.expBadgeText}>
                      +{profile.yearsExperience} ans{"\n"}expérience
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={heroSt.decorCircle} />
        </View>

        {/* ════════════════════════════════════════════════════════════
            2. ABOUT / BIO
        ════════════════════════════════════════════════════════════ */}
        <View style={aboutSt.bioOuter}>
          <View style={[aboutSt.bioRow, isDesktop && aboutSt.bioRowDesktop]}>
            {/* Photo */}
            <View
              style={[aboutSt.photoCol, isDesktop && aboutSt.photoColDesktop]}
            >
              <View style={aboutSt.photoWrap}>
                <Image
                  source={require("@/assets/images/profil.png")}
                  style={aboutSt.profilePhoto}
                  resizeMode="contain"
                />
                <View style={aboutSt.photoGlow} />
              </View>
            </View>

            {/* Text */}
            <View
              style={[aboutSt.textCol, isDesktop && aboutSt.textColDesktop]}
            >
              <Text style={aboutSt.bioEyebrow}>À propos de moi</Text>
              <Text style={aboutSt.bioH2}>
                {getGreeting() + ", je suis "}
                <Text style={aboutSt.bioCyan}>Abdoulaye</Text>
              </Text>
              <Text style={aboutSt.bioPara}>
                {
                  "Expert Flutter & React Native, passionné par l'alliance entre technologie fonctionnelle et design intuitif. J'accompagne les startups et solopreneurs à transformer leurs idées en "
                }
                <Text style={aboutSt.bioCyan}>
                  applications mobiles concrètes, élégantes et prêtes à
                  conquérir le marché
                </Text>
                {" — avec back-office web intégré si le projet le demande."}
              </Text>
              <View style={aboutSt.missionBox}>
                <Text style={aboutSt.missionLabel}>Ma mission</Text>
                <Text style={aboutSt.missionText}>
                  {"🚀 "}
                  <Text style={aboutSt.bioCyan}>
                    Développement Flutter & React Native
                  </Text>
                  {" — apps performantes, scalables et multiplateformes.\n"}
                  {"🖥️ "}
                  <Text style={aboutSt.bioCyan}>Back-office web</Text>
                  {
                    " — inclus si le projet le nécessite, sans changer de prestataire.\n"
                  }
                  {"🎨 "}
                  <Text style={aboutSt.bioCyan}>Design UX/UI</Text>
                  {" — expériences fluides, esthétiques et efficaces."}
                </Text>
              </View>
              <View style={aboutSt.ctaRow}>
                <Pressable
                  style={({ pressed }) => [
                    aboutSt.ctaBtn,
                    pressed && { opacity: 0.85 },
                  ]}
                  onPress={() => {
                    if (Platform.OS === "web") {
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      router.push("/projects");
                    }
                  }}
                >
                  <Text style={aboutSt.ctaBtnText}>Voir mes projets</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    aboutSt.ctaBtnOutline,
                    pressed && { opacity: 0.85 },
                  ]}
                  onPress={() => {
                    if (Platform.OS === "web") {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      router.push("/contact");
                    }
                  }}
                >
                  <Text style={aboutSt.ctaBtnOutlineText}>Me contacter</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            3. COMPÉTENCES
        ════════════════════════════════════════════════════════════ */}
        <View style={aboutSt.skillsOuter}>
          <View style={aboutSt.skillsInner}>
            <Text style={aboutSt.sectionLabel}>Compétences</Text>
            <Text style={aboutSt.sectionTitle}>
              {"Stack "}
              {/* @ts-ignore */}
              <Text
                className="text-gradient-rn"
                style={[aboutSt.sectionTitleGrad, { color: "#6366f1" }]}
              >
                Techniques
              </Text>
            </Text>

            {skillCategories.map((cat) => {
              const isIA = cat.category === "IA";
              const skillCols = colsForCat(cat.category);
              const cw = skillCardWidth(skillCols);
              return (
                <View key={cat.category} style={aboutSt.catBlock}>
                  {/* @ts-ignore */}
                  <Text
                    className="text-gradient-rn"
                    style={[aboutSt.catTitle, { color: "#6366f1" }]}
                  >
                    {cat.category}
                  </Text>
                  <View style={[aboutSt.cardGrid, { gap: CARD_GAP }]}>
                    {cat.skills.map((sk) => (
                      <View
                        key={sk.name}
                        // @ts-ignore
                        className="skill-card-rn"
                        style={[
                          aboutSt.skillCard,
                          { width: cw },
                          isIA && aboutSt.skillCardIA,
                        ]}
                      >
                        <View
                          // @ts-ignore
                          className="skill-icon-rn"
                          style={aboutSt.iconWrap}
                        >
                          <Image
                            source={{ uri: sk.iconUrl }}
                            style={aboutSt.iconImg}
                            resizeMode="contain"
                          />
                        </View>
                        <Text style={aboutSt.skillName}>{sk.name}</Text>
                        <View style={aboutSt.levelBadge}>
                          <Text style={aboutSt.levelText}>{sk.level}</Text>
                        </View>
                        {isIA && sk.desc ? (
                          <Text style={aboutSt.skillDesc}>{sk.desc}</Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            4. FORMATION & EXPÉRIENCES
        ════════════════════════════════════════════════════════════ */}
        <View style={aboutSt.eduOuter}>
          <View style={aboutSt.eduInner}>
            <Text style={aboutSt.sectionLabel}>Mon parcours</Text>
            <Text style={aboutSt.sectionTitle}>
              {"Formation & "}
              {/* @ts-ignore */}
              <Text
                className="text-gradient-rn"
                style={[aboutSt.sectionTitleGrad, { color: "#6366f1" }]}
              >
                Expériences
              </Text>
            </Text>
            <Text style={aboutSt.sectionSub}>Académique et professionnel</Text>

            <View style={[aboutSt.eduRow, isDesktop && aboutSt.eduRowDesktop]}>
              <View style={aboutSt.eduCol}>
                {/* @ts-ignore */}
                <Text
                  className="text-gradient-rn"
                  style={[aboutSt.colTitle, { color: "#38bdf8" }]}
                >
                  📚 Formation
                </Text>
                <View style={aboutSt.timeline}>
                  <View
                    // @ts-ignore
                    className="timeline-line-rn"
                    style={aboutSt.timelineLine}
                  />
                  {educationEntries.map((e) => (
                    <GlassCard key={e.id} entry={e} />
                  ))}
                </View>
              </View>

              <View style={aboutSt.eduCol}>
                {/* @ts-ignore */}
                <Text
                  className="text-gradient-rn"
                  style={[aboutSt.colTitle, { color: "#38bdf8" }]}
                >
                  💼 Expérience
                </Text>
                <View style={aboutSt.timeline}>
                  <View
                    // @ts-ignore
                    className="timeline-line-rn"
                    style={aboutSt.timelineLine}
                  />
                  {experienceEntries.map((e) => (
                    <GlassCard key={e.id} entry={e} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            5. POURQUOI ME CHOISIR
        ════════════════════════════════════════════════════════════ */}
        <View style={heroSt.whyOuter}>
          <View style={[heroSt.whyInner, { paddingHorizontal: whyPad }]}>
            <Text
              style={[
                heroSt.whySectionTitle,
                {
                  fontSize: isDesktop ? 36 : isMedium ? 30 : isSmall ? 22 : 26,
                },
              ]}
            >
              Pourquoi me choisir ?
            </Text>
            <Text
              style={[
                heroSt.whySectionSubtitle,
                { fontSize: isSmall ? 13 : isMedium ? 17 : 15 },
              ]}
            >
              Expertise mobile & UX, accompagnement humain, résultats concrets :
              découvrez ce qui fait la différence.
            </Text>
            <View style={heroSt.whyCardsRow}>
              {WHY_ITEMS.map((w) => (
                <View
                  key={w.title}
                  // @ts-ignore
                  className="why-card-rn"
                  style={[
                    heroSt.whyCard,
                    { width: whyCardW, padding: whyCardPad },
                  ]}
                >
                  <View
                    style={[
                      heroSt.whyIconWrap,
                      {
                        width: isSmall ? 44 : 56,
                        height: isSmall ? 44 : 56,
                        borderRadius: isSmall ? 22 : 28,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        heroSt.whyIconEmoji,
                        { fontSize: isSmall ? 20 : 26 },
                      ]}
                    >
                      {w.icon}
                    </Text>
                  </View>
                  <Text
                    style={[
                      heroSt.whyCardTitle,
                      { fontSize: isSmall ? 13 : 15 },
                    ]}
                  >
                    {w.title}
                  </Text>
                  <Text
                    style={[
                      heroSt.whyCardDesc,
                      {
                        fontSize: isSmall ? 12 : 13,
                        lineHeight: isSmall ? 18 : 20,
                      },
                    ]}
                  >
                    {w.desc}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            6. SERVICES
        ════════════════════════════════════════════════════════════ */}
        <View style={heroSt.svcOuter} nativeID="services">
          <View style={heroSt.svcInner}>
            <Text style={heroSt.svcSectionTitle}>
              {"Mes "}
              <Text style={heroSt.svcSectionTitleAccent}>Services</Text>
            </Text>
            <View
              style={[heroSt.svcCardsRow, isMedium && heroSt.svcCardsRowMedium]}
            >
              {services.map((s) => (
                <View
                  key={s.id}
                  // @ts-ignore
                  className="svc-card-rn"
                  style={[heroSt.svcCard, isMedium && heroSt.svcCardMedium]}
                >
                  {s.badge && (
                    <View style={heroSt.svcBadge}>
                      <Text style={heroSt.svcBadgeText}>{s.badge}</Text>
                    </View>
                  )}
                  <View style={heroSt.svcIconWrap}>
                    <Text style={heroSt.svcIconEmoji}>{s.icon}</Text>
                  </View>
                  <Text style={heroSt.svcCardTitle}>{s.title}</Text>
                  <Text style={heroSt.svcCardDesc}>{s.description}</Text>
                  {s.price && <Text style={heroSt.svcPrice}>{s.price}</Text>}
                  {s.duration && (
                    <Text style={heroSt.svcDuration}>⏱ {s.duration}</Text>
                  )}
                  <Pressable
                    style={({ pressed }) => [
                      heroSt.svcBtn,
                      pressed && { opacity: 0.85 },
                    ]}
                    onPress={() => router.push("/contact")}
                  >
                    <Text style={heroSt.svcBtnText}>{s.cta}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            7. STATS
        ════════════════════════════════════════════════════════════ */}
        <View style={[heroSt.centered, { backgroundColor: "#1E192D" }]}>
          <View style={heroSt.section}>
            <View
              style={[
                heroSt.statsStrip,
                {
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(14,165,233,0.15)",
                },
              ]}
            >
              {STATS.map((s, i) => (
                <View
                  key={s.label}
                  style={[
                    heroSt.statItem,
                    i < STATS.length - 1 && {
                      borderRightWidth: 1,
                      borderRightColor: "rgba(255,255,255,0.08)",
                    },
                  ]}
                >
                  <Text style={[heroSt.statValue, { color: "#0ea5e9" }]}>
                    {s.value}
                  </Text>
                  <Text
                    style={[
                      heroSt.statLabel,
                      { color: "rgba(255,255,255,0.70)" },
                    ]}
                  >
                    {s.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            9. PROCESSUS
        ════════════════════════════════════════════════════════════ */}
        <View style={heroSt.procOuter}>
          <View style={heroSt.procInner}>
            <Text style={heroSt.procSectionTitle}>
              Mon Processus de Développement
            </Text>
            <Text style={heroSt.procSectionSubtitle}>
              De l'idée au déploiement, une méthodologie éprouvée et
              transparente.
            </Text>
            <View
              style={[
                heroSt.procStepsRow,
                isDesktop && heroSt.procStepsRowDesktop,
              ]}
            >
              {PROCESS_STEPS.flatMap((step, i) => {
                const card = (
                  <View
                    key={step.num}
                    style={[
                      heroSt.procCard,
                      isDesktop && heroSt.procCardDesktop,
                    ]}
                  >
                    <View
                      style={[
                        heroSt.procNumCircle,
                        Platform.OS === "web"
                          ? ({ backgroundImage: step.grad } as any)
                          : { backgroundColor: step.grad as string },
                      ]}
                    >
                      <Text style={heroSt.procNumText}>{step.num}</Text>
                    </View>
                    <Text style={heroSt.procCardTitle}>{step.title}</Text>
                    <Text style={heroSt.procCardDesc}>
                      {step.desc}
                      {step.highlight ? (
                        <Text style={heroSt.procCardHighlight}>
                          {"\n"}
                          {step.highlight}
                        </Text>
                      ) : null}
                    </Text>
                  </View>
                );
                const arrow =
                  isDesktop && i < PROCESS_STEPS.length - 1 ? (
                    <View key={`a${i}`} style={heroSt.procArrow}>
                      <Text style={heroSt.procArrowText}>→</Text>
                    </View>
                  ) : null;
                return arrow ? [card, arrow] : [card];
              })}
            </View>
            <View
              // @ts-ignore
              className="proc-badge-rn"
              style={heroSt.procBadge}
            >
              <Text style={heroSt.procBadgeText}>
                ⚡ Développement rapide et qualité premium
              </Text>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            9. PROJETS
        ════════════════════════════════════════════════════════════ */}
        <View style={projSt.outer} nativeID="projects">
          <View style={projSt.inner}>
            <View style={projSt.titleWrap}>
              <Text style={projSt.sectionTitle}>
                {"Mes "}
                {/* @ts-ignore */}
                <Text
                  className="text-gradient-rn"
                  style={projSt.sectionTitleAccent}
                >
                  Projets
                </Text>
              </Text>
              <Text style={projSt.subtitle}>
                Applications mobiles & design livrés en production — du MVP au
                produit complet
              </Text>
            </View>

            <View style={projSt.filterRow}>
              {FILTERS.map((f) => {
                const isActive = f.key === active;
                return (
                  <Pressable
                    key={f.key}
                    onPress={() => setActive(f.key)}
                    // @ts-ignore
                    className={
                      isActive ? "filter-btn-rn active" : "filter-btn-rn"
                    }
                    style={({ pressed }) => [
                      projSt.filterBtn,
                      isActive && projSt.filterBtnActive,
                      pressed && { opacity: 0.85 },
                    ]}
                  >
                    <Text
                      style={[
                        projSt.filterText,
                        isActive && projSt.filterTextActive,
                      ]}
                    >
                      {f.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {filtered.length === 0 ? (
              <View style={projSt.emptyWrap}>
                <Text style={projSt.emptyText}>📁 Aucun projet trouvé.</Text>
              </View>
            ) : (
              <View style={projSt.grid}>
                {filtered.map((p) => (
                  <ProjCard
                    key={p.id}
                    project={p}
                    cardWidth={projCardWidth}
                    onPress={() => setSelected(p)}
                  />
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            10. TÉMOIGNAGES
        ════════════════════════════════════════════════════════════ */}
        <TestimonialsCarousel />

        {/* ════════════════════════════════════════════════════════════
            11. FAQ
        ════════════════════════════════════════════════════════════ */}
        <FAQAccordion />

        {/* ════════════════════════════════════════════════════════════
            12. RÉFÉRENCES CLIENTS
        ════════════════════════════════════════════════════════════ */}
        <View style={trustedSt.outer}>
          <View style={trustedSt.inner}>
            <Text style={trustedSt.overline}>RÉFÉRENCES CLIENTS</Text>
            <Text style={trustedSt.title}>
              {"Ils m'ont fait "}
              {/* @ts-ignore */}
              <Text className="text-gradient-rn" style={trustedSt.titleAccent}>
                confiance
              </Text>
            </Text>
            <View
              style={[trustedSt.cards, isMedium && { flexDirection: "row" }]}
            >
              {CLIENTS.map((c) => (
                <View
                  key={c.name}
                  style={[trustedSt.card, isMedium && { flex: 1 }]}
                >
                  <View
                    style={[
                      trustedSt.logoWrap,
                      { backgroundColor: c.color + "22" },
                    ]}
                  >
                    <View
                      style={[trustedSt.logo, { backgroundColor: c.color }]}
                    >
                      <Text style={trustedSt.logoText}>{c.abbr}</Text>
                    </View>
                  </View>
                  <View style={trustedSt.cardBody}>
                    <View style={trustedSt.cardHead}>
                      <Text style={trustedSt.clientName}>{c.name}</Text>
                      <Text style={trustedSt.clientSector}>{c.sector}</Text>
                    </View>
                    <View style={trustedSt.scopeRow}>
                      <Text style={trustedSt.scopeLabel}>Rôle : </Text>
                      <Text style={trustedSt.scopeValue}>{c.scope}</Text>
                    </View>
                    <View style={trustedSt.tags}>
                      {c.projects.map((p) => (
                        <View
                          key={p}
                          style={[
                            trustedSt.tag,
                            { borderColor: c.color + "66" },
                          ]}
                        >
                          <Text style={[trustedSt.tagText, { color: c.color }]}>
                            {p}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <View style={trustedSt.resultRow}>
                      <Text style={trustedSt.resultIcon}>✅</Text>
                      <Text style={trustedSt.resultText}>{c.result}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════════════════
            13. CONTACT
        ════════════════════════════════════════════════════════════ */}
        <View style={contactSt.outer} nativeID="contact">
          <View style={contactSt.inner}>
            <Text style={contactSt.sectionTitle}>Contact</Text>
            <View style={contactSt.responseInfo}>
              <Text style={contactSt.responseItem}>
                ⏱ Réponse sous 4h en moyenne
              </Text>
              <Text style={contactSt.responseItem}>
                📅 Premier échange offert — 30 min
              </Text>
              <Pressable
                onPress={() => openLink("https://wa.me/22959000892")}
                style={({ pressed }) => [
                  contactSt.waBtn,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={contactSt.waBtnText}>
                  💬 WhatsApp direct : +229 59 000 892
                </Text>
              </Pressable>
              <Text style={contactSt.ndaNote}>
                🔒 NDA disponible sur demande · Vos idées restent
                confidentielles
              </Text>
            </View>
            <View style={contactSt.formCard}>
              <View style={contactSt.fieldWrap}>
                <Text style={contactSt.label}>Nom</Text>
                <TextInput
                  // @ts-ignore
                  className="contact-input-rn"
                  style={inputFor("name")}
                  placeholder="Votre nom"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={cName}
                  onChangeText={setCName}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <View style={contactSt.fieldWrap}>
                <Text style={contactSt.label}>Email</Text>
                <TextInput
                  // @ts-ignore
                  className="contact-input-rn"
                  style={inputFor("email")}
                  placeholder="Votre email"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={cEmail}
                  onChangeText={setCEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <View style={contactSt.fieldWrap}>
                <Text style={contactSt.label}>Message</Text>
                <TextInput
                  // @ts-ignore
                  className="contact-input-rn"
                  style={[...inputFor("message"), contactSt.textarea]}
                  placeholder="Décrivez votre idée ou projet — même floue, on s'en occupe ensemble !"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={cMessage}
                  onChangeText={setCMessage}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <Pressable
                // @ts-ignore
                className="contact-btn-rn"
                style={({ pressed }) => [
                  contactSt.submitBtn,
                  pressed && { opacity: 0.85 },
                ]}
                onPress={handleSubmit}
              >
                <Text style={contactSt.submitText}>Envoyer</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Réseaux sociaux */}
        <View style={contactSt.socialsOuter}>
          <View style={contactSt.socialsInner}>
            <Text style={contactSt.socialsTitle}>Retrouvez-moi sur</Text>
            <View style={[contactSt.socialsRow, { gap: SOCIALS_GAP }]}>
              {profile.socials.map((s) => (
                <Pressable
                  key={s.label}
                  onPress={() => openLink(s.href)}
                  style={({ pressed }) => [
                    contactSt.socialItem,
                    { width: socialItemW },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <View
                    style={[
                      contactSt.socialCircle,
                      {
                        width: socialCircleD,
                        height: socialCircleD,
                        borderRadius: socialCircleD / 2,
                        backgroundColor: SOCIAL_COLORS[s.label] ?? "#0ea5e9",
                      },
                    ]}
                  >
                    {s.label === "GitHub" ? (
                      <FontAwesome
                        name="github"
                        size={socialIconSize}
                        color="#FFFFFF"
                      />
                    ) : (
                      <Text
                        style={[
                          contactSt.socialCircleIcon,
                          { fontSize: socialIconSize },
                        ]}
                      >
                        {s.icon}
                      </Text>
                    )}
                  </View>
                  <Text style={contactSt.socialCircleLabel}>{s.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {selected && (
        <ProjDetail project={selected} onClose={() => setSelected(null)} />
      )}
      {dialog && (
        <FeedbackDialog type={dialog} onClose={() => setDialog(null)} />
      )}
    </View>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STYLESHEETS
// ══════════════════════════════════════════════════════════════════════════════

// ── Hero / Why / Services / Stats / Process ───────────────────────────────────
const heroSt = StyleSheet.create({
  heroOuter: {
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    paddingVertical: Platform.OS === "web" ? 100 : 80,
  },
  heroContainer: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
    flexDirection: "column",
    gap: Spacing.five,
    position: "relative",
    zIndex: 2,
  },
  heroContainerDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLeft: { gap: Spacing.three },
  heroLeftDesktop: { flex: 7, maxWidth: "60%" },
  h1: { fontWeight: "800" },
  h2: { fontWeight: "700" },
  typewriter: { fontWeight: "700" },
  heroPara: { fontSize: 18, color: "#FFFFFF", lineHeight: 28, maxWidth: 600 },
  accent: { color: "#0ea5e9", fontWeight: "500" },
  secretLabel: { color: "#0ea5e9", fontWeight: "700" },
  ctaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
    alignItems: "center",
    marginTop: Spacing.one,
  },
  ctaPrimary: {
    backgroundColor: "#0FEDD3",
    paddingVertical: 14,
    paddingHorizontal: Spacing.five,
    borderRadius: 40,
    minWidth: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  ctaPrimaryText: { color: "#18142A", fontWeight: "700", fontSize: 17 },
  ctaOutline: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: Spacing.five,
    borderRadius: 40,
    minWidth: 180,
    alignItems: "center",
  },
  ctaOutlineText: { color: "#FFFFFF", fontWeight: "700", fontSize: 17 },

  heroRight: { flex: 5, alignItems: "center", justifyContent: "center" },
  avatarWrap: {
    position: "relative",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(15,237,211,0.35)",
    shadowColor: "#0FEDD3",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 14,
    backgroundColor: "#1a1530",
  },
  avatar: { width: 420, height: 520 },
  expBadge: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#0FEDD3",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  expBadgeText: {
    color: "#18142A",
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
  },
  availBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(15,237,211,0.1)",
    borderWidth: 1,
    borderColor: "rgba(15,237,211,0.3)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 4,
  },
  availDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0FEDD3",
  },
  availText: {
    color: "#0FEDD3",
    fontSize: 13,
    fontWeight: "600",
  },
  decorCircle: {
    position: "absolute",
    right: -120,
    bottom: -120,
    width: 320,
    height: 320,
    backgroundColor: "rgba(15,237,211,0.12)",
    borderRadius: 160,
    zIndex: 1,
  },

  centered: {
    alignSelf: "center",
    width: "100%",
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
  },
  section: {
    paddingVertical: Spacing.five,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  whyOuter: { backgroundColor: "#18142A", paddingVertical: 64 },
  whyInner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
  },
  whySectionTitle: {
    fontWeight: "800",
    color: "#0ea5e9",
    textAlign: "center",
    marginBottom: Spacing.three,
  },
  whySectionSubtitle: {
    color: "#FFFFFF",
    textAlign: "center",
    maxWidth: 700,
    lineHeight: 26,
    marginBottom: Spacing.five,
  },
  whyCardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    gap: Spacing.three,
    width: "100%",
  },
  whyCard: {
    backgroundColor: "#212529",
    borderRadius: 16,
    alignItems: "center",
    gap: Spacing.two,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  whyIconWrap: {
    backgroundColor: "rgba(14,165,233,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  whyIconEmoji: {},
  whyCardTitle: {
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  whyCardDesc: {
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },

  svcOuter: { backgroundColor: "#1E192D", paddingVertical: 64 },
  svcInner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
  },
  svcSectionTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.five,
  },
  svcSectionTitleAccent: { fontSize: 34, fontWeight: "800", color: "#0ea5e9" },
  svcCardsRow: { flexDirection: "column", gap: Spacing.three, width: "100%" },
  svcCardsRowMedium: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  svcCard: {
    backgroundColor: "#212529",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: Spacing.two,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  svcCardMedium: { flex: 1, maxWidth: 360 },
  svcIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(14,165,233,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  svcIconEmoji: { fontSize: 36 },
  svcCardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0ea5e9",
    textAlign: "center",
  },
  svcCardDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 22,
    flex: 1,
  },
  svcBadge: {
    backgroundColor: "rgba(14,165,233,0.15)",
    borderWidth: 1,
    borderColor: "rgba(14,165,233,0.4)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "center",
    marginBottom: 4,
  },
  svcBadgeText: { color: "#0ea5e9", fontSize: 12, fontWeight: "700" },
  svcPrice: {
    color: "#0FEDD3",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
  },
  svcDuration: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    textAlign: "center",
  },
  svcBtn: {
    marginTop: Spacing.two,
    backgroundColor: "#0ea5e9",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: "center",
  },
  svcBtnText: { color: "#FFFFFF", fontWeight: "600", fontSize: 15 },

  statsStrip: {
    flexDirection: "row",
    borderRadius: Spacing.two,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
  },
  statItem: {
    flex: 1,
    paddingVertical: Spacing.three,
    alignItems: "center",
    gap: 2,
  },
  statValue: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  statLabel: { fontSize: 13, textAlign: "center", opacity: 0.75 },

  procOuter: { backgroundColor: "#18142A", paddingVertical: 64 },
  procInner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
  },
  procSectionTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0ea5e9",
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  procSectionSubtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.five,
    lineHeight: 28,
  },
  procStepsRow: { flexDirection: "column", gap: Spacing.three, width: "100%" },
  procStepsRowDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  procCard: {
    backgroundColor: "#212529",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: Spacing.two,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  procCardDesktop: { flex: 1 },
  procNumCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  procNumText: { color: "#FFFFFF", fontWeight: "800", fontSize: 28 },
  procCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0ea5e9",
    textAlign: "center",
  },
  procCardDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 22,
  },
  procCardHighlight: { color: "#0ea5e9", fontWeight: "600" },
  procArrow: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    flexShrink: 0,
  },
  procArrowText: { fontSize: 32, color: "#0ea5e9" },
  procBadge: {
    marginTop: Spacing.five,
    backgroundColor: "#0ea5e9",
    paddingVertical: 14,
    paddingHorizontal: Spacing.five,
    borderRadius: 40,
    alignItems: "center",
  },
  procBadgeText: { color: "#FFFFFF", fontWeight: "600", fontSize: 17 },
});

// ── About / Skills / Education ────────────────────────────────────────────────
const aboutSt = StyleSheet.create({
  bioOuter: {
    backgroundColor: "#1E192D",
    paddingVertical: Spacing.six,
  },
  bioRow: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.five,
  },
  bioRowDesktop: { flexDirection: "row", alignItems: "center" },
  photoCol: { alignItems: "center" },
  photoColDesktop: { flex: 5 },
  photoWrap: {
    position: "relative",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(15,237,211,0.35)",
    shadowColor: "#0FEDD3",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 14,
    backgroundColor: "#1a1530",
  },
  profilePhoto: { width: 340, height: 430 },
  photoGlow: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(15,237,211,0.15)",
  },
  textCol: { gap: Spacing.three },
  textColDesktop: { flex: 7 },
  bioEyebrow: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0ea5e9",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  bioH2: { fontSize: 30, fontWeight: "800", color: "#FFFFFF", lineHeight: 38 },
  bioCyan: { color: "#0ea5e9", fontWeight: "700" },
  bioPara: { fontSize: 16, color: "rgba(255,255,255,0.82)", lineHeight: 26 },
  missionBox: {
    backgroundColor: "rgba(14,165,233,0.06)",
    borderLeftWidth: 3,
    borderLeftColor: "#0ea5e9",
    borderRadius: 10,
    padding: Spacing.three,
    gap: 6,
  },
  missionLabel: { color: "#0ea5e9", fontWeight: "700", fontSize: 13 },
  missionText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    lineHeight: 24,
  },
  ctaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
    marginTop: 4,
  },
  ctaBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 12,
    paddingHorizontal: Spacing.four,
    borderRadius: 40,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
  ctaBtnOutline: {
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
    paddingVertical: 12,
    paddingHorizontal: Spacing.four,
    borderRadius: 40,
  },
  ctaBtnOutlineText: { color: "#FFFFFF", fontWeight: "600", fontSize: 15 },

  skillsOuter: { backgroundColor: "#18122B", paddingVertical: Spacing.six },
  skillsInner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
  },
  sectionLabel: {
    color: "#0ea5e9",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  sectionTitleGrad: { fontSize: 30, fontWeight: "800" },
  sectionSub: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    textAlign: "center",
    marginBottom: Spacing.five,
  },
  catBlock: { marginBottom: Spacing.five },
  catTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: Spacing.two,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(99,102,241,0.25)",
    letterSpacing: 0.5,
  },
  cardGrid: { flexDirection: "row", flexWrap: "wrap" },
  skillCard: {
    backgroundColor: "#1E192D",
    borderRadius: 16,
    padding: Spacing.three,
    alignItems: "center",
    gap: 8,
    minHeight: 130,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  skillCardIA: {
    minHeight: 220,
    justifyContent: "flex-start",
    paddingTop: Spacing.three,
    gap: 8,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  iconImg: { width: 36, height: 36 },
  skillName: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  levelBadge: {
    backgroundColor: "rgba(99,102,241,0.18)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  levelText: {
    color: "#a5b4fc",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  skillDesc: {
    fontSize: 12,
    color: "rgba(255,255,255,0.72)",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 4,
    flex: 1,
  },

  eduOuter: { backgroundColor: "#1E192D", paddingVertical: Spacing.six },
  eduInner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
  },
  eduRow: {
    flexDirection: "column",
    gap: Spacing.five,
    marginTop: Spacing.five,
  },
  eduRowDesktop: { flexDirection: "row", alignItems: "flex-start" },
  eduCol: { flex: 1 },
  colTitle: { fontSize: 17, fontWeight: "700", marginBottom: Spacing.four },
  timeline: { position: "relative", paddingLeft: 28 },
  timelineLine: { position: "absolute", left: 8, top: 0, bottom: 0, width: 2 },
});

// ── GlassCard ─────────────────────────────────────────────────────────────────
const glSt = StyleSheet.create({
  item: { position: "relative", marginBottom: Spacing.four },
  dot: {
    position: "absolute",
    left: -20,
    top: 14,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#38bdf8",
    shadowColor: "#38bdf8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: 1,
  },
  card: {
    backgroundColor: "rgba(30,25,45,0.95)",
    borderRadius: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#38bdf8",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  title: { color: "#FFFFFF", fontWeight: "700", fontSize: 15, marginBottom: 4 },
  meta: { color: "rgba(255,255,255,0.70)", fontSize: 12, marginBottom: 6 },
  desc: { color: "rgba(255,255,255,0.82)", fontSize: 13, lineHeight: 20 },
});

// ── Projects section ──────────────────────────────────────────────────────────
const projSt = StyleSheet.create({
  outer: { backgroundColor: "#1E192D", paddingVertical: 64 },
  inner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
  },
  titleWrap: { alignItems: "center", marginBottom: Spacing.five },
  sectionTitle: {
    fontSize: 38,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  sectionTitleAccent: { fontSize: 38, fontWeight: "800" },
  subtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 16,
    textAlign: "center",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: Spacing.two,
    marginBottom: Spacing.five,
  },
  filterBtn: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "transparent",
  },
  filterBtnActive: { backgroundColor: "#6366f1", borderColor: "transparent" },
  filterText: { fontSize: 14, fontWeight: "600", color: "#bbb" },
  filterTextActive: { color: "#fff" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
    justifyContent: "flex-start",
  },
  emptyWrap: { alignItems: "center", paddingVertical: Spacing.five },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    textAlign: "center",
  },
});

// ── Project card ──────────────────────────────────────────────────────────────
const projCardSt = StyleSheet.create({
  pressable: { marginBottom: Spacing.three },
  card: {
    backgroundColor: "#18122B",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  imgArea: {
    height: 220,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  gradOverlay: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  initials: {
    fontSize: 64,
    fontWeight: "900",
    color: "rgba(255,255,255,0.2)",
    letterSpacing: 4,
  },
  catBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  catBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  featuredBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  featuredText: { color: "#FBBF24", fontSize: 11, fontWeight: "700" },
  durationBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  durationText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  iconOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(99,102,241,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  body: { backgroundColor: "#212529", padding: 20, gap: Spacing.two },
  title: { color: "#FFFFFF", fontWeight: "700", fontSize: 18 },
  desc: { color: "rgba(255,255,255,0.78)", fontSize: 13, lineHeight: 20 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  chipText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    fontWeight: "600",
  },
  ctaRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
    paddingTop: Spacing.two,
    marginTop: Spacing.one,
  },
  ctaText: {
    color: "#6366f1",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

// ── Project detail (full-screen) ──────────────────────────────────────────────
const projDetailSt = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0F0A1E" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.four,
    paddingVertical: 12,
    backgroundColor: "#0F0A1E",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingRight: Spacing.two,
  },
  backArrow: { color: "#FFFFFF", fontSize: 20, fontWeight: "300" },
  backLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    fontWeight: "600",
  },
  catPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  catPillText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  hero: {
    height: 300,
    position: "relative",
    justifyContent: "flex-end",
  },
  heroScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  heroContent: {
    padding: Spacing.four,
    gap: 6,
  },
  featuredPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 4,
  },
  featuredPillText: { color: "#FBBF24", fontSize: 12, fontWeight: "700" },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
  },
  heroSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: "#18122B",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statIcon: { fontSize: 13 },
  statText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
  },
  body: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.five,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  section: { gap: Spacing.two },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  challengeBox: {
    backgroundColor: "rgba(239,68,68,0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "#ef4444",
    borderRadius: 8,
    padding: Spacing.three,
  },
  challengeText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 7,
    flexShrink: 0,
  },
  bulletText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  backOfficeBox: {
    backgroundColor: "rgba(99,102,241,0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "#6366f1",
    borderRadius: 8,
    padding: Spacing.three,
  },
  backOfficeText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 22,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  chipText: { fontSize: 13, fontWeight: "600" },
  linksRow: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.two },
  linkBtn: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
  linkBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    backgroundColor: "#25D366",
    borderRadius: 16,
    padding: Spacing.four,
    marginTop: Spacing.two,
  },
  ctaBtnIcon: { fontSize: 28 },
  ctaBtnTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
  ctaBtnSub: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 },
  ctaBtnArrow: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    marginLeft: "auto",
  },
  videoCard: {
    height: 220,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  videoScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.48)",
  },
  videoPlayBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.92)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  videoPlayIcon: {
    fontSize: 26,
    color: "#1a1a2e",
    marginLeft: 4,
  },
  videoLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: Spacing.four,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  videoLabelIcon: { fontSize: 16 },
  videoLabelText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

// ── Trusted-by (references) ───────────────────────────────────────────────────
const trustedSt = StyleSheet.create({
  outer: { backgroundColor: "#12102B", paddingVertical: 64 },
  inner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1000,
    paddingHorizontal: Spacing.four,
  },
  overline: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 3,
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.five,
  },
  titleAccent: { fontSize: 34, fontWeight: "800" },
  cards: {
    flexDirection: "column",
    gap: Spacing.three,
  },
  card: {
    backgroundColor: "#1A1530",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  logoWrap: {
    width: 90,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.three,
    flexShrink: 0,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  logoText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  cardBody: {
    flex: 1,
    padding: Spacing.four,
    gap: 10,
  },
  cardHead: { gap: 2 },
  clientName: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 18,
  },
  clientSector: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
  },
  scopeRow: { flexDirection: "row", alignItems: "center" },
  scopeLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "600",
  },
  scopeValue: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "700",
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  tagText: { fontSize: 11, fontWeight: "700" },
  resultRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    backgroundColor: "rgba(16,185,129,0.08)",
    borderRadius: 8,
    padding: 10,
  },
  resultIcon: { fontSize: 14 },
  resultText: {
    color: "#10b981",
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
  },
});

// ── Contact ───────────────────────────────────────────────────────────────────
const contactSt = StyleSheet.create({
  outer: { backgroundColor: "#18142A", paddingVertical: 64 },
  inner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 700,
    paddingHorizontal: Spacing.four,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.five,
  },
  formCard: { gap: Spacing.three },
  fieldWrap: { gap: 6 },
  label: { color: "#0ea5e9", fontWeight: "600", fontSize: 14 },
  input: {
    backgroundColor: "#212529",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputFocused: { borderColor: "#0ea5e9" },
  textarea: { height: 130, paddingTop: 12 },
  responseInfo: {
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  responseItem: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    textAlign: "center",
  },
  waBtn: {
    backgroundColor: "#25D366",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: "center",
  },
  waBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  ndaNote: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    textAlign: "center",
    fontStyle: "italic",
  },
  submitBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 13,
    paddingHorizontal: Spacing.five,
    borderRadius: 40,
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: Spacing.one,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  socialsOuter: { backgroundColor: "#1E192D", paddingVertical: 48 },
  socialsInner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 700,
    paddingHorizontal: Spacing.three,
    alignItems: "center",
  },
  socialsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Spacing.four,
    textAlign: "center",
  },
  socialsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    paddingVertical: Spacing.two,
  },
  socialItem: {
    alignItems: "center",
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  socialCircle: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  socialCircleIcon: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  socialCircleLabel: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
});

// ── Contact feedback dialog ───────────────────────────────────────────────────
const contactDialogSt = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.four,
  },
  dialog: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    minWidth: 280,
    maxWidth: 440,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },
  icon: { fontSize: 48, marginBottom: 12 },
  message: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1a1a2e",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  okBtn: { paddingVertical: 10, paddingHorizontal: 32, borderRadius: 30 },
  okBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
});

// ── FAQ ───────────────────────────────────────────────────────────────────────
const fsSt = StyleSheet.create({
  outer: { backgroundColor: "#1E192D", paddingVertical: 64 },
  inner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1151,
    paddingHorizontal: Spacing.four,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0ea5e9",
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Spacing.five,
    lineHeight: 28,
  },
  list: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    overflow: "hidden",
  },
  item: { backgroundColor: "#212529" },
  itemBorder: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  itemActive: {
    backgroundColor: "#1a2535",
    borderLeftWidth: 3,
    borderLeftColor: "#0ea5e9",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: Spacing.three,
    position: "relative",
  },
  btnOpen: { backgroundColor: "rgba(14,165,233,0.08)" },
  activeBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: "#0ea5e9",
    borderRadius: 2,
  },
  btnText: {
    color: "rgba(255,255,255,0.82)",
    fontWeight: "600",
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  btnTextActive: {
    color: "#0ea5e9",
    fontWeight: "700",
  },
  chevron: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    fontWeight: "700",
    flexShrink: 0,
  },
  chevronOpen: { color: "#0ea5e9" },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(14,165,233,0.15)",
    backgroundColor: "rgba(14,165,233,0.04)",
  },
  contentText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    lineHeight: 26,
  },
});

// ── Testimonials ──────────────────────────────────────────────────────────────
const tsSt = StyleSheet.create({
  outer: { backgroundColor: "#18142A", paddingVertical: 64 },
  inner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 900,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0ea5e9",
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  sectionSubtitle: {
    fontSize: 17,
    color: "rgba(255,255,255,0.72)",
    textAlign: "center",
    marginBottom: Spacing.five,
  },
  card: {
    backgroundColor: "rgba(24,18,43,0.92)",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(56,189,248,0.18)",
    padding: 36,
    alignItems: "center",
    width: "100%",
    shadowColor: "#38bdf8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  avatarWrap: { marginBottom: Spacing.four },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#38bdf8",
  },
  avatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#38bdf8",
    backgroundColor: "#1E192D",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: { fontSize: 36, fontWeight: "700", color: "#38bdf8" },
  quote: {
    fontSize: 19,
    fontStyle: "italic",
    color: "#e6faff",
    lineHeight: 32,
    textAlign: "center",
    maxWidth: 600,
    marginBottom: Spacing.four,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0ea5e9",
    textAlign: "center",
    marginBottom: 4,
  },
  role: {
    fontSize: 13,
    color: "rgba(255,255,255,0.72)",
    textAlign: "center",
  },
  stars: {
    color: "#FACC15",
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: Spacing.two,
  },
  dots: { flexDirection: "row", gap: 8, marginTop: Spacing.four },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: { backgroundColor: "#38bdf8", width: 24, borderRadius: 5 },
});
