import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

const COLLECTION_NAME = 'products';

const sampleProducts = [
  { name: 'Apple', quantity: 5 },
  { name: 'Banana', quantity: 3 },
  { name: 'Orange', quantity: 7 },
  { name: 'Milk', quantity: 2 },
  { name: 'Bread', quantity: 1 },
];

export const initializeDatabase = async () => {
  const productsCollection = collection(db, COLLECTION_NAME);
  
  for (const product of sampleProducts) {
    await addDoc(productsCollection, product);
  }
  
  console.log('Database initialized with sample products');
};
