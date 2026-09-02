import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getTheme } from '../theme/palette';

// Shown before Redux hydrates, so it can't read the saved theme preference —
// it always renders the light-mode hero gradient, which is intentional
// (a consistent first frame regardless of device theme).
const theme = getTheme('light');

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const riseAnim = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(riseAnim, { toValue: 0, duration: 650, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => clearTimeout(timer);
  }, [fadeAnim, riseAnim, onFinish]);

  return (
    <LinearGradient colors={theme.heroGradient} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: riseAnim }] }]}>
        <Text style={styles.emblem}>🏛️</Text>
        <Text style={styles.title}>Rajakiya</Text>
        <Text style={styles.subtitle}>Indian Polity, mastered.</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  emblem: {
    fontSize: 72,
    marginBottom: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.78)',
    marginTop: 8,
    letterSpacing: 0.3,
  },
});

export default SplashScreen;
