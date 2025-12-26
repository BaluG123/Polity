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
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setSelectedEvent, setHistoricalEvents } from '../store/slices/politySlice';
import { HISTORICAL_EVENTS } from '../data/polityData';

const { width, height } = Dimensions.get('window');

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
    { id: 'all', title: 'All Events', icon: '📚', color: '#1976D2' },
    { id: 'Independence', title: 'Independence', icon: '🇮🇳', color: '#FF9800' },
    { id: 'Constitution', title: 'Constitution', icon: '📜', color: '#1976D2' },
    { id: 'Amendment', title: 'Amendments', icon: '📝', color: '#9C27B0' },
    { id: 'Judiciary', title: 'Judiciary', icon: '⚖️', color: '#E91E63' },
    { id: 'Emergency', title: 'Emergency', icon: '⚠️', color: '#F44336' },
    { id: 'Federalism', title: 'Federalism', icon: '🗺️', color: '#607D8B' },
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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getYearFromDate = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const renderMapView = () => (
    <View style={styles.mapContainer}>
      {/* Simplified India Map with Event Markers */}
      <View style={styles.indiaMapContainer}>
        <Text style={styles.mapTitle}>🗺️ India - Historical Political Events</Text>
        
        {/* Map Background */}
        <View style={styles.mapBackground}>
          <Text style={styles.mapLabel}>INDIA</Text>
          
          {/* Event Markers */}
          {filteredEvents.map((event, index) => (
            <TouchableOpacity
              key={event.id}
              style={[
                styles.eventMarker,
                {
                  backgroundColor: event.color,
                  left: `${45 + (index % 3) * 15}%`,
                  top: `${30 + (index % 4) * 15}%`,
                }
              ]}
              onPress={() => handleEventPress(event)}
            >
              <Text style={styles.markerIcon}>{event.icon}</Text>
              <Text style={styles.markerYear}>{getYearFromDate(event.date)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Legend</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.slice(1).map(category => (
              <View key={category.id} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: category.color }]} />
                <Text style={styles.legendText}>{category.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );

  const renderTimelineView = () => (
    <ScrollView style={styles.timelineContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.timelineTitle}>📅 Political Events Timeline</Text>
      
      {sortedEvents.map((event, index) => (
        <TouchableOpacity
          key={event.id}
          style={styles.timelineItem}
          onPress={() => handleEventPress(event)}
        >
          <View style={styles.timelineLeft}>
            <View style={[styles.timelineDot, { backgroundColor: event.color }]}>
              <Text style={styles.timelineIcon}>{event.icon}</Text>
            </View>
            {index < sortedEvents.length - 1 && <View style={styles.timelineLine} />}
          </View>
          
          <View style={styles.timelineContent}>
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineDate}>{formatDate(event.date)}</Text>
              <View style={[styles.categoryBadge, { backgroundColor: event.color }]}>
                <Text style={styles.categoryText}>{event.category}</Text>
              </View>
            </View>
            <Text style={styles.timelineEventTitle}>{event.title}</Text>
            <Text style={styles.timelineDescription}>{event.description}</Text>
            <Text style={styles.timelineLocation}>📍 {event.location.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderEventModal = () => (
    <Modal
      visible={showEventModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowEventModal(false)}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={[selectedEvent?.color || '#1976D2', '#1565C0']}
          style={styles.modalHeader}
        >
          <View style={styles.modalHeaderContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowEventModal(false)}
            >
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalIcon}>{selectedEvent?.icon}</Text>
            <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
            <Text style={styles.modalDate}>{formatDate(selectedEvent?.date || '')}</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.modalContent}>
          <View style={styles.modalSection}>
            <Text style={styles.sectionTitle}>📍 Location</Text>
            <Text style={styles.sectionContent}>{selectedEvent?.location.name}</Text>
          </View>

          <View style={styles.modalSection}>
            <Text style={styles.sectionTitle}>📝 Description</Text>
            <Text style={styles.sectionContent}>{selectedEvent?.description}</Text>
          </View>

          <View style={styles.modalSection}>
            <Text style={styles.sectionTitle}>⭐ Historical Significance</Text>
            <Text style={styles.sectionContent}>{selectedEvent?.significance}</Text>
          </View>

          <View style={styles.modalSection}>
            <Text style={styles.sectionTitle}>🏷️ Category</Text>
            <View style={[styles.categoryBadge, { backgroundColor: selectedEvent?.color }]}>
              <Text style={styles.categoryText}>{selectedEvent?.category}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Historical Events</Text>
          <Text style={styles.headerSubtitle}>
            Explore key moments in Indian political history
          </Text>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, !timelineView && styles.toggleButtonActive]}
            onPress={() => setTimelineView(false)}
          >
            <Icon name="map" size={20} color={!timelineView ? "#1976D2" : "#FFFFFF"} />
            <Text style={[styles.toggleText, !timelineView && styles.toggleTextActive]}>
              Map View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, timelineView && styles.toggleButtonActive]}
            onPress={() => setTimelineView(true)}
          >
            <Icon name="timeline" size={20} color={timelineView ? "#1976D2" : "#FFFFFF"} />
            <Text style={[styles.toggleText, timelineView && styles.toggleTextActive]}>
              Timeline
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryOption,
              selectedCategory === category.id && styles.categoryOptionActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <View style={styles.content}>
        {timelineView ? renderTimelineView() : renderMapView()}
      </View>

      {/* Event Detail Modal */}
      {renderEventModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 3,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 17,
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  toggleTextActive: {
    color: '#1976D2',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryOptionActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#1976D2',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#1976D2',
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  mapContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  indiaMapContainer: {
    flex: 1,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    minHeight: 400,
    borderWidth: 2,
    borderColor: '#C8E6C9',
  },
  mapLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    opacity: 0.2,
    position: 'absolute',
  },
  eventMarker: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  markerIcon: {
    fontSize: 18,
  },
  markerYear: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 1,
  },
  legend: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  timelineContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timelineIcon: {
    fontSize: 16,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 10,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timelineDate: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  categoryBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timelineEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  timelineLocation: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalHeader: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  modalHeaderContent: {
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

export default HistoricalMapScreen;