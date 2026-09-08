import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  RefreshControl,
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
import { AppHeader } from '../components/ui';
import NewsService from '../services/NewsService';

/* ── Category look-up ─────────────────────────────────── */

const CAT = {
  parliament: { icon: 'account-balance', bg: '#1565C0' },
  judiciary:  { icon: 'gavel',           bg: '#C62828' },
  election:   { icon: 'how-to-vote',     bg: '#2E7D32' },
  policy:     { icon: 'policy',          bg: '#EF6C00' },
  amendment:  { icon: 'description',     bg: '#6A1B9A' },
  general:    { icon: 'public',          bg: '#00838F' },
};
const CAT_KEY = {
  parliament: 'categoryParliament',
  judiciary:  'categoryJudiciary',
  election:   'categoryElection',
  policy:     'categoryPolicy',
  amendment:  'categoryAmendment',
  general:    'categoryGeneral',
};

const LOCALE = {
  en: 'en-IN', hi: 'hi-IN', kn: 'kn-IN',
  ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', mr: 'mr-IN',
};

/** Format an ISO date string for the active language. */
const fmtDate = (iso, lang) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(LOCALE[lang] || 'en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch (_) {
    return iso;
  }
};

/* ═══════════════════════════════════════════════════════════ */
/*  Sub-components                                            */
/* ═══════════════════════════════════════════════════════════ */

/** Coloured pill shown on the image overlay. */
const Badge = ({ category, t }) => {
  const c = CAT[category] || CAT.general;
  return (
    <View style={[s.badge, { backgroundColor: c.bg + 'E6' }]}>
      <Icon name={c.icon} size={13} color="#FFF" />
      <Text style={s.badgeTxt}>{t(CAT_KEY[category] || 'categoryGeneral')}</Text>
    </View>
  );
};

/** ── 1 / 5 ── centred page counter. */
const PageCounter = ({ idx, total, theme }) => (
  <View style={s.pgRow}>
    <View style={[s.pgLine, { backgroundColor: theme.accent + '50' }]} />
    <Text style={[s.pgNum, { color: theme.faint }]}>{idx + 1} / {total}</Text>
    <View style={[s.pgLine, { backgroundColor: theme.accent + '50' }]} />
  </View>
);

/* ── Full-screen news card (Inshorts style) ─────────── */

const NewsCard = React.memo(({ item, height, theme, t, lang, ctaReserve, hintVisible }) => {
  const [imgOk, setImgOk] = useState(false);
  const imgH = Math.round(height * 0.42);
  const cat = CAT[item.category] || CAT.general;

  return (
    <View style={{ height }}>
      {/* ── image section ── */}
      <View style={[s.imgBox, { height: imgH }]}>
        {/* navy placeholder while image loads */}
        <LinearGradient
          colors={theme.heroGradient}
          style={StyleSheet.absoluteFill}
        />
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={[StyleSheet.absoluteFill, !imgOk && { opacity: 0 }]}
            resizeMode="cover"
            onLoad={() => setImgOk(true)}
          />
        ) : (
          <View style={s.imgPlaceholder}>
            <Icon name={cat.icon} size={72} color="rgba(255,255,255,0.10)" />
          </View>
        )}
        {!imgOk && !!item.image && (
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            color={theme.accent}
            size="small"
          />
        )}

        {/* gradient so overlaid text pops */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={s.imgGrad}
        />

        {/* AI-generated disclaimer — top-right of image */}
        {imgOk && (
          <View style={s.aiTag}>
            <Icon name="auto-awesome" size={9} color="rgba(255,255,255,0.8)" />
            <Text style={s.aiTagTxt}>AI Generated</Text>
          </View>
        )}

        {/* category + date at bottom of image */}
        <View style={s.imgMeta}>
          <Badge category={item.category || 'general'} t={t} />
          {!!item.date && (
            <View style={s.dateChip}>
              <Icon name="schedule" size={12} color="rgba(255,255,255,0.9)" />
              <Text style={s.dateTxt}>{fmtDate(item.date, lang)}</Text>
            </View>
          )}
        </View>
      </View>

      {/* ── content card (overlaps image by 24px) ── */}
      <View
        style={[
          s.content,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            paddingBottom: ctaReserve,
            overflow: 'hidden',
          },
        ]}
      >
        {/* gold accent strip */}
        <View style={[s.accentBar, { backgroundColor: theme.accent }]} />

        {/* headline */}
        <Text
          style={[s.title, { color: theme.text }]}
          numberOfLines={4}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
        >
          {item.title}
        </Text>

        {/* body — truncated, safely clear of the floating Read More CTA */}
        <View style={s.bodyWrap}>
          <Text style={[s.body, { color: theme.muted }]} numberOfLines={3}>
            {item.summary || item.content || ''}
          </Text>
        </View>

        {/* swipe hint — first card only */}
        {hintVisible && (
          <View style={s.hintRow}>
            <Icon name="swipe-vertical" size={16} color={theme.faint} />
            <Text style={[s.hintTxt, { color: theme.faint }]}>{t('swipeForMore')}</Text>
          </View>
        )}
      </View>
    </View>
  );
});

