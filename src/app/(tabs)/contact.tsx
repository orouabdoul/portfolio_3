import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { useEffect, useState } from 'react';
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, Spacing } from '@/constants/theme';
import { profile } from '@/data/profile';

async function openLink(href: string) {
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('https://wa.me')) {
    await Linking.openURL(href);
    return;
  }
  if (Platform.OS === 'web') {
    // @ts-ignore
    window.open(href, '_blank');
    return;
  }
  await openBrowserAsync(href, { presentationStyle: WebBrowserPresentationStyle.AUTOMATIC });
}

// ── Feedback dialog ───────────────────────────────────────────────────────────
function FeedbackDialog({
  type,
  onClose,
}: {
  type: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, []);

  const isSuccess = type === 'success';

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={ds.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={ds.dialog}>
          <Text style={ds.dialogIcon}>{isSuccess ? '✅' : '⚠️'}</Text>
          <Text style={ds.dialogMessage}>
            {isSuccess
              ? 'Votre message a été envoyé avec succès !'
              : 'Veuillez remplir tous les champs requis.'}
          </Text>
          <Pressable
            style={[ds.okBtn, { backgroundColor: isSuccess ? '#22c55e' : '#ef4444' }]}
            onPress={onClose}>
            <Text style={ds.okBtnText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 110 : insets.top + Spacing.three;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [dialog, setDialog] = useState<'success' | 'error' | null>(null);

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setDialog('error');
      return;
    }
    const subject = encodeURIComponent(`Message de ${name}`);
    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
    openLink(`mailto:orouabdoulayeissiaka@gmail.com?subject=${subject}&body=${body}`);
    setDialog('success');
    setName('');
    setEmail('');
    setMessage('');
  }

  const inputFor = (field: string) => [
    cs.input,
    focusedField === field && cs.inputFocused,
  ];

  return (
    <View style={cs.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: BottomTabInset + Spacing.five }}>

        {/* ── Main contact section ── */}
        <View style={[cs.outer, { paddingTop: topPad }]}>
          <View style={cs.inner}>

            {/* Title */}
            <Text style={cs.sectionTitle}>Contact</Text>

            {/* Form card */}
            <View style={cs.formCard}>

              {/* Nom */}
              <View style={cs.fieldWrap}>
                <Text style={cs.label}>Nom</Text>
                <TextInput
                  // @ts-ignore
                  className="contact-input-rn"
                  style={inputFor('name')}
                  placeholder="Votre nom"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              {/* Email */}
              <View style={cs.fieldWrap}>
                <Text style={cs.label}>Email</Text>
                <TextInput
                  // @ts-ignore
                  className="contact-input-rn"
                  style={inputFor('email')}
                  placeholder="Votre email"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              {/* Message */}
              <View style={cs.fieldWrap}>
                <Text style={cs.label}>Message</Text>
                <TextInput
                  // @ts-ignore
                  className="contact-input-rn"
                  style={[...inputFor('message'), cs.textarea]}
                  placeholder="Votre message"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={message}
                  onChangeText={setMessage}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              {/* Submit */}
              <Pressable
                // @ts-ignore
                className="contact-btn-rn"
                style={({ pressed }) => [cs.submitBtn, pressed && { opacity: 0.85 }]}
                onPress={handleSubmit}>
                <Text style={cs.submitText}>Envoyer</Text>
              </Pressable>
            </View>

          </View>
        </View>

        {/* ── Social links ── */}
        <View style={cs.socialsOuter}>
          <View style={cs.socialsInner}>
            <Text style={cs.socialsTitle}>Retrouvez-moi sur</Text>
            <View style={cs.socialsGrid}>
              {profile.socials.map((s) => (
                <Pressable
                  key={s.label}
                  onPress={() => openLink(s.href)}
                  // @ts-ignore
                  className="social-btn-rn"
                  style={({ pressed }) => [cs.socialBtn, pressed && { opacity: 0.75 }]}>
                  <Text style={cs.socialIcon}>{s.icon}</Text>
                  <Text style={cs.socialLabel}>{s.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

      </ScrollView>

      {dialog && <FeedbackDialog type={dialog} onClose={() => setDialog(null)} />}
    </View>
  );
}

// ── Dialog styles ─────────────────────────────────────────────────────────────
const ds = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    minWidth: 280,
    maxWidth: 440,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },
  dialogIcon: { fontSize: 48, marginBottom: 12 },
  dialogMessage: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  okBtn: {
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  okBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});

// ── Screen styles ─────────────────────────────────────────────────────────────
const cs = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#18142A' },

  // Contact section
  outer: {
    backgroundColor: '#18142A',
    paddingBottom: 64,
  },
  inner: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 700,
    paddingHorizontal: Spacing.four,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.five,
  },

  // Form
  formCard: {
    gap: Spacing.three,
  },
  fieldWrap: { gap: 6 },
  label: {
    color: '#0ea5e9',
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#212529',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: '#0ea5e9',
  },
  textarea: {
    height: 130,
    paddingTop: 12,
  },
  submitBtn: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 13,
    paddingHorizontal: Spacing.five,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },

  // Social links
  socialsOuter: {
    backgroundColor: '#1E192D',
    paddingVertical: 48,
  },
  socialsInner: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 700,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
  },
  socialsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: Spacing.four,
    textAlign: 'center',
  },
  socialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'center',
  },
  socialBtn: {
    backgroundColor: '#212529',
    borderWidth: 1,
    borderColor: 'rgba(14,165,233,0.3)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  socialIcon: { fontSize: 18 },
  socialLabel: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
});
