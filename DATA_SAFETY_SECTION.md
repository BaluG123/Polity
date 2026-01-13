# Google Play Console - Data Safety Section Guide

## Complete Data Safety Configuration for TargetPolity App

This guide provides the exact answers you need to fill out the Data Safety section in Google Play Console.

---

## 📊 **SECTION 1: DATA COLLECTION OVERVIEW**

### **Does your app collect or share any of the required user data types?**
**Answer: YES**

---

## 🔐 **SECTION 2: DATA TYPES COLLECTED**

### **Personal Info**

#### **Name**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ❌ NO, this collected data is not processed ephemerally
- **Purpose:** Account management, App functionality
- **Collection Method:** Users provide this data
- **Explanation:** Display name from Google Sign-In for user profile and leaderboard

#### **Email address**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ❌ NO, this collected data is not processed ephemerally
- **Purpose:** Account management, App functionality
- **Collection Method:** Users provide this data
- **Explanation:** Email from Google Sign-In for account creation and authentication

#### **User IDs**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ❌ NO, this collected data is not processed ephemerally
- **Purpose:** Account management, App functionality
- **Collection Method:** Automatically collected
- **Explanation:** Firebase User ID for account management and data association

### **App Activity**

#### **App interactions**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ❌ NO, this collected data is not processed ephemerally
- **Purpose:** Analytics, App functionality
- **Collection Method:** Automatically collected
- **Explanation:** Quiz attempts, study progress, feature usage for progress tracking

#### **In-app search history**
- **Collected:** ❌ NO
- **Shared:** ❌ NO

#### **Installed apps**
- **Collected:** ❌ NO
- **Shared:** ❌ NO

#### **Other user-generated content**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ❌ NO, this collected data is not processed ephemerally
- **Purpose:** App functionality
- **Collection Method:** Users provide this data
- **Explanation:** Bookmarked articles, study notes, quiz responses

#### **Other actions**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ❌ NO, this collected data is not processed ephemerally
- **Purpose:** App functionality, Analytics
- **Collection Method:** Automatically collected
- **Explanation:** Study streaks, completion times, difficulty level preferences

### **App Info and Performance**

#### **Crash logs**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ✅ YES, this collected data is processed ephemerally
- **Purpose:** App functionality
- **Collection Method:** Automatically collected
- **Explanation:** Firebase Crashlytics for bug fixing and app stability

#### **Diagnostics**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ✅ YES, this collected data is processed ephemerally
- **Purpose:** App functionality
- **Collection Method:** Automatically collected
- **Explanation:** Performance metrics and error reporting

#### **Other app performance data**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ✅ YES, this collected data is processed ephemerally
- **Purpose:** App functionality, Analytics
- **Collection Method:** Automatically collected
- **Explanation:** App usage statistics, feature performance metrics

### **Device or other IDs**

#### **Device or other IDs**
- **Collected:** ✅ YES
- **Shared:** ❌ NO
- **Ephemeral Processing:** ✅ YES, this collected data is processed ephemerally
- **Purpose:** App functionality, Analytics
- **Collection Method:** Automatically collected
- **Explanation:** Firebase installation ID for analytics and crash reporting

---

## 🚫 **DATA TYPES NOT COLLECTED**

### **Location**
- **Precise location:** ❌ NO
- **Approximate location:** ❌ NO

### **Financial Info**
- **User payment info:** ❌ NO
- **Purchase history:** ❌ NO
- **Credit score:** ❌ NO
- **Other financial info:** ❌ NO

### **Health and Fitness**
- **Health info:** ❌ NO
- **Fitness info:** ❌ NO

### **Messages**
- **Emails:** ❌ NO
- **SMS or MMS:** ❌ NO
- **Other in-app messages:** ❌ NO

### **Photos and Videos**
- **Photos:** ❌ NO
- **Videos:** ❌ NO

### **Audio Files**
- **Voice or sound recordings:** ❌ NO
- **Music files:** ❌ NO
- **Other audio files:** ❌ NO

### **Files and Docs**
- **Files and docs:** ❌ NO

### **Calendar**
- **Calendar events:** ❌ NO

### **Contacts**
- **Contacts:** ❌ NO

---

## 🔒 **SECTION 3: DATA SECURITY**

### **Is all of the user data collected by your app encrypted in transit?**
**Answer: YES**
- All data transmission uses HTTPS/TLS encryption
- Firebase services provide encrypted data transmission

### **Do you provide a way for users to request that their data is deleted?**
**Answer: YES**
- Users can delete their account through the app
- Account deletion removes all associated user data
- Users can contact support for data deletion requests

---

## 🎯 **SECTION 4: DATA USAGE PURPOSES**

### **Account management**
- Name, Email address, User IDs
- **Explanation:** Required for Google Sign-In authentication and user account management

