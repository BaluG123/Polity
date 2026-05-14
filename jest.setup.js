/* eslint-env jest */

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: {
      View,
      ScrollView: View,
      createAnimatedComponent: component => component,
    },
    View,
    ScrollView: View,
    createAnimatedComponent: component => component,
    useSharedValue: value => ({ value }),
    useAnimatedStyle: callback => callback(),
    withTiming: value => value,
    withSpring: value => value,
    Easing: { linear: jest.fn() },
    runOnJS: fn => fn,
    FadeIn: {},
    FadeOut: {},
    Layout: {},
    useAnimatedRef: () => React.createRef(),
  };
});

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ children, ...props }) => React.createElement(View, props, children);
});

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('react-native-webview', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    WebView: props => React.createElement(View, props),
  };
});

jest.mock('@react-native-firebase/auth', () => {
  const auth = () => ({
    currentUser: null,
    onAuthStateChanged: callback => {
      callback(null);
      return jest.fn();
    },
    signInWithCredential: jest.fn(),
    signOut: jest.fn(),
  });
  auth.GoogleAuthProvider = {
    credential: jest.fn(() => ({})),
  };
  return auth;
});

jest.mock('@react-native-firebase/firestore', () => {
  const chain = {
    doc: jest.fn(() => chain),
    collection: jest.fn(() => chain),
    orderBy: jest.fn(() => chain),
    limit: jest.fn(() => chain),
    get: jest.fn(async () => ({ docs: [], exists: false, data: () => ({}) })),
    set: jest.fn(),
  };
  const firestore = () => ({
    collection: jest.fn(() => chain),
    runTransaction: jest.fn(async callback => callback({
      get: jest.fn(async () => ({ exists: false, data: () => ({}) })),
      set: jest.fn(),
    })),
  });
  firestore.FieldValue = { serverTimestamp: jest.fn(() => new Date()) };
  return firestore;
});

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    revokeAccess: jest.fn(),
    signOut: jest.fn(),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
}));

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(),
    createChannel: jest.fn(async () => 'default'),
    createTriggerNotification: jest.fn(),
    displayNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
  },
  TriggerType: { TIMESTAMP: 0 },
  RepeatFrequency: { DAILY: 1 },
  AndroidImportance: { HIGH: 4, DEFAULT: 3 },
}));
