# TargetPolity - Political Science Learning App

## 🏛️ Project Overview
TargetPolity is a comprehensive Political Science learning app for UPSC/KPSC preparation, similar to TargetGeo but focused on Indian Polity, Constitution, Governance, and Political Systems.

## 📱 App Features
- **Interactive Constitution Explorer**: Navigate through articles, schedules, and amendments
- **Government Structure Visualizer**: Understand the three pillars of democracy
- **Case Studies & Landmark Judgments**: Supreme Court cases with detailed analysis
- **Current Affairs Integration**: Latest political developments and their significance
- **Quiz System**: Topic-wise and mixed quizzes with explanations
- **Progress Tracking**: Study streaks, completed topics, and performance analytics
- **Bookmarks**: Save important articles, cases, and concepts
- **Offline Support**: Complete offline functionality

## 🎨 App Theme & Design
- **Primary Color**: #1976D2 (Blue - representing democracy and governance)
- **Secondary Color**: #FF6F00 (Orange - representing the Indian flag)
- **Accent Color**: #4CAF50 (Green - representing growth and progress)
- **App Icon**: 🏛️ (Government building/Parliament)

## 📂 Project Structure

```
TargetPolity/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── CustomButton.js
│   │   ├── ConstitutionViewer.js
│   │   ├── GovernmentStructure.js
│   │   ├── CaseStudyCard.js
│   │   └── SplashScreen.js
│   ├── data/
│   │   ├── polityData.js
│   │   ├── constitutionData.js
│   │   ├── caseStudiesData.js
│   │   └── currentAffairsData.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ExploreScreen.js
│   │   ├── ConstitutionScreen.js
│   │   ├── GovernanceScreen.js
│   │   ├── CaseStudiesScreen.js
│   │   ├── QuizScreen.js
│   │   ├── ProgressScreen.js
│   │   ├── BookmarkScreen.js
│   │   ├── TopicDetailScreen.js
│   │   ├── ConceptDetailScreen.js
│   │   └── CaseStudyDetailScreen.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── notificationService.js
│   │   └── dataService.js
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │       ├── politySlice.js
│   │       ├── progressSlice.js
│   │       ├── authSlice.js
│   │       └── quizSlice.js
│   └── utils/
│       ├── dataHelpers.js
│       ├── constants.js
│       └── formatters.js
├── android/
├── ios/
├── package.json
├── App.tsx
└── README.md
```

## 🏛️ Content Categories

### 1. Indian Constitution
- **Preamble & Basic Structure**
- **Fundamental Rights (Articles 12-35)**
- **Directive Principles (Articles 36-51)**
- **Fundamental Duties (Article 51A)**
- **Constitutional Amendments**
- **Schedules (1st to 12th)**

### 2. Government Structure
- **Union Government**
  - President, Vice President, Prime Minister
  - Council of Ministers, Parliament
- **State Government**
  - Governor, Chief Minister, State Legislature
- **Local Government**
  - Panchayati Raj, Urban Local Bodies

### 3. Judiciary
- **Supreme Court**
- **High Courts**
- **Subordinate Courts**
- **Judicial Review**
- **Landmark Cases**

### 4. Electoral System
- **Election Commission**
- **Electoral Process**
- **Political Parties**
- **Electoral Reforms**

### 5. Constitutional Bodies
- **UPSC, CAG, Election Commission**
- **Finance Commission**
- **National Human Rights Commission**
- **Information Commission**

## 🚀 Setup Instructions

1. **Create New React Native Project**:
```bash
npx @react-native-community/cli@latest init TargetPolity
cd TargetPolity
```

2. **Install Dependencies**:
```bash
npm install @reduxjs/toolkit react-redux
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
npm install react-native-vector-icons react-native-linear-gradient
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
npm install @react-native-google-signin/google-signin
npm install react-native-splash-screen
npm install @notifee/react-native @react-native-firebase/messaging
```

3. **Configure Android**:
- Update `android/app/build.gradle`
- Add Google Services configuration
- Configure vector icons
- Set up Firebase

4. **Configure iOS**:
- Update `ios/Podfile`
- Run `cd ios && pod install`
- Configure Firebase
- Set up vector icons

## 📊 Key Differences from TargetGeo

| Feature | TargetGeo | TargetPolity |
|---------|-----------|--------------|
| **Primary Focus** | Geography & Maps | Constitution & Governance |
| **Main Screen** | Interactive Maps | Constitution Explorer |
| **Content Type** | Physical/Human Geography | Political Science/Polity |
| **Visual Elements** | Maps, Locations | Government Structure, Articles |
| **Color Scheme** | Green (#4CAF50) | Blue (#1976D2) |
| **Icon Theme** | 🌍 Earth/Geography | 🏛️ Government/Democracy |
| **Special Features** | Leaflet Maps | Constitution Viewer, Case Studies |

## 🎯 Unique Features for TargetPolity

1. **Interactive Constitution**: Article-by-article navigation with search
2. **Government Org Chart**: Visual representation of government structure
3. **Case Law Database**: Landmark Supreme Court judgments
4. **Amendment Timeline**: Historical view of constitutional amendments
5. **Current Affairs Integration**: Latest political developments
6. **Comparative Analysis**: Compare different government systems
7. **Mock Parliament**: Simulate parliamentary procedures
8. **Rights & Duties Checker**: Interactive tool for fundamental rights

## 📱 App Navigation Structure

```
Bottom Tabs:
├── Home (🏠) - Dashboard with study progress
├── Explore (📚) - Browse topics and concepts
├── Constitution (📜) - Interactive constitution viewer
├── Cases (⚖️) - Landmark judgments and case studies
├── Quiz (🧠) - Practice questions and tests
└── Progress (📊) - Study analytics and bookmarks
```

## 🔧 Development Phases

### Phase 1: Core Setup
- Project initialization
- Navigation setup
- Basic UI components
- Data structure design

### Phase 2: Content Integration
- Constitution data integration
- Government structure visualization
- Basic quiz functionality

### Phase 3: Advanced Features
- Case studies integration
- Progress tracking
- Bookmark system
- Search functionality

### Phase 4: Polish & Deploy
- UI/UX refinements
- Performance optimization
- Testing and bug fixes
- Play Store deployment

## 📝 Next Steps

1. Create the new React Native project
2. Set up the basic navigation structure
3. Design the data models for political science content
4. Implement the core screens and components
5. Integrate Firebase for authentication and data sync
6. Add quiz functionality and progress tracking
7. Test and deploy to Play Store

Would you like me to start creating the specific files and components for TargetPolity?