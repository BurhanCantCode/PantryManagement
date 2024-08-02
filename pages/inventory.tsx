import { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Inventory: NextPage = () => {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (!user) return <Typography>Redirecting to login...</Typography>;
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ padding: '32px 16px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Inventory
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <ProductList products={filteredProducts} />
    </Container>
  );
};

export default Inventory;