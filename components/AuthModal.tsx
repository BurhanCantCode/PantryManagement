import { useState } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';

interface AuthModalProps {
  buttonText?: string;
  fullWidth?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ buttonText = "Sign In", fullWidth = false }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      setOpen(false);
      router.push('/'); // Redirect to the main page
    } catch (error: unknown) {
      console.error('Authentication error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  // Helper function to extract error message
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

  return (
    <>
      <Button 
        color="inherit" 
        onClick={() => setOpen(true)}
        fullWidth={fullWidth}
        variant={fullWidth ? "contained" : "text"}
      >
        {buttonText}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AuthModal;