/* ── Shimmer bar ──────────────────────────────────────── */

const ShimmerBar = ({ width, height: h, style, baseColor, shimmerColor, anim }) => {
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 320],
  });
  return (
    <View style={[{ width, height: h, borderRadius: 6, backgroundColor: baseColor, overflow: 'hidden' }, style]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={['transparent', shimmerColor, 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1, width: 120 }}
        />
      </Animated.View>
    </View>
  );
};

/* ── Loading skeleton with shimmer ────────────────────── */

const Skeleton = ({ theme, height }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const base = theme.surfaceAlt;
  const shine = (theme.accent || '#D4AF37') + '18';

  return (
    <View style={{ height, backgroundColor: theme.background }}>
      {/* image placeholder with shimmer */}
      <View style={s.skelImg}>
        <LinearGradient colors={theme.heroGradient} style={StyleSheet.absoluteFill} />
        {/* pulsing icon */}
        <Animated.View style={{ opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.15, 0.35, 0.15] }) }}>
          <Icon name="article" size={64} color="#FFF" />
        </Animated.View>
      </View>

      {/* content card skeleton */}
      <View style={[s.skelCard, { backgroundColor: theme.surface }]}>
        {/* accent bar shimmer */}
        <ShimmerBar width={56} height={3} baseColor={(theme.accent || '#D4AF37') + '40'} shimmerColor={(theme.accent || '#D4AF37') + '60'} anim={anim} style={{ alignSelf: 'center', marginBottom: 20 }} />

        {/* badge row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <ShimmerBar width={80} height={24} baseColor={base} shimmerColor={shine} anim={anim} style={{ borderRadius: 12 }} />
          <ShimmerBar width={100} height={14} baseColor={base} shimmerColor={shine} anim={anim} />
        </View>

        {/* title lines */}
        <ShimmerBar width="85%" height={20} baseColor={base} shimmerColor={shine} anim={anim} style={{ marginBottom: 10 }} />
        <ShimmerBar width="60%" height={20} baseColor={base} shimmerColor={shine} anim={anim} style={{ marginBottom: 24 }} />

        {/* body lines */}
        <ShimmerBar width="100%" height={14} baseColor={base} shimmerColor={shine} anim={anim} style={{ marginBottom: 10 }} />
        <ShimmerBar width="95%" height={14} baseColor={base} shimmerColor={shine} anim={anim} style={{ marginBottom: 10 }} />
        <ShimmerBar width="100%" height={14} baseColor={base} shimmerColor={shine} anim={anim} style={{ marginBottom: 10 }} />
        <ShimmerBar width="80%" height={14} baseColor={base} shimmerColor={shine} anim={anim} style={{ marginBottom: 10 }} />
        <ShimmerBar width="45%" height={14} baseColor={base} shimmerColor={shine} anim={anim} />
      </View>
    </View>
  );
};

/* ── Empty state ──────────────────────────────────────── */

const Empty = ({ theme, t }) => (
  <View style={s.centre}>
    <View style={[s.bigCircle, { backgroundColor: theme.accentSoft }]}>
      <Icon name="article" size={52} color={theme.accent} />
    </View>
    <Text style={[type.h3, { color: theme.text, textAlign: 'center', marginTop: space.xl }]}>
      {t('noNewsTitle')}
    </Text>
    <Text
      style={[
        type.body,
        { color: theme.muted, textAlign: 'center', marginTop: space.sm, paddingHorizontal: space.xxl },
      ]}
    >
      {t('noNewsBody')}
    </Text>
  </View>
);

