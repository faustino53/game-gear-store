
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/ProductContext';
import ProductGrid from '@/components/products/ProductGrid';

const HomePage = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden rounded-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="relative h-full flex items-center px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Level Up Your Gaming Experience</h1>
            <p className="text-lg text-gaming-light mb-6">
              Professional gaming accessories for the ultimate competitive edge
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button className="bg-gaming-blue hover:bg-blue-600 text-white px-8 py-6">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gaming-dark px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Shop By Category</h2>
          <Link to="/products" className="text-gaming-blue hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Keyboards', 'Mice', 'Headsets', 'Controllers'].map((category) => (
            <Link to={`/products?category=${category}`} key={category} className="group">
              <div className="bg-gaming-gray rounded-lg p-8 text-center transition-all duration-300 group-hover:bg-gaming-blue group-hover:animate-pulse-glow">
                <h3 className="text-lg font-medium text-white">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link to="/products" className="text-gaming-blue hover:underline">
            View All
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-gaming-blue to-blue-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Special Offer</h2>
        <p className="text-white text-lg mb-6">
          Get 15% off your first order with code: <span className="font-bold">GAMEON15</span>
        </p>
        <Link to="/products">
          <Button className="bg-white text-gaming-blue hover:bg-gray-100">
            Shop Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
