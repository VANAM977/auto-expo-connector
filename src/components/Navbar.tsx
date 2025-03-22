
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, MapPin, Zap, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Travel', path: '/travel', icon: MapPin },
    { name: 'Charging', path: '/charging', icon: Zap },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="app-container">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 font-display text-xl font-semibold"
          >
            <span className="text-primary">Auto</span>
            <span>Expo</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="h-9 px-4">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="h-9 px-4">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-panel mt-4 mx-4 p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary'
                }`}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="border-t border-border pt-4 mt-2 grid grid-cols-2 gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
