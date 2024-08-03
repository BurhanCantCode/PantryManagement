import { NextPage } from 'next';
import { Typography, Button, Box, Paper, Container, TextField, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import AuthModal from '../components/AuthModal';
import { FaLock } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ImageCapture from './ImageCapture';
import { scanProduct } from '../utils/visionUtils';

const Login: NextPage = () => {
  const { user, redirectAfterAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      redirectAfterAuth();
    }
  }, [user, redirectAfterAuth]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 64px)' 
    }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <FaLock size={40} color="#3f51b5" />
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Sign in to manage your pantry, reduce waste, and never run out of essentials.
        </Typography>
        <AuthModal />
      </Paper>
    </Box>
  );
};

export default Login;