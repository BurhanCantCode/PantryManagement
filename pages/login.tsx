import { NextPage } from 'next';
import { Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { FaLock } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthModal from '../components/AuthModal';
import PasswordReset from '../components/PasswordReset';

const Login: NextPage = () => {
  const { user, redirectAfterAuth } = useAuth();
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (user) {
      redirectAfterAuth();
    }
  }, [user, redirectAfterAuth]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

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
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Reset Password" />
        </Tabs>
        {tabIndex === 0 && <AuthModal />}
        {tabIndex === 1 && <PasswordReset />}
      </Paper>
    </Box>
  );
};

export default Login;
