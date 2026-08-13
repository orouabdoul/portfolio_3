import React, { createContext, useContext, useState } from 'react';
import {
  TabList,
  TabListProps,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
  Tabs,
} from 'expo-router/ui';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { Spacing } from '@/constants/theme';

// Context partagé pour fermer le menu mobile depuis n'importe quel NavLink
const CloseMenuCtx = createContext<() => void>(() => {});

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <NavBar>
          <TabTrigger name="home" href="/" asChild>
            <NavLink>Home</NavLink>
          </TabTrigger>
          <TabTrigger name="about" href="/about" asChild>
            <NavLink>About</NavLink>
          </TabTrigger>
          <TabTrigger name="projects" href="/projects" asChild>
            <NavLink>Portfolio</NavLink>
          </TabTrigger>
          <TabTrigger name="contact" href="/contact" asChild>
            <NavLink>Contact</NavLink>
          </TabTrigger>
        </NavBar>
      </TabList>
    </Tabs>
  );
}

// ── NavLink : ferme le menu puis navigue ──────────────────────────────────────
function NavLink({ children, isFocused, onPress, ...props }: TabTriggerSlotProps) {
  const [hovered, setHovered] = useState(false);
  const closeMenu = useContext(CloseMenuCtx);
  const active = isFocused || hovered;

  return (
    <Pressable
      {...props}
      onPress={(e) => {
        closeMenu();       // ferme le menu mobile avant de naviguer
        onPress?.(e as any);
      }}
      // @ts-ignore — web mouse events
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={styles.linkWrap}>
      <Text style={[styles.linkText, active && styles.linkTextActive]}>{children}</Text>
      <View
        // @ts-ignore
        className={active ? 'vx-underline active' : 'vx-underline'}
        style={styles.underline}
      />
    </Pressable>
  );
}

// ── ServicesLink : scroll vers la section services de la home ─────────────────
function ServicesLink({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  function handlePress() {
    onClose();
    const scrollToServices = () => {
      const el = typeof document !== 'undefined'
        ? document.getElementById('services')
        : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    // Si déjà sur la home, scroll directement
    if (typeof document !== 'undefined' && document.getElementById('services')) {
      scrollToServices();
    } else {
      // Naviguer vers home puis scroller
      router.push('/');
      setTimeout(scrollToServices, 400);
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={styles.linkWrap}>
      <Text style={[styles.linkText, hovered && styles.linkTextActive]}>Services</Text>
      <View
        // @ts-ignore
        className={hovered ? 'vx-underline active' : 'vx-underline'}
        style={styles.underline}
      />
    </Pressable>
  );
}

// ── NavBar ────────────────────────────────────────────────────────────────────
function NavBar({ children, ...props }: TabListProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 992;

  function closeMenu() {
    setOpen(false);
  }

  // Insérer Services entre About et Portfolio
  const childArray = React.Children.toArray(children);
  // Ordre attendu : [0]=Home [1]=About [2]=Portfolio [3]=Contact
  const orderedLinks = [
    childArray[0],
    childArray[1],
    <ServicesLink key="services" onClose={closeMenu} />,
    childArray[2],
    childArray[3],
  ];

  return (
    <View {...props} style={styles.navOuter}>
      <View style={styles.navInner}>

        {/* ── Brand ── */}
        <Pressable
          style={styles.brand}
          onPress={() => { router.push('/'); closeMenu(); }}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandText}>{'Vistronix\nBusiness'}</Text>
        </Pressable>

        {/* ── Hamburger (mobile) ── */}
        {!isDesktop && (
          <Pressable
            style={[styles.hamburger, open && styles.hamburgerOpen]}
            onPress={() => setOpen((o) => !o)}
            accessibilityLabel={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {/* 3 barres → croix animée via couleur */}
            <View style={[styles.bar, open && styles.barOpen]} />
            <View style={[styles.bar, open && { opacity: 0 }]} />
            <View style={[styles.bar, open && styles.barOpen]} />
          </Pressable>
        )}

        {/* ── Liens nav — injectent la fonction closeMenu via Context ── */}
        {(isDesktop || open) && (
          <CloseMenuCtx.Provider value={closeMenu}>
            <View style={[styles.links, !isDesktop && styles.linksMobile]}>
              {orderedLinks}
            </View>
          </CloseMenuCtx.Provider>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // navbar
  navOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#212529',
    zIndex: 100,
    paddingVertical: Spacing.one,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navInner: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1151,
    paddingHorizontal: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 56,
  },

  // brand
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginRight: 'auto',
    paddingVertical: 4,
  },
  logo: { width: 80, height: 80, backgroundColor: 'transparent' },
  brandText: {
    color: '#0ea5e9',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
  },

  // hamburger
  hamburger: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburgerOpen: {
    borderColor: '#0ea5e9',
    backgroundColor: 'rgba(14,165,233,0.08)',
  },
  bar: {
    width: 22,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 1,
  },
  barOpen: {
    backgroundColor: '#0ea5e9',
  },

  // nav links container
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  linksMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: Spacing.two,
    paddingBottom: Spacing.three,
    gap: Spacing.one,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    marginTop: Spacing.one,
  },

  // nav link item
  // alignSelf: 'stretch' → pleine largeur en colonne mobile, taille auto en ligne desktop
  linkWrap: {
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignSelf: 'stretch',
  },
  linkText: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 15,
    fontWeight: '500',
  },
  linkTextActive: { color: '#0ea5e9', fontWeight: '600' },
  underline: {
    position: 'absolute',
    bottom: 6,
    left: 8,
    right: 8,
    height: 2,
    borderRadius: 1,
  },
});
