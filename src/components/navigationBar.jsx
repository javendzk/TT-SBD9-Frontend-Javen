import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isLoggedIn, getUser, removeUser } from '../utils/authentication';
import logoKlinikJaven from '../assets/logo_klinikjaven.png';
import logoKlinikJavenInverse from '../assets/logo_klinikjaven_inverse.png';

const NavigationBar = ({ isTransparent = false }) => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn()) {
      setUser(getUser());
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    removeUser();
    setUser(null);
    navigate('/login');
  };
  
  const navbarBgClasses = () => {
    if (isTransparent && !scrolled) {
      return "bg-transparent";
    } else if (scrolled) {
      return "bg-white bg-opacity-95 shadow-lg mx-4 sm:mx-8 mt-2 rounded-lg";
    } else {
      return "bg-white";
    }
  };

  const textColorClass = isTransparent && !scrolled ? "text-white" : "text-gray-700";
  
  const primaryBtnClasses = isTransparent && !scrolled 
    ? "bg-white text-[#0077b6] hover:bg-gray-100" 
    : "bg-[#0077b6] text-white hover:bg-blue-800";

  const logoSrc = isTransparent && !scrolled 
    ? logoKlinikJavenInverse  
    : logoKlinikJaven;         

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBgClasses()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={logoSrc} 
                alt="Klinik Javen" 
                className="h-8 md:h-10 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = isTransparent && !scrolled 
                    ? "https://via.placeholder.com/150x40/ffffff/ffffff?text=Klinik+Javen" 
                    : "https://via.placeholder.com/150x40/0077b6/ffffff?text=Klinik+Javen";
                }}
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user ? (
                <>
                  <span className={textColorClass}>Halo, {user.username}</span>
                  <Link 
                    to="/app" 
                    className={`${textColorClass} hover:text-[#0077b6] px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`${primaryBtnClasses} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`${textColorClass} hover:text-[#0077b6] px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`${primaryBtnClasses} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button className={`inline-flex items-center justify-center p-2 rounded-md ${textColorClass} hover:text-[#0077b6] focus:outline-none`}>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;