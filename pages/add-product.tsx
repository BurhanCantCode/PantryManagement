import { NextPage } from 'next';
import { Container, Typography, Box, Paper } from '@mui/material';
import AddProductForm from '../components/AddProductForm';
import ScanProductButton from '../components/ScanProductButton';
import InfoBox from '../components/InfoBox';

const AddProduct: NextPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Add New Product
      </Typography>
      <InfoBox />
      <ScanProductButton />
      <AddProductForm />
    </Container>
  );
};

export default AddProduct;