/* ── Error state ──────────────────────────────────────── */

const Oops = ({ theme, t, onRetry }) => (
  <View style={s.centre}>
    <View style={[s.bigCircle, { backgroundColor: theme.dangerSoft }]}>
      <Icon name="cloud-off" size={52} color={theme.danger} />
    </View>
    <Text style={[type.h3, { color: theme.text, textAlign: 'center', marginTop: space.xl }]}>
      {t('networkError')}
    </Text>
    <TouchableOpacity
      style={[s.retryBtn, { backgroundColor: theme.accent }]}
      activeOpacity={0.8}
      onPress={onRetry}
    >
      <Icon name="refresh" size={18} color={theme.onAccent} />
      <Text style={[type.button, { color: theme.onAccent, fontSize: 14 }]}>{t('retry')}</Text>
    </TouchableOpacity>
  </View>
);

/* ═══════════════════════════════════════════════════════════ */
/*  HomeScreen                                                */
/* ═══════════════════════════════════════════════════════════ */

const HomeScreen = ({ navigation }) => {
  const { language, themeMode } = useSelector(state => state.app);
  const theme  = getTheme(themeMode);
  const t      = useCallback(key => getText(language, key), [language]);
  const insets = useSafeAreaInsets();

  const [articles, setArticles]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefresh]  = useState(false);
  const [error, setError]         = useState(null);
  const [curIdx, setCurIdx]       = useState(0);
  const [boxH, setBoxH]          = useState(0);
  const [barH, setBarH]          = useState(0);

  // tab-bar height = bar (64) + safe-area bottom
  const TAB_H = 64 + Math.max(insets.bottom, 10);
  // total space the floating page-counter / Read More bar occupies above the tab
  // bar — measured live via onLayout so it's always exact, never guessed. Falls
  // back to a sane minimum before the first layout pass measures the real value.
  const CTA_RESERVE = TAB_H + space.sm + Math.max(barH, 54) + space.md;

  /* ── fetch logic ── */

  const load = useCallback(async (refresh = false) => {
    refresh ? setRefresh(true) : setLoading(true);
    setError(null);
    try {
      const { articles: items } = await NewsService.fetchArticles(language);
      setArticles(items);
    } catch (e) {
      setError(e.message || 'fetch failed');
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  }, [language]);

  useEffect(() => {
    setArticles([]);
    setCurIdx(0);
    load();
  }, [load]);

  /* ── viewability ── */

  const onView = useRef(({ viewableItems }) => {
    if (viewableItems?.[0] != null) setCurIdx(viewableItems[0].index ?? 0);
  }).current;
  const viewCfg = useRef({ viewAreaCoveragePercentThreshold: 50 });

  /* ── layout helpers ── */

  const getLayout = useCallback(
    (_, i) => ({ length: boxH, offset: boxH * i, index: i }),
    [boxH],
  );

  /* ── render card ── */

  const renderItem = useCallback(
    ({ item, index }) =>
      boxH > 0 ? (
        <NewsCard
          item={item}
          height={boxH}
          theme={theme}
          t={t}
          lang={language}
          ctaReserve={CTA_RESERVE}
          hintVisible={index === 0 && articles.length > 1}
        />
      ) : null,
    [boxH, theme, t, language, CTA_RESERVE, articles.length],
  );

  const onReadMore = useCallback(() => {
    const current = articles[curIdx];
    if (current) navigation.navigate('ArticleDetail', { article: current });
  }, [articles, curIdx, navigation]);

  /* ── determine what to show ── */

  const hasData = articles.length > 0;

  return (
    <View style={[s.screen, { backgroundColor: theme.background }]}>
      <AppHeader
        theme={theme}
        title={t('home')}
        subtitle={t('newsSubtitle')}
        onRightPress={() => navigation.navigate('Settings')}
      />

      <View style={s.flex} onLayout={e => setBoxH(e.nativeEvent.layout.height)}>
        {loading && !hasData ? (
          <Skeleton theme={theme} height={boxH || 500} />
        ) : error && !hasData ? (
          <Oops theme={theme} t={t} onRetry={() => load()} />
        ) : !hasData ? (
          <Empty theme={theme} t={t} />
        ) : boxH > 0 ? (
          <>
            <FlatList
              data={articles}
              renderItem={renderItem}
              keyExtractor={a => a.id}
              getItemLayout={getLayout}
              snapToInterval={boxH}
              snapToAlignment="start"
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              onViewableItemsChanged={onView}
              viewabilityConfig={viewCfg.current}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => load(true)}
                  tintColor={theme.accent}
                  colors={[theme.accent]}
                  progressBackgroundColor={theme.surface}
                />
              }
              initialNumToRender={2}
              maxToRenderPerBatch={3}
              windowSize={5}
            />
            {/* single floating bottom bar — page counter + Read More CTA in one
                row, rendered once per screen (not per card) so there is never a
                second element competing for the same space above the tab bar */}
            <View
              style={[s.bottomBar, { bottom: TAB_H + space.sm }]}
              pointerEvents="box-none"
            >
              <View
                style={[
                  s.bottomBarPill,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
                onLayout={e => setBarH(e.nativeEvent.layout.height)}
              >
                {articles.length > 1 && (
                  <PageCounter idx={curIdx} total={articles.length} theme={theme} />
                )}
                <TouchableOpacity
                  style={[s.readMoreBtn, { backgroundColor: theme.accent }]}
                  activeOpacity={0.85}
                  onPress={onReadMore}
                >
                  <Text style={[s.readMoreTxt, { color: theme.onAccent }]}>{t('readMore')}</Text>
                  <Icon name="arrow-forward" size={15} color={theme.onAccent} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/*  Styles                                                    */
/* ═══════════════════════════════════════════════════════════ */

const s = StyleSheet.create({
  screen: { flex: 1 },
  flex:   { flex: 1 },

  /* image section */
  imgBox:        { overflow: 'hidden' },
  imgPlaceholder:{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  imgGrad:       { position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%' },
  imgMeta: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: space.lg,
    paddingBottom: space.lg + 24, // 24 = card overlap
  },

  /* AI generated tag */
  aiTag: {
    position: 'absolute', top: 10, right: 10,
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
  },
  badgeTxt: { color: '#FFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },

  /* date */
  dateChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dateTxt:  { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '600' },

  /* content card */
  content: {
    flex: 1, marginTop: -24,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: space.xl, paddingTop: space.lg,
    borderWidth: StyleSheet.hairlineWidth, borderBottomWidth: 0,
    ...shadow.card,
  },
  accentBar: {
    width: 56, height: 3, borderRadius: 2,
    alignSelf: 'center', marginBottom: space.lg,
  },
  title:    { ...type.h2, lineHeight: 28, marginBottom: space.md },
  bodyWrap: { flex: 1 },
  body:     { ...type.bodyLg, lineHeight: 26 },

  /* swipe hint */
  hintRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: space.sm,
  },
  hintTxt: { fontSize: 12, fontWeight: '600' },

  /* single floating bottom bar — page counter + Read More, one element,
     rendered once per screen so it can never collide with itself */
  bottomBar: {
    position: 'absolute', left: 0, right: 0,
    alignItems: 'center',
  },
  bottomBarPill: {
    flexDirection: 'row', alignItems: 'center',
    gap: space.md,
    paddingLeft: space.lg, paddingRight: space.sm, paddingVertical: space.sm,
    borderRadius: radius.pill, borderWidth: StyleSheet.hairlineWidth,
    ...shadow.raised,
  },
  readMoreBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: radius.pill,
  },
  readMoreTxt: { fontSize: 13, fontWeight: '800', letterSpacing: 0.3 },

  /* page counter */
  pgRow:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pgLine: { width: 14, height: 1 },
  pgNum:  { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },

  /* skeleton shimmer */
  skelImg: {
    height: '42%', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  skelCard: {
    flex: 1, marginTop: -24,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: space.xl,
  },

  /* empty / error */
  centre: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: space.xxl,
  },
  bigCircle: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
  },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 22, paddingVertical: 11,
    borderRadius: radius.pill, marginTop: space.lg,
  },
});

export default HomeScreen;
