
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality to be implemented
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-gaming-dark border-b border-gaming-gray py-4 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gaming-blue">
            GameGear
          </Link>

          {/* Search Bar - Hide on mobile */}
          <div className="hidden md:block w-1/3">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gaming-gray border-gaming-gray text-gaming-light focus:ring-gaming-blue"
              />
              <Button type="submit" className="ml-2 bg-gaming-blue hover:bg-blue-600">
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gaming-light hover:text-gaming-blue transition">
              Products
            </Link>
            <Link to="/cart" className="text-gaming-light hover:text-gaming-blue transition relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gaming-blue text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {user ? (
              <Link to="/account" className="text-gaming-light hover:text-gaming-blue transition">
                <User size={20} />
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="border-gaming-blue text-gaming-blue hover:bg-gaming-blue hover:text-white">
                  Login
                </Button>
              </Link>
            )}
            {user?.isAdmin && (
              <Link to="/admin">
                <Button variant="outline" className="border-gaming-gray text-gaming-light hover:bg-gaming-gray">
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gaming-light" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="mb-4">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gaming-gray border-gaming-gray text-gaming-light"
                />
                <Button type="submit" className="ml-2 bg-gaming-blue hover:bg-blue-600">
                  <Search size={18} />
                </Button>
              </form>
            </div>
            <div className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                className="text-gaming-light hover:text-gaming-blue transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/cart" 
                className="text-gaming-light hover:text-gaming-blue transition py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} className="mr-2" /> Cart
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-gaming-blue text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              {user ? (
                <Link 
                  to="/account" 
                  className="text-gaming-light hover:text-gaming-blue transition py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} className="mr-2" /> My Account
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-gaming-blue hover:bg-blue-600 text-white w-full">
                    Login
                  </Button>
                </Link>
              )}
              {user?.isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="border-gaming-gray text-gaming-light hover:bg-gaming-gray w-full">
                    Admin Panel
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
