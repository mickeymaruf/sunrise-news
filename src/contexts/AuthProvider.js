import React, { createContext, useContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from 'firebase/auth';

const auth = getAuth(app);
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const providerLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (name, picture) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: picture })
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser === null || currentUser.emailVerified) {
                setUser(currentUser);
            }
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    // loading categories
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://sunrise-news-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])
    const value = {
        user,
        providerLogin,
        createUser,
        loginUser,
        logOut,
        loading,
        updateUserProfile,
        verifyEmail,
        setLoading,
        categories
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;