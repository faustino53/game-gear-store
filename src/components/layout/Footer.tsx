
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gaming-dark border-t border-gaming-gray py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gaming-blue mb-4">GameGear</h3>
            <p className="text-gaming-light text-sm">
              Premium gaming accessories for the ultimate gaming experience.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products/keyboards" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  Keyboards
                </Link>
              </li>
              <li>
                <Link to="/products/mice" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  Mice
                </Link>
              </li>
              <li>
                <Link to="/products/headsets" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  Headsets
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gaming-light hover:text-gaming-blue transition text-sm">
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-gaming-light text-sm mb-4">
              Subscribe to receive updates on new products and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gaming-gray border border-gaming-gray text-white px-4 py-2 text-sm rounded-l focus:outline-none focus:ring-2 focus:ring-gaming-blue"
              />
              <button className="bg-gaming-blue hover:bg-blue-600 text-white px-4 py-2 rounded-r text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gaming-gray mt-8 pt-6 text-center text-gaming-light text-sm">
          <p>&copy; {new Date().getFullYear()} GameGear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
