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

const { width } = Dimensions.get('window');

const HistoricalMapScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [timelineView, setTimelineView] = useState(false);
  const { historicalEvents, selectedEvent } = useSelector(state => state.polity);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(setHistoricalEvents(HISTORICAL_EVENTS));
  }, [dispatch]);

  const categories = [
    { id: 'all', title: 'All Events', icon: 'layers', color: '#1976D2' },
    { id: 'Independence', title: 'Independence', icon: 'wb-sunny', color: '#FF9800' },
    { id: 'Constitution', title: 'Constitution', icon: 'article', color: '#1976D2' },
    { id: 'Amendment', title: 'Amendments', icon: 'history-edu', color: '#9C27B0' },
    { id: 'Judiciary', title: 'Courts', icon: 'gavel', color: '#E91E63' },
  ];

  const filteredEvents = selectedCategory === 'all'
    ? historicalEvents
    : historicalEvents.filter(event => event.category === selectedCategory);

  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleEventPress = (event) => {
    dispatch(setSelectedEvent(event));
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
    const mapHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; background: #f0f4f8; }
          #map { width: 100%; height: 100vh; }
          .custom-pin {
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map', { zoomControl: false, attributionControl: false }).setView([22.5937, 78.9629], 5);
          
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
          }).addTo(map);

          const events = ${JSON.stringify(filteredEvents)};
          
          events.forEach(event => {
            if(event.location && event.location.latitude) {
               const marker = L.marker([event.location.latitude, event.location.longitude], {
                 icon: L.divIcon({
                   className: 'custom-pin',
                   html: "<div style='background-color:" + (event.color || '#1976D2') + "; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white;'></div>",
                   iconSize: [22, 22],
                   iconAnchor: [11, 11]
                 })
               }).addTo(map);
               
               marker.on('click', function() {
                 window.ReactNativeWebView.postMessage(JSON.stringify(event));
               });
            }
          });
        </script>
      </body>
      </html>
    `;

    return (
      <View style={styles.mapWrapper}>
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHtml }}
          style={styles.webView}
          onMessage={(event) => handleEventPress(JSON.parse(event.nativeEvent.data))}
        />
        <View style={styles.mapOverlayHint}>
          <Icon name="touch-app" size={16} color="#1976D2" />
          <Text style={styles.hintText}>Tap markers for details</Text>
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
            {index < sortedEvents.length - 1 && <View style={styles.verticalLine} />}
          </View>
          <View style={styles.timelineCardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardDate}>{formatDate(event.date)}</Text>
              <View style={[styles.miniBadge, { backgroundColor: event.color + '15' }]}>
                <Text style={[styles.miniBadgeText, { color: event.color }]}>{event.category}</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text numberOfLines={2} style={styles.cardDesc}>{event.description}</Text>
            <View style={styles.cardFooter}>
              <Icon name="place" size={14} color="#78909C" />
              <Text style={styles.cardLocText}>{event.location.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

      {/* Header */}
      <LinearGradient colors={['#1976D2', '#1565C0']} style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Political Map</Text>
            <Text style={styles.headerSubtitle}>Historical Journey of India</Text>
          </View>

          <View style={styles.toggleSegment}>
            <TouchableOpacity
              onPress={() => setTimelineView(false)}
              style={[styles.segmentBtn, !timelineView && styles.segmentBtnActive]}>
              <Icon name="map" size={18} color={!timelineView ? '#1976D2' : '#FFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimelineView(true)}
              style={[styles.segmentBtn, timelineView && styles.segmentBtnActive]}>
              <Icon name="list" size={18} color={timelineView ? '#1976D2' : '#FFF'} />
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
              style={[styles.pill, selectedCategory === cat.id && styles.pillActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Icon
                name={cat.icon}
                size={16}
                color={selectedCategory === cat.id ? '#FFF' : '#1976D2'}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.pillText, selectedCategory === cat.id && styles.pillTextActive]}>
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
        <View style={styles.modalRoot}>
          <View style={[styles.modalTopBar, { backgroundColor: selectedEvent?.color || '#1976D2' }]}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowEventModal(false)}>
              <Icon name="expand-more" size={32} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalEmoji}>{selectedEvent?.icon}</Text>
          </View>

          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalDateTitle}>{formatDate(selectedEvent?.date || '')}</Text>
            <Text style={styles.modalMainTitle}>{selectedEvent?.title}</Text>

            <View style={styles.modalInfoRow}>
              <View style={styles.infoBox}>
                <Icon name="place" size={20} color="#1976D2" />
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{selectedEvent?.location.name}</Text>
              </View>
              <View style={styles.infoBox}>
                <Icon name="category" size={20} color="#1976D2" />
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{selectedEvent?.category}</Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionHead}>Summary</Text>
              <Text style={styles.modalSectionText}>{selectedEvent?.description}</Text>
            </View>

            <View style={[styles.modalSection, styles.significanceBox]}>
              <Text style={[styles.modalSectionHead, { color: '#1976D2' }]}>Historical Significance</Text>
              <Text style={styles.modalSectionText}>{selectedEvent?.significance}</Text>
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
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, marginRight: 10,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4
  },
  pillActive: { backgroundColor: '#1976D2' },
  pillText: { fontSize: 13, color: '#1976D2', fontWeight: '700' },
  pillTextActive: { color: '#FFF' },

  mainArea: { flex: 1 },
  mapWrapper: { flex: 1, margin: 15, borderRadius: 24, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOpacity: 0.2 },
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
    flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 15, marginBottom: 20,
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