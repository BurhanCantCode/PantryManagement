import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import { FaUser, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ toggleTheme, isDarkMode }: NavbarProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Link href="/" passHref>
          <Button 
            color="inherit" 
            startIcon={<HomeIcon />}
            sx={{ backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
          >
            Home
          </Button>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          <Link href="/" passHref>
            <a style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="/logo.png" alt="Pantry Manager Logo" style={{ height: '30px', marginRight: '10px' }} />
              Pantry Manager
            </a>
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <>
              <Link href="/inventory" passHref>
                <Button 
                  color="inherit"
                  sx={{ backgroundColor: isActive('/inventory') ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
                >
                  Inventory
                </Button>
              </Link>
              <Link href="/add-product" passHref>
                <Button color="inherit">Add Product</Button>
              </Link>
            </>
          )}
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
          {user ? (
            <>
              <Link href="/profile" passHref>
                <Button color="inherit" startIcon={<FaUser />}>
                  Profile
                </Button>
              </Link>
              <Button color="inherit" onClick={handleSignOut} startIcon={<FaSignOutAlt />}>
                Sign Out
              </Button>
            </>
          ) : (
            <AuthModal />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;