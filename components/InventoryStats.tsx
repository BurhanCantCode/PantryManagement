import { Typography, Paper, Grid, Box } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningIcon from '@mui/icons-material/Warning';

const InventoryStats = () => {
  const { products } = useProducts();

  const totalProducts = products.length;
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const lowStockItems = products.filter((product) => product.quantity < 5).length;

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>Inventory Overview</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InventoryIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4">{totalProducts}</Typography>
              <Typography variant="body2">Total Products</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 40, mr: 2, color: 'secondary.main' }} />
            <Box>
              <Typography variant="h4">{totalItems}</Typography>
              <Typography variant="body2">Total Items</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon sx={{ fontSize: 40, mr: 2, color: 'warning.main' }} />
            <Box>
              <Typography variant="h4">{lowStockItems}</Typography>
              <Typography variant="body2">Low Stock Items</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InventoryStats;