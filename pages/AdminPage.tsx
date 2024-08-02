import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { getUserCount } from '../utils/analyticsUtils';
import { useAuth } from '../hooks/useAuth';

const AdminPage: NextPage = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await getUserCount();
      setUserCount(count);
    };

    fetchUserCount();
  }, []);

  if (!user) {
    return <Typography>Access denied. Please log in as an admin.</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            User Statistics
          </Typography>
          <Typography>
            Total Users: {userCount !== null ? userCount : 'Loading...'}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminPage;
