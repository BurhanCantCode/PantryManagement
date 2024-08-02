import { NextPage } from 'next';
import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const Profile: NextPage = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Typography>Please sign in to view your profile.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Button variant="contained" color="secondary" onClick={signOut} sx={{ mt: 2 }}>
        Sign Out
      </Button>
    </Container>
  );
};

export default Profile;