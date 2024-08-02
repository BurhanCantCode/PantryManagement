import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from '../utils/types';

interface ProductCardProps {
  product: Product;
  onUpdate: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onDelete }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdate(product.id, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    onUpdate(product.id, newQuantity);
  };

  const handleDelete = () => {
    onDelete(product.id);
  };

  return (
    <Card elevation={3} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      transition: 'transform 0.2s', 
      '&:hover': { transform: 'scale(1.03)' } 
    }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>{product.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body1" color="text.secondary">Quantity:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleDecrement} size="small" color="primary">
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton onClick={handleIncrement} size="small" color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ mt: 2 }}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;