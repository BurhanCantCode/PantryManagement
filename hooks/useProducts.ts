import { useState, useEffect, useCallback } from 'react';
import { getProducts, addProduct as addProductToFirebase, updateProduct as updateProductInFirebase, removeProduct as removeProductFromFirebase } from '../utils/firebaseUtils';
import { Product } from '../utils/types';
import { useAuth } from './useAuth';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProducts = useCallback(async () => {
    if (!user) {
      setError('No user logged in');
      setLoading(false);
      return;
    }
    try {
      const fetchedProducts = await getProducts(user.uid);
      setProducts(fetchedProducts);
      setLoading(false);
    } catch (err: unknown) {
      console.error('Error fetching products:', err);
      setError(`Failed to fetch products: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    if (!user) {
      setError('No user logged in');
      return;
    }
    try {
      const newProduct = await addProductToFirebase(user.uid, product);
      setProducts(prevProducts => [...prevProducts, newProduct]);
    } catch (err: unknown) {
      console.error('Error adding product:', err);
      setError('Failed to add product');
      throw err instanceof Error ? err : new Error('Failed to add product');
    }
  };

  const updateProduct = async (id: string, quantity: number) => {
    if (!user) {
      setError('No user logged in');
      return;
    }
    try {
      await updateProductInFirebase(user.uid, id, { quantity });
      setProducts(prevProducts =>
        prevProducts.map(p => p.id === id ? { ...p, quantity } : p)
      );
    } catch (err: unknown) {
      console.error('Error updating product:', err);
      setError('Failed to update product');
    }
  };

  const removeProduct = async (id: string) => {
    if (!user) {
      setError('No user logged in');
      return;
    }
    try {
      await removeProductFromFirebase(user.uid, id);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    } catch (err: unknown) {
      console.error('Error removing product:', err);
      setError('Failed to remove product');
    }
  };

  return { products, loading, error, addProduct, updateProduct, removeProduct, fetchProducts };
};