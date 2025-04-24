import React, { useState, useEffect } from 'react';
import logo from '@/assets/logo.svg';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { RootState } from '@/api/store/store';
import { logout, reset } from '@/features/auth/authSlice';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div className="w-full z-50 bg-primary border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between items-center">
          {/* Logo */}
          <button className="flex items-center space-x-2" onClick={() => navigate('/')}>
            <img className="h-10 w-auto" src={logo} alt="Swatini Shop Logo" />
            <h1 className="font-bold text-accent text-lg">SWATINI.SHOP</h1>
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-accent">
                  Welcome, {user?.first_name || 'User'}
                </span>
                <Button variant="secondary" rounded="full" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button variant="secondary-outline" rounded="full" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="secondary" rounded="full" onClick={() => navigate('/login')}>Log In</Button>
                <Button variant="secondary-outline" rounded="full" onClick={() => navigate('/signup')}>Sign Up</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-primary opacity-50 z-40 min-h-screen"
            onClick={toggleMenu}
          />
          

          {/* Drawer */}
          <div className="fixed top-0 right-0 w-64 min-h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
          {/* Close Button */}
  <div className="flex justify-end p-4">
    <button onClick={toggleMenu} aria-label="Close menu">
      <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
    </button>
  </div>
            <div className="p-6 flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm font-medium text-primary">
                    Welcome, {user?.first_name || 'User'}
                  </span>
                  <Button variant="secondary" onClick={() => {
                    navigate('/dashboard');
                    toggleMenu();
                  }}>
                    Dashboard
                  </Button>
                  <Button variant="secondary-outline" onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" onClick={() => {
                    navigate('/login');
                    toggleMenu();
                  }}>
                    Log In
                  </Button>
                  <Button variant="secondary-outline" onClick={() => {
                    navigate('/signup');
                    toggleMenu();
                  }}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

