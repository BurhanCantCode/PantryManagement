import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { scanProduct } from '../utils/geminiUtils';

const ScanProductButton = () => {
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      // Implement image capture or upload logic here
      const imageData = ''; // Replace with actual image data
      const result = await scanProduct(imageData);
      console.log(result); // Handle the result as needed
    } catch (error) {
      console.error('Error scanning product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleScan}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : null}
    >
      {loading ? 'Scanning...' : 'Scan Product'}
    </Button>
  );
};

export default ScanProductButton;