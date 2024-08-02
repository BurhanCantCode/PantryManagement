import React, { useEffect, useState } from 'react';
import { Grid, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ProductCard from './ProductCard';
import { Product } from '../utils/types';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductList: React.FC = () => {
  const { products, updateProduct, removeProduct } = useProducts();
  const { user } = useAuth();
  const router = useRouter();
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleUpdate = async (id: string, quantity: number) => {
    await updateProduct(id, quantity);
    setSuccessMessage('Product updated successfully');
    setSuccessOpen(true);
  };

  const handleDelete = async (id: string) => {
    await removeProduct(id);
    setSuccessMessage('Product removed successfully');
    setSuccessOpen(true);
  };

  const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard 
              product={product} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductList;