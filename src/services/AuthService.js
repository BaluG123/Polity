import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
    webClientId: '57549035472-hegi6idf85i1et3nv2r9gibm4gaorr5c.apps.googleusercontent.com', // Get this from Firebase Console -> Authentication -> Sign-in method -> Google
    offlineAccess: true,
});

export const signInWithGoogle = async () => {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Get the users ID token
        const { idToken, user } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.error('Google Sign-In Error:', error);
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
