
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
        <p className="text-gaming-light mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button 
          onClick={() => navigate('/products')}
          className="bg-gaming-blue hover:bg-blue-600 text-white"
        >
          Browse Products
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1);
    } else {
      toast.error(`Sorry, only ${product.stock} items in stock`);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gaming-light mb-8">
        <span className="hover:text-gaming-blue cursor-pointer" onClick={() => navigate('/')}>Home</span>
        <ChevronRight size={16} className="mx-2" />
        <span className="hover:text-gaming-blue cursor-pointer" onClick={() => navigate('/products')}>Products</span>
        <ChevronRight size={16} className="mx-2" />
        <span className="hover:text-gaming-blue cursor-pointer" onClick={() => navigate(`/products?category=${product.category}`)}>{product.category}</span>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gaming-blue">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-gaming-gray rounded-lg overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-contain p-8"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-2xl text-gaming-blue font-bold mb-4">${product.price.toFixed(2)}</p>
          
          <div className="border-t border-gaming-gray my-6 pt-6">
            <p className="text-gaming-light mb-6">{product.description}</p>
            
            {/* Stock Status */}
            <div className="mb-6">
              <span className="text-sm font-medium mr-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-500">{product.stock} in stock</span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </div>
            
            {/* Add to Cart */}
            <div className="flex items-center mt-6">
              <div className="flex items-center mr-4 border border-gaming-gray rounded">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gaming-light hover:text-gaming-blue text-lg"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 text-white">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gaming-light hover:text-gaming-blue text-lg"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="bg-gaming-blue hover:bg-blue-600 text-white px-8 py-6"
                disabled={product.stock === 0}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
            </div>
            
            {/* Category */}
            <div className="mt-8 text-sm text-gaming-light">
              <span>Category: </span>
              <span 
                className="text-gaming-blue cursor-pointer hover:underline"
                onClick={() => navigate(`/products?category=${product.category}`)}
              >
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
