import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Image,

  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getTheme, radius, shadow } from '../theme/palette';
import { space } from '../theme/spacing';
import { type } from '../theme/typography';
import { getText } from '../data/i18n';

/* ── Category look-up ─────────────────────────────────── */

const CAT = {
  parliament: { icon: 'account-balance', bg: '#1565C0', label: 'categoryParliament' },
  judiciary:  { icon: 'gavel',           bg: '#C62828', label: 'categoryJudiciary' },
  election:   { icon: 'how-to-vote',     bg: '#2E7D32', label: 'categoryElection' },
  policy:     { icon: 'policy',          bg: '#EF6C00', label: 'categoryPolicy' },
  amendment:  { icon: 'description',     bg: '#6A1B9A', label: 'categoryAmendment' },
  general:    { icon: 'public',          bg: '#00838F', label: 'categoryGeneral' },
};

const LOCALE = {
  en: 'en-IN', hi: 'hi-IN', kn: 'kn-IN',
  ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', mr: 'mr-IN',
};

const fmtDate = (iso, lang) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(LOCALE[lang] || 'en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch (_) {
    return iso;
  }
};

/* ── Collapsible header constants ─────────────────────── */

const IMG_H = 320;
const HEADER_H = 56;
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.targetpolity';

/* ═══════════════════════════════════════════════════════════ */
/*  ArticleDetailScreen                                       */
/* ═══════════════════════════════════════════════════════════ */

