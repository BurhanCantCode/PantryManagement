import { NextPage } from 'next';
import { Typography, Button, Grid, Paper, Box, Container } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import InventoryStats from '../components/InventoryStats';
import Link from 'next/link';
import { FaBoxOpen, FaPlus, FaChartBar, FaShoppingBasket } from 'react-icons/fa';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Pantry Manager
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Efficiently manage your pantry, reduce waste, and never run out of essentials again.
      </Typography>
      
      {user ? (
        <>
          <InventoryStats />
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <FaBoxOpen size={40} color="#3f51b5" />
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>View Inventory</Typography>
                <Link href="/inventory" passHref>
                  <Button variant="outlined" color="primary" sx={{ mt: 2 }}>Go to Inventory</Button>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <FaPlus size={40} color="#4caf50" />
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>Add New Product</Typography>
                <Link href="/add-product" passHref>
                  <Button variant="outlined" color="primary" sx={{ mt: 2 }}>Add Product</Button>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <FaChartBar size={40} color="#f50057" />
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>View Analytics</Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 2 }}>Coming Soon</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <FaShoppingBasket size={40} color="#ff9800" />
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>Shopping List</Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 2 }}>Coming Soon</Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default Home;