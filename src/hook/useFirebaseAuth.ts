import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from '../external/infra/firebase'; // Assuming you have Firebase initialized and imported as 'auth'

const useFirebaseAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                const token = await user.getIdToken();
                setToken(token);
            } else {
                setToken(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setErrorMessage(null); // Clear any previous error messages
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("An error occurred during login. Please try again."); // Set the error message
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            setErrorMessage(null); // Clear any previous error messages
        } catch (error) {
            console.error("Error logging out:", error);
            setErrorMessage("An error occurred during logout. Please try again."); // Set the error message
        }
    };

    return { user, loading, errorMessage, token, login, logout };
};

export default useFirebaseAuth;
