module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-drawer-layout|@react-native|@react-navigation|react-redux|@reduxjs|immer|redux|redux-thunk|reselect|@react-native-async-storage)/)',
  ],
};
