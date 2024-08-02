import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';
import { lightTheme, darkTheme } from '../styles/theme';
import '../styles/globals.css';
import { auth } from '../utils/firebaseConfig'; // Import auth

function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Ensure Firebase is initialized
    const unsubscribe = auth.onAuthStateChanged(() => {
      // This is just to trigger Firebase initialization
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;