### **App functionality**
- All collected data types
- **Explanation:** Essential for core app features like quiz tracking, progress saving, leaderboard functionality

### **Analytics**
- App interactions, Device IDs, Performance data
- **Explanation:** To understand user behavior and improve app performance and user experience

### **Developer communications**
- Email address (optional)
- **Explanation:** Only for critical app updates or support responses when user initiates contact

---

## 📱 **SECTION 5: DATA SHARING**

### **Do you share user data with third parties?**
**Answer: NO**

**Explanation:** 
- We do not sell, rent, or share personal data with third parties for their marketing purposes
- Data is only processed by our service providers (Firebase) under strict data processing agreements
- No data is shared for advertising or marketing purposes

---

## 👶 **SECTION 6: KIDS & FAMILIES**

### **Is your app designed for children under 13?**
**Answer: NO**

### **Do you believe your app appeals to children under 13?**
**Answer: NO**

**Target Audience:** 13+ (teenagers and adults preparing for competitive exams)

---

## 🔐 **SECTION 7: SECURITY PRACTICES**

### **Data encryption**
- **In transit:** ✅ YES - All data encrypted using HTTPS/TLS
- **At rest:** ✅ YES - Firebase Firestore provides encryption at rest

### **Data access**
- **Limited access:** ✅ YES - Only authorized personnel have access to user data
- **Access controls:** ✅ YES - Role-based access controls implemented

### **Data retention**
- **Retention policy:** ✅ YES - Data retained only as long as necessary for service provision
- **User control:** ✅ YES - Users can delete their accounts and data

### **Security measures**
- **Regular security reviews:** ✅ YES
- **Vulnerability assessments:** ✅ YES
- **Incident response plan:** ✅ YES

---

## 📝 **SECTION 8: ADDITIONAL EXPLANATIONS**

### **Why we collect this data:**

1. **Authentication Data (Name, Email, User ID):**
   - Required for Google Sign-In functionality
   - Enables secure user authentication
   - Allows users to access their data across devices

2. **Quiz and Study Data (App interactions, User-generated content):**
   - Tracks learning progress and quiz performance
   - Enables personalized study recommendations
   - Powers leaderboard and competitive features
   - Saves bookmarks and study preferences

3. **Performance Data (Crash logs, Diagnostics):**
   - Identifies and fixes app crashes and bugs
   - Improves app performance and stability
   - Ensures smooth user experience

4. **Analytics Data (Device IDs, Usage patterns):**
   - Understands how users interact with the app
   - Identifies popular features and content
   - Guides app improvements and new feature development

### **Data minimization:**
- We collect only the minimum data necessary for app functionality
- No sensitive personal information is collected
- No location, financial, or health data is collected
- Users have control over their data and can delete it anytime

### **Third-party services:**
- **Firebase (Google):** Provides backend services, authentication, and analytics
- **Google Sign-In:** Handles user authentication securely
- All third-party services comply with strict data protection standards

---

## ✅ **QUICK CHECKLIST FOR PLAY CONSOLE**

When filling out the Data Safety section:

1. ✅ Select "YES" for data collection
2. ✅ Check the specific data types listed above
3. ✅ Select "NO" for data sharing with third parties
4. ✅ Confirm encryption in transit and at rest
5. ✅ Confirm users can request data deletion
6. ✅ Set target age as 13+
7. ✅ Provide clear explanations for each data type
8. ✅ Review and submit

---

## 🎯 **IMPORTANT NOTES**

- **Be Accurate:** Only declare data you actually collect
- **Be Transparent:** Clearly explain why you collect each data type
- **Be Consistent:** Ensure this matches your Privacy Policy
- **Regular Updates:** Update this section when you add new features

This configuration ensures full compliance with Google Play's Data Safety requirements while being transparent about your app's data practices.

---

## 🔄 **EPHEMERAL PROCESSING EXPLANATION**

### **What is Ephemeral Processing?**
Ephemeral processing means data is processed temporarily and not stored permanently. It's typically used for real-time analytics, crash reporting, and performance monitoring.

### **Our App's Ephemeral Processing:**

#### **✅ PROCESSED EPHEMERALLY:**
- **Crash logs** - Processed for immediate bug fixing, not stored long-term
- **Diagnostics** - Used for real-time performance monitoring
- **App performance data** - Processed for immediate analytics insights
- **Device IDs** - Used temporarily for analytics correlation

#### **❌ NOT PROCESSED EPHEMERALLY:**
- **Personal Info** (Name, Email, User IDs) - Stored permanently for account management
- **App Activity** (Quiz scores, progress, bookmarks) - Stored permanently for user experience
- **User-generated content** - Stored permanently as user data

### **Why This Distinction Matters:**
- **Ephemeral data** is processed quickly and discarded or aggregated
- **Non-ephemeral data** is stored to provide ongoing app functionality
- **User control** applies mainly to non-ephemeral data