import { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import ImageCapture from './ImageCapture';
import { scanProduct } from '../utils/visionUtils';
import { useAuth } from '../hooks/useAuth';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ name: string; quantity: number } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [potentialLabels, setPotentialLabels] = useState<string[]>([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const { addProduct } = useProducts();
  const { user } = useAuth();

  const handleImageCapture = async (imageData: string) => {
    console.log('Image data length:', imageData.length);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/scanProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      });
      if (!response.ok) {
        throw new Error('Failed to scan product');
      }
      const result = await response.json();
      setPrediction(result);
      setName(result.name);
      setQuantity(result.quantity.toString());
      setPotentialLabels(result.allLabels || []);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error scanning product:', error);
      setError('Failed to identify the product. Please try again or enter the details manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to add a product');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await addProduct({ name, quantity: parseInt(quantity, 10) });
      console.log('Product added:', { name, quantity });
      setName('');
      setQuantity('');
      setSuccessOpen(true);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <ImageCapture onImageCapture={handleImageCapture} />
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {potentialLabels.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Potential products:</Typography>
          <ul>
            {potentialLabels.map((label, index) => (
              <li key={index}>
                <Button onClick={() => setName(label)}>{label}</Button>
              </li>
            ))}
          </ul>
        </Box>
      )}
      <TextField
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Product
      </Button>

      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>Confirm Product Details</DialogTitle>
        <DialogContent>
          <Typography>
            Identified Product: {prediction?.name}
          </Typography>
          <Typography>
            Suggested Quantity: {prediction?.quantity}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>Edit</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductForm;