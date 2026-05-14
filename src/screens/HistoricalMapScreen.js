import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setSelectedEvent, setHistoricalEvents } from '../store/slices/politySlice';
import { HISTORICAL_EVENTS } from '../data/polityData';
import { getText, localizeEvent } from '../data/i18n';
import { getTheme } from '../theme/palette';

const { width } = Dimensions.get('window');

const HistoricalMapScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [timelineView, setTimelineView] = useState(false);
  const { historicalEvents, selectedEvent } = useSelector(state => state.polity);
  const { language, themeMode } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  useEffect(() => {
    dispatch(setHistoricalEvents(HISTORICAL_EVENTS));
  }, [dispatch]);

  const categories = [
    { id: 'all', title: t('categoriesAll'), icon: 'layers', color: '#1976D2' },
    { id: 'British Era', title: t('categoryBritish'), icon: 'account-balance', color: '#455A64' },
    { id: 'Independence', title: t('categoryIndependence'), icon: 'wb-sunny', color: '#FF9800' },
    { id: 'Constitution', title: t('categoryConstitution'), icon: 'article', color: '#1976D2' },
    { id: 'Amendment', title: t('categoryAmendment'), icon: 'history-edu', color: '#9C27B0' },
    { id: 'Judiciary', title: t('categoryJudiciary'), icon: 'gavel', color: '#E91E63' },
    { id: 'Federalism', title: t('categoryFederalism'), icon: 'hub', color: '#3F51B5' },
    { id: 'Rights', title: t('categoryRights'), icon: 'verified-user', color: '#009688' },
    { id: 'Elections', title: t('categoryElections'), icon: 'how-to-vote', color: '#795548' },
  ];

  const filteredEvents = selectedCategory === 'all'
    ? historicalEvents
    : historicalEvents.filter(event => event.category === selectedCategory);

  const localizedEvents = filteredEvents.map(event => localizeEvent(event, language));
  const sortedEvents = [...localizedEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleEventPress = (event) => {
    dispatch(setSelectedEvent(localizeEvent(event, language)));
    setShowEventModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderMapView = () => {
    const tileUrl = theme.dark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    const mapBackground = theme.dark ? '#0B1220' : '#eef4f8';
    const fallbackEvents = localizedEvents.map((event, index) => {
      const lat = event.location?.latitude;
      const lng = event.location?.longitude;
      if (!lat || !lng) return event;

      const samePlaceIndex = localizedEvents
        .slice(0, index)
        .filter(prev =>
          prev.location?.latitude === lat &&
          prev.location?.longitude === lng
        ).length;

      if (samePlaceIndex === 0) return event;
      const angle = samePlaceIndex * 0.95;
      const radius = 0.045 + (samePlaceIndex % 3) * 0.018;
      return {
        ...event,
        location: {
          ...event.location,
          latitude: lat + Math.sin(angle) * radius,
          longitude: lng + Math.cos(angle) * radius,
        },
      };
    });

    const mapHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; background: ${mapBackground}; }
          #map { width: 100%; height: 100vh; }
          .custom-pin {
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          }
          .leaflet-tooltip {
            border: 0;
            border-radius: 10px;
            padding: 6px 9px;
            box-shadow: 0 10px 20px rgba(15,23,42,.16);
            font: 700 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map', { zoomControl: true, attributionControl: false, minZoom: 4, maxZoom: 18 }).setView([22.5937, 78.9629], 5);
          
          L.tileLayer('${tileUrl}', {
            maxZoom: 19
          }).addTo(map);

          const events = ${JSON.stringify(fallbackEvents)};
          const bounds = [];
          
          events.forEach(event => {
            if(event.location && event.location.latitude) {
               bounds.push([event.location.latitude, event.location.longitude]);
               const marker = L.marker([event.location.latitude, event.location.longitude], {
                 icon: L.divIcon({
                   className: 'custom-pin',
                   html: "<div style='background-color:" + (event.color || '#1976D2') + "; width: 18px; height: 18px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 12px rgba(0,0,0,.35);'></div>",
                   iconSize: [28, 28],
                   iconAnchor: [14, 14]
                 })
               }).addTo(map);
               marker.bindTooltip(event.title, { direction: 'top', offset: [0, -8], opacity: 0.95 });
               
               marker.on('click', function() {
                 window.ReactNativeWebView.postMessage(JSON.stringify(event));
               });
            }
          });
          if (bounds.length > 1) {
            map.fitBounds(bounds, { padding: [28, 28], maxZoom: 5 });
          }
        </script>
      </body>
      </html>
    `;

    return (
      <View style={[styles.mapWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHtml }}
          style={styles.webView}
          onMessage={(event) => handleEventPress(JSON.parse(event.nativeEvent.data))}
        />
        <View style={[styles.mapOverlayHint, { backgroundColor: theme.surface }]}>
          <Icon name="touch-app" size={16} color={theme.primary} />
          <Text style={[styles.hintText, { color: theme.primary }]}>{t('tapMarkers')}</Text>
        </View>
      </View>
    );
  };

  const renderTimelineView = () => (
    <ScrollView style={styles.timelineContainer} showsVerticalScrollIndicator={false}>
      {sortedEvents.map((event, index) => (
        <TouchableOpacity key={event.id} style={styles.timelineCard} onPress={() => handleEventPress(event)}>
          <View style={styles.timelineLeftRail}>
            <View style={[styles.timelineNode, { backgroundColor: event.color }]}>
              <Text style={styles.nodeIcon}>{event.icon}</Text>
            </View>
            {index < sortedEvents.length - 1 && <View style={[styles.verticalLine, { backgroundColor: theme.border }]} />}
          </View>
          <View style={[styles.timelineCardContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardDate, { color: theme.muted }]}>{formatDate(event.date)}</Text>
              <View style={[styles.miniBadge, { backgroundColor: event.color + '15' }]}>
                <Text style={[styles.miniBadgeText, { color: event.color }]}>{event.category}</Text>
              </View>
            </View>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{event.title}</Text>
            <Text numberOfLines={2} style={[styles.cardDesc, { color: theme.muted }]}>{event.description}</Text>
            <View style={styles.cardFooter}>
              <Icon name="place" size={14} color={theme.muted} />
              <Text style={[styles.cardLocText, { color: theme.muted }]}>{event.location.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />

      {/* Header */}
      <LinearGradient colors={[theme.primaryDark, theme.primary, '#00897B']} style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.headerTitle}>{t('mapTitle')}</Text>
            <Text style={styles.headerSubtitle}>{t('mapSubtitle')}</Text>
          </View>

          <View style={styles.toggleSegment}>
            <TouchableOpacity
              onPress={() => setTimelineView(false)}
              style={[styles.segmentBtn, !timelineView && styles.segmentBtnActive]}>
              <Icon name="map" size={18} color={!timelineView ? theme.primary : '#FFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimelineView(true)}
              style={[styles.segmentBtn, timelineView && styles.segmentBtnActive]}>
              <Icon name="list" size={18} color={timelineView ? theme.primary : '#FFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Modern Filter System */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.pill,
                { backgroundColor: theme.surface, borderColor: theme.border },
                selectedCategory === cat.id && { backgroundColor: cat.color, borderColor: cat.color },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Icon
                name={cat.icon}
                size={16}
                color={selectedCategory === cat.id ? '#FFF' : theme.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.pillText, { color: theme.primary }, selectedCategory === cat.id && styles.pillTextActive]}>
                {cat.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.mainArea}>
        {timelineView ? renderTimelineView() : renderMapView()}
      </View>

      {/* Event Detail Modal */}
      <Modal visible={showEventModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowEventModal(false)}>
        <View style={[styles.modalRoot, { backgroundColor: theme.background }]}>
          <View style={[styles.modalTopBar, { backgroundColor: selectedEvent?.color || '#1976D2' }]}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowEventModal(false)}>
              <Icon name="expand-more" size={32} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalEmoji}>{selectedEvent?.icon}</Text>
          </View>

          <ScrollView style={styles.modalScroll}>
            <Text style={[styles.modalDateTitle, { color: theme.primary }]}>{formatDate(selectedEvent?.date || '')}</Text>
            <Text style={[styles.modalMainTitle, { color: theme.text }]}>{selectedEvent?.title}</Text>

            <View style={styles.modalInfoRow}>
              <View style={[styles.infoBox, { backgroundColor: theme.surfaceAlt }]}>
                <Icon name="place" size={20} color={theme.primary} />
                <Text style={[styles.infoLabel, { color: theme.muted }]}>{t('location')}</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{selectedEvent?.location.name}</Text>
              </View>
              <View style={[styles.infoBox, { backgroundColor: theme.surfaceAlt }]}>
                <Icon name="category" size={20} color={theme.primary} />
                <Text style={[styles.infoLabel, { color: theme.muted }]}>{t('category')}</Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>{selectedEvent?.category}</Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={[styles.modalSectionHead, { color: theme.text }]}>{t('summary')}</Text>
              <Text style={[styles.modalSectionText, { color: theme.muted }]}>{selectedEvent?.description}</Text>
            </View>

            <View style={[styles.modalSection, styles.significanceBox, { backgroundColor: theme.surfaceAlt }]}>
              <Text style={[styles.modalSectionHead, { color: theme.primary }]}>{t('significance')}</Text>
              <Text style={[styles.modalSectionText, { color: theme.text }]}>{selectedEvent?.significance}</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingBottom: 35, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFF' },
  headerSubtitle: { fontSize: 13, color: '#E3F2FD', marginTop: 2 },

  toggleSegment: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 4 },
  segmentBtn: { padding: 8, borderRadius: 10, width: 40, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: '#FFF' },

  filterBar: { marginTop: -20, marginBottom: 10 },
  filterScroll: { paddingHorizontal: 20, paddingVertical: 5 },
  pill: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, marginRight: 10,
    borderWidth: 1, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4
  },
  pillText: { fontSize: 13, color: '#1976D2', fontWeight: '700' },
  pillTextActive: { color: '#FFF' },

  mainArea: { flex: 1 },
  mapWrapper: { flex: 1, margin: 15, borderRadius: 24, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, borderWidth: 1 },
  webView: { flex: 1 },
  mapOverlayHint: {
    position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#FFF',
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8,
    borderRadius: 20, elevation: 3
  },
  hintText: { fontSize: 12, color: '#1976D2', fontWeight: '600', marginLeft: 6 },

  timelineContainer: { paddingHorizontal: 20 },
  timelineCard: { flexDirection: 'row', marginBottom: 5 },
  timelineLeftRail: { alignItems: 'center', marginRight: 15, width: 40 },
  timelineNode: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  nodeIcon: { fontSize: 18 },
  verticalLine: { width: 2, flex: 1, backgroundColor: '#E0E0E0', marginVertical: 4 },

  timelineCardContent: {
    flex: 1, borderRadius: 16, padding: 15, marginBottom: 20, borderWidth: 1,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardDate: { fontSize: 12, fontWeight: '800', color: '#78909C' },
  miniBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  miniBadgeText: { fontSize: 10, fontWeight: '800' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#263238', marginBottom: 5 },
  cardDesc: { fontSize: 13, color: '#546E7A', lineHeight: 18 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  cardLocText: { fontSize: 11, color: '#78909C', marginLeft: 4, fontWeight: '600' },

  modalRoot: { flex: 1, backgroundColor: '#FFF' },
  modalTopBar: { height: 180, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  modalClose: { position: 'absolute', top: 20, right: 20 },
  modalEmoji: { fontSize: 60 },
  modalScroll: { padding: 25 },
  modalDateTitle: { fontSize: 14, fontWeight: '800', color: '#1976D2', textTransform: 'uppercase' },
  modalMainTitle: { fontSize: 26, fontWeight: '800', color: '#263238', marginVertical: 10 },
  modalInfoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  infoBox: { backgroundColor: '#F1F5F9', width: '48%', padding: 15, borderRadius: 16 },
  infoLabel: { fontSize: 11, color: '#64748B', marginTop: 5, fontWeight: '600' },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#334155' },
  modalSection: { marginBottom: 25 },
  modalSectionHead: { fontSize: 18, fontWeight: '800', color: '#263238', marginBottom: 10 },
  modalSectionText: { fontSize: 15, color: '#475569', lineHeight: 24 },
  significanceBox: { backgroundColor: '#E3F2FD', padding: 20, borderRadius: 20 }
});

export default HistoricalMapScreen;
