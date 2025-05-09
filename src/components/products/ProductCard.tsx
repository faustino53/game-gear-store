
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card className="product-card border border-gaming-gray bg-gaming-dark overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-medium text-white truncate">{product.name}</h3>
          <p className="text-gaming-blue font-bold mt-1">${product.price.toFixed(2)}</p>
          <p className="text-gaming-light text-sm mt-2 line-clamp-2">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="pt-2 pb-4">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gaming-blue hover:bg-blue-600 text-white font-medium"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
