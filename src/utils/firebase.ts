import firebase from 'firebase/app';
import 'firebase/auth';
import "import firebase from 'firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
	// apiKey: 'AIzaSyAAT5HKowY3AvTKCB5X36KWaTJRVwlRZc8',
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	// authDomain: 'expense-tracker-ms.firebaseapp.com',
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	// projectId: 'expense-tracker-ms',
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	// storageBucket: 'expense-tracker-ms.appspot.com',
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: '418800560184',
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	// appId: '1:418800560184:web:32324a91e5bf4f8b21decd',
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	// measurementId: 'G-X97117G64C',
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.app.length) {
	firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = firebase.auth();
export { auth, app };

console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
