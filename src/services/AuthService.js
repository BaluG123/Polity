import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
    webClientId: '57549035472-hegi6idf85i1et3nv2r9gibm4gaorr5c.apps.googleusercontent.com', // Get this from Firebase Console -> Authentication -> Sign-in method -> Google
    offlineAccess: true,
});

export const signInWithGoogle = async () => {
    try {
        console.log('STEP 1: Checking Play Services');
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        console.log('STEP 2: Signing In');
        const calculateUserInfo = await GoogleSignin.signIn();
        console.log('STEP 3: User Info:', calculateUserInfo);

        const userInfo = calculateUserInfo.data || calculateUserInfo;
        const { idToken } = userInfo;

        if (!idToken) throw new Error('No ID Token found');

        console.log('STEP 4: Creating Credential');
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        console.log('STEP 5: Firebase Sign In');
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.error('AuthService Error Location:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error('Sign Out Error:', error);
    }
};

export const getCurrentUser = () => {
    return auth().currentUser;
};

export const subscribeToAuthChanges = (callback) => {
    return auth().onAuthStateChanged(callback);
};