const ArticleDetailScreen = ({ route, navigation }) => {
  const { article } = route.params;
  const { language, themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = useCallback(key => getText(language, key), [language]);
  const insets = useSafeAreaInsets();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [imgOk, setImgOk] = useState(false);

  const cat = CAT[article.category] || CAT.general;

  /* ── animated interpolations ── */

  // Image parallax
  const imgTranslateY = scrollY.interpolate({
    inputRange: [-IMG_H, 0, IMG_H],
    outputRange: [IMG_H / 2, 0, -IMG_H / 3],
    extrapolate: 'clamp',
  });
  const imgScale = scrollY.interpolate({
    inputRange: [-IMG_H, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });
  // Floating header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [IMG_H - HEADER_H - insets.top - 40, IMG_H - HEADER_H - insets.top],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  /* ── share ── */

  const onShare = async () => {
    try {
      await Share.share({
        title: article.title,
        message: `${article.title}\n\nRead more on Rajakiya — Indian Polity Guide\n${PLAY_STORE_URL}`,
      });
    } catch (_) { /* ignored */ }
  };

  /* ── content paragraphs ── */

  const fullText = article.summary || article.content || '';
  const paragraphs = fullText.split(/\n\n+/).filter(Boolean);

  return (
    <View style={[s.screen, { backgroundColor: theme.background }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ── Scrollable content ── */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* ── Hero image with parallax ── */}
        <View style={[s.imgWrap, { height: IMG_H + insets.top }]}>  
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { transform: [{ translateY: imgTranslateY }, { scale: imgScale }] },
            ]}
          >
            <LinearGradient colors={theme.heroGradient} style={StyleSheet.absoluteFill} />
            {article.image ? (
              <Image
                source={{ uri: article.image }}
                style={[StyleSheet.absoluteFill, !imgOk && { opacity: 0 }]}
                resizeMode="cover"
                onLoad={() => setImgOk(true)}
              />
            ) : (
              <View style={s.imgPlaceholder}>
                <Icon name={cat.icon} size={80} color="rgba(255,255,255,0.12)" />
              </View>
            )}
          </Animated.View>

          {/* gradient overlay for readability */}
          <LinearGradient
            colors={['rgba(0,0,0,0.35)', 'transparent', 'rgba(0,0,0,0.55)']}
            locations={[0, 0.3, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* AI generated tag */}
          {imgOk && (
            <View style={[s.aiTag, { top: insets.top + HEADER_H + 8 }]}>
              <Icon name="auto-awesome" size={9} color="rgba(255,255,255,0.8)" />
              <Text style={s.aiTagTxt}>AI Generated</Text>
            </View>
          )}

          {/* bottom meta on image */}
          <View style={[s.imgBottom, { paddingBottom: 32 }]}>
            <View style={[s.badge, { backgroundColor: cat.bg + 'E6' }]}>
              <Icon name={cat.icon} size={13} color="#FFF" />
              <Text style={s.badgeTxt}>{t(cat.label)}</Text>
            </View>
          </View>
        </View>

        {/* ── Content card ── */}
        <View
          style={[
            s.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              paddingBottom: insets.bottom + space.xxl,
            },
          ]}
        >
          {/* gold accent strip */}
          <View style={[s.accentBar, { backgroundColor: theme.accent }]} />

          {/* date row */}
          {!!article.date && (
            <View style={s.dateRow}>
              <Icon name="event" size={14} color={theme.accent} />
              <Text style={[s.dateTxt, { color: theme.muted }]}>
                {fmtDate(article.date, language)}
              </Text>
            </View>
          )}

          {/* title */}
          <Text style={[s.title, { color: theme.text }]}>
            {article.title}
          </Text>

          {/* gold divider */}
          <View style={s.dividerRow}>
            <View style={[s.divLine, { backgroundColor: theme.accent + '40' }]} />
            <Icon name="diamond" size={8} color={theme.accent} />
            <View style={[s.divLine, { backgroundColor: theme.accent + '40' }]} />
          </View>

          {/* body paragraphs */}
          {paragraphs.map((para, i) => (
            <Text key={i} style={[s.body, { color: theme.text }]}>
              {para}
            </Text>
          ))}

        </View>
      </Animated.ScrollView>

      {/* ── Floating collapsed header ── */}
      <Animated.View
        style={[
          s.floatHeader,
          {
            height: HEADER_H + insets.top,
            paddingTop: insets.top,
            opacity: headerOpacity,
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={[theme.primaryDark, theme.primary]}
          style={StyleSheet.absoluteFill}
        />
        <Text style={s.floatTitle} numberOfLines={1}>
          {article.title}
        </Text>
      </Animated.View>

      {/* ── Back + share buttons (always visible) ── */}
      <View style={[s.topBar, { top: insets.top + 8 }]}>
        <TouchableOpacity
          style={s.topBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={s.topBtn} activeOpacity={0.7} onPress={onShare}>
          <Icon name="share" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/*  Styles                                                    */
/* ═══════════════════════════════════════════════════════════ */

const s = StyleSheet.create({
  screen: { flex: 1 },

  /* hero image */
  imgWrap: { overflow: 'hidden' },
  imgPlaceholder: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  imgBottom: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: space.xl,
  },

  /* AI tag */
  aiTag: {
    position: 'absolute', right: 14,
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: 4, borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  aiTagTxt: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 8, fontWeight: '600', letterSpacing: 0.3,
  },

  /* badge */
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  badgeTxt: { color: '#FFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },

  /* content card */
  card: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: space.xl, paddingTop: space.lg,
    borderWidth: StyleSheet.hairlineWidth, borderBottomWidth: 0,
    minHeight: 400,
    ...shadow.card,
  },
  accentBar: {
    width: 56, height: 3, borderRadius: 2,
    alignSelf: 'center', marginBottom: space.lg,
  },

  /* date */
  dateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginBottom: space.md,
  },
  dateTxt: { fontSize: 13, fontWeight: '600' },

  /* title */
  title: {
    ...type.h1, lineHeight: 34,
    marginBottom: space.lg,
  },

  /* divider */
  dividerRow: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: space.xl, gap: 8,
  },
  divLine: { flex: 1, height: 1 },

  /* body */
  body: {
    ...type.bodyLg, lineHeight: 28,
    marginBottom: space.lg,
  },

  /* floating header */
  floatHeader: {
    position: 'absolute', top: 0, left: 0, right: 0,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 56,
  },
  floatTitle: {
    color: '#FFF', fontSize: 15, fontWeight: '700',
  },

  /* top bar buttons */
  topBar: {
    position: 'absolute', left: 12, right: 12,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  topBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
});

export default ArticleDetailScreen;
