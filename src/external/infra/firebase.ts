import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace the configuration below with your own Firebase project's configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbRnFil-4XffBTFA4fM08jc5EzjaKipsw",
    authDomain: "clerous.firebaseapp.com",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export the Firebase authentication module
export const auth = getAuth();
