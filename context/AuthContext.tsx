import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { useRouter } from 'next/router';
import { incrementUserCount } from '../utils/analyticsUtils';

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  redirectAfterAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      console.error('Sign in error:', error);
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      await incrementUserCount(); // Increment user count on successful sign-up
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/login'); // Redirect to login page after sign out
  };

  const redirectAfterAuth = () => {
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, redirectAfterAuth }}>
      {children}
    </AuthContext.Provider>
  );
};