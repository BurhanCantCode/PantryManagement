import { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import AddProductForm from '../components/AddProductForm';
import ScanProductButton from '../components/ScanProductButton';

const AddProduct: NextPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Add New Product
      </Typography>
      <ScanProductButton />
      <AddProductForm />
    </Container>
  );
};

export default AddProduct;