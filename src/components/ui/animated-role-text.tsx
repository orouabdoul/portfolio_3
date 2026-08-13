import { useEffect, useState } from 'react';
import { StyleSheet, Text, type TextStyle } from 'react-native';

interface Props {
  roles: string[];
  color: string;
  style?: TextStyle;
}

export function AnimatedRoleText({ roles, color, style }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];

    if (isTyping) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 80);
        return () => clearTimeout(t);
      } else {
        // pause before erasing
        const t = setTimeout(() => setIsTyping(false), 1600);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, roleIndex, roles]);

  return (
    <Text style={[styles.base, { color }, style]}>
      {displayed}
      <Text style={styles.cursor}>|</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  base: { fontSize: 22, fontWeight: '700', lineHeight: 30 },
  cursor: { opacity: 0.7 },
});
