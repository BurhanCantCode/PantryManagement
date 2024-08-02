import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

const HeroSection = () => {
  const router = useRouter();

  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Pantry Manager
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Manage your pantry efficiently and effortlessly.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push('/inventory')}
          sx={{ mt: 4 }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;