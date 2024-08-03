import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Product } from './types';

const COLLECTION_NAME = 'products';

export const getProducts = async (userId: string): Promise<Product[]> => {
  if (!userId) {
    throw new Error('User ID is required to fetch products');
  }
  try {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error: unknown) {
    console.error('Error in getProducts:', error);
    throw error instanceof Error ? error : new Error('Failed to get products');
  }
};

export const addProduct = async (userId: string, product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), { ...product, userId });
    return { id: docRef.id, ...product };
  } catch (error: unknown) {
    console.error('Error adding product:', error);
    throw error instanceof Error ? error : new Error('Failed to add product');
  }
};

export const updateProduct = async (userId: string, id: string, data: Partial<Product>): Promise<void> => {
  const productRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(productRef, data);
};

export const removeProduct = async (userId: string, id: string): Promise<void> => {
  const productRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(productRef);
};