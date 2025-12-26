# Firebase Configuration Guide

Since I cannot access your Firebase Console, you need to perform these steps manually.

## 1. Get SHA-1 Fingerprint
**SHA-1**: `FC:A9:F9:2D:8B:20:C4:10:60:10:68:C1:F4:D3:70:38:62:BB:BA:AA`

Copy this key and paste it into the Firebase Console.

## 2. Firebase Console Setup
1. Go to **Project Settings** -> **General**.
2. Scroll to **Your Apps** -> Select the Android App.
3. Click **Add fingerprint**.
4. Paste the **SHA-1** key.
5. **Download `google-services.json`** again (if it changed) and replace the one in `android/app/`.

## 3. Enable Authentication
1. Go to **Authentication** -> **Sign-in method**.
2. Click **Add new provider** -> **Google**.
3. Enable it.
4. **Copy the "Web SDK configuration -> Web client ID"**.
5. Paste this Client ID into `src/services/AuthService.js` (User has already done this).

## 4. Enable Firestore
1. Go to **Firestore Database**.
2. Click **Create Database**.
3. Choose **Production Mode** (or Test Mode for now).
4. Select a location (e.g., `asia-south1`).

## 5. Security Rules (Important)
Go to **Firestore** -> **Rules** and paste this to allow signed-in users:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
