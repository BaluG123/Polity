# 🏛️ TargetPolity - Indian Political Science Learning App

A comprehensive React Native application for mastering Indian Constitution, Political Science, and Government Structure. Perfect for UPSC, KPSC, and other competitive exam preparation.

## 🌟 Features

### 📚 Core Learning Modules
- **Constitution Explorer**: Interactive guide to Indian Constitution with all articles and amendments
- **Historical Events Map**: Visual timeline and map showing key political events in Indian history
- **Government Structure**: Detailed breakdown of Union, State, and Local government systems
- **Landmark Cases**: Supreme Court judgments that shaped Indian democracy
- **Practice Quizzes**: Topic-wise questions with explanations

### 🗺️ Historical Events Map (Key Feature)
- **Interactive Timeline**: Chronological view of major political events from 1947 to present
- **Map View**: Visual representation of events with location markers
- **Event Categories**: Independence, Constitution, Amendments, Judiciary, Emergency, Federalism
- **Detailed Information**: Date, location, significance, and impact of each event
- **Filter Options**: Browse events by category or time period

### 📱 User Experience
- **Modern UI**: Clean, intuitive interface with Material Design principles
- **Offline Support**: Access content without internet connection
- **Progress Tracking**: Monitor learning progress and maintain study streaks
- **Bookmarks**: Save important topics for quick reference
- **Search Functionality**: Find specific articles, cases, or events quickly

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TargetPolity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**
   
   For Android:
   ```bash
   npx react-native run-android
   ```
   
   For iOS:
   ```bash
   npx react-native run-ios
   ```

## 📖 Historical Events Covered

### Independence Era (1947-1950)
- **Independence Day (Aug 15, 1947)**: India's freedom from British rule
- **Constitution Adoption (Nov 26, 1949)**: Constituent Assembly adopts the Constitution
- **Republic Day (Jan 26, 1950)**: Constitution comes into effect

### Constitutional Developments
- **First Amendment (1951)**: Land reforms and Ninth Schedule
- **42nd Amendment (1976)**: "Mini Constitution" - added Socialist, Secular
- **73rd Amendment (1992)**: Panchayati Raj institutions
- **103rd Amendment (2019)**: EWS reservation

### Landmark Judicial Decisions
- **Kesavananda Bharati Case (1973)**: Basic Structure Doctrine
- **Maneka Gandhi Case (1978)**: Expanded Article 21
- **Mandal Commission (1990)**: OBC reservations

### Political Milestones
- **States Reorganization (1956)**: Linguistic reorganization
- **Emergency Period (1975-77)**: Suspension of civil liberties
- **Article 370 Abrogation (2019)**: Kashmir's special status removed

## 🏗️ Project Structure

```
TargetPolity/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (ErrorBoundary, etc.)
│   │   └── SplashScreen.js # App splash screen
│   ├── data/               # Static data and content
│   │   └── polityData.js   # Constitution, events, cases data
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js # Main navigation setup
│   ├── screens/            # App screens
│   │   ├── HomeScreen.js           # Dashboard
│   │   ├── ConstitutionScreen.js   # Constitution explorer
│   │   ├── HistoricalMapScreen.js  # Events map & timeline
│   │   ├── ExploreScreen.js        # Topic browser
│   │   ├── QuizScreen.js           # Practice quizzes
│   │   └── ...                     # Other screens
│   └── store/              # Redux state management
│       ├── index.js        # Store configuration
│       └── slices/         # Redux slices
├── android/                # Android-specific files
├── ios/                    # iOS-specific files
├── App.tsx                 # Main app component
└── package.json           # Dependencies and scripts
```

## 🎯 Key Components

### Historical Map Screen
The centerpiece feature that provides:
- **Timeline View**: Chronological list of events with detailed information
- **Map View**: Visual representation with location markers
- **Category Filters**: Filter events by type (Independence, Constitution, etc.)
- **Event Details**: Modal with comprehensive information about each event
- **Interactive Elements**: Touch-friendly interface with smooth animations

### Constitution Screen
- **Parts Browser**: Navigate through all 22 parts of the Constitution
- **Article Search**: Find specific articles quickly
- **Amendment History**: Track constitutional changes over time
- **Important Articles**: Highlighted key provisions

### Quiz System
- **Multiple Choice Questions**: Comprehensive question bank
- **Instant Feedback**: Explanations for correct answers
- **Progress Tracking**: Score history and performance analytics
- **Topic-wise Practice**: Focus on specific areas

## 📊 Data Structure

### Historical Events
Each event contains:
```javascript
{
  id: "unique_identifier",
  title: "Event Name",
  date: "YYYY-MM-DD",
  location: {
    latitude: number,
    longitude: number,
    name: "Location Name"
  },
  description: "Detailed description",
  significance: "Historical importance",
  category: "Event category",
  icon: "Emoji icon",
  color: "Theme color"
}
```

### Constitutional Articles
```javascript
{
  id: "article_id",
  number: "Article number",
  title: "Article title",
  description: "Brief description",
  part: "Constitutional part",
  importance: "high/medium/low"
}
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #1976D2 (Government/Official theme)
- **Secondary Colors**: 
  - Green: #4CAF50 (Success/Progress)
  - Orange: #FF9800 (Warnings/Important)
  - Red: #F44336 (Emergency/Critical)
  - Purple: #9C27B0 (Amendments)

### Typography
- **Headers**: Bold, 24-28px
- **Body Text**: Regular, 14-16px
- **Captions**: 12-14px
- **Font**: System default (San Francisco on iOS, Roboto on Android)

## 🔧 Technical Features

### State Management
- **Redux Toolkit**: Efficient state management
- **Slices**: Organized by feature (polity, auth, progress)
- **Persistence**: Local storage for offline access

### Navigation
- **React Navigation v6**: Modern navigation library
- **Tab Navigation**: Bottom tabs for main sections
- **Stack Navigation**: Hierarchical screen navigation
- **Deep Linking**: Support for direct content access

### Performance
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Efficient asset management
- **Memory Management**: Proper cleanup and disposal

## 📱 Platform Support

### Android
- **Minimum SDK**: API 24 (Android 7.0)
- **Target SDK**: API 34 (Android 14)
- **Architecture**: ARM64, ARMv7, x86, x86_64

### iOS
- **Minimum Version**: iOS 13.0
- **Architecture**: ARM64 (iPhone 5s and later)
- **Device Support**: iPhone, iPad

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Testing
```bash
# Add E2E testing framework (Detox recommended)
```

## 📦 Build & Deployment

### Android APK
```bash
cd android
./gradlew assembleRelease
```

### Android AAB (Play Store)
```bash
cd android
./gradlew bundleRelease
```

### iOS Archive
```bash
# Use Xcode for iOS builds
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Indian Constitution**: Source of all constitutional content
- **Supreme Court of India**: Landmark judgments and legal precedents
- **NCERT**: Political Science textbooks and curriculum
- **M. Laxmikanth**: Indian Polity reference material
- **React Native Community**: Open source libraries and tools

## 📞 Support

For support, email support@targetpolity.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0**: Initial release with core features
  - Constitution explorer
  - Historical events map
  - Basic quiz system
  - Progress tracking

---

**TargetPolity** - Empowering students to master Indian Political Science and Constitution through interactive learning. 🇮🇳