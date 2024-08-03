import { Box, Typography, Paper } from '@mui/material';
import { FaInfoCircle } from 'react-icons/fa';

const InfoBox = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FaInfoCircle size={24} color="#3f51b5" />
        <Typography variant="h6" sx={{ ml: 2 }}>
          How to Add Products
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Use the webcam or upload a picture to detect the product. Ensure the object is in good lighting for better accuracy. The system will identify the product and suggest a default quantity.
      </Typography>
    </Paper>
  );
};

export default InfoBox;