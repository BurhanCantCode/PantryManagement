import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Layout = ({ children, toggleTheme, isDarkMode }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Container component={motion.main} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        maxWidth="lg" 
        sx={{ flexGrow: 1, py: 4 }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;