import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FaqEntry } from '@/data/faq';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function FaqItem({ item }: { item: FaqEntry }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => setOpen((o) => !o)}
      style={({ pressed }) => [pressed && { opacity: 0.8 }]}>
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <View style={styles.header}>
          <Text style={[styles.question, { color: theme.text }]} numberOfLines={open ? 0 : 2}>
            {item.question}
          </Text>
          <Text style={[styles.toggle, { color: theme.accent }]}>{open ? '−' : '+'}</Text>
        </View>
        {open && <Text style={[styles.answer, { color: theme.textSecondary }]}>{item.answer}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  toggle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
    width: 24,
    textAlign: 'center',
  },
  answer: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: Spacing.two,
  },
});
