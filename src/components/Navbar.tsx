import React, { useState, useEffect } from 'react';
import logo from '@/assets/logo.svg';
import { ButtonPrimary, ButtonSecondary } from '@/components/Button';
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
    <div className="w-full z-50 bg-secondary-accent border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between items-center">
          <button className="flex items-center space-x-2" onClick={() => navigate('/')}>
            <img className="h-10 w-auto" src={logo} alt="Swatini Shop Logo" />
            <h1 className="font-bold text-primary text-lg">SWATINI.SHOP</h1>
          </button>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-primary">
                  Welcome, {user?.first_name || 'User'}
                </span>
                <ButtonPrimary text="Dashboard" onClick={() => navigate('/dashboard')} />
                <ButtonSecondary text="Logout" onClick={handleLogout} />
              </>
            ) : (
              <>
                <ButtonPrimary text="Login" onClick={() => navigate('/login')} />
                <ButtonSecondary text="Sign Up" onClick={() => navigate('/signup')} />
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

     
      
    </div>
  );
};

