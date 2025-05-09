
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Trash, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, calculateTotal, clearCart } = useCart();

  const handleCheckout = () => {
    // Implement checkout logic here
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
        <p className="text-gaming-light mb-6">Looks like you haven't added any products to your cart yet.</p>
        <Button 
          onClick={() => navigate('/products')}
          className="bg-gaming-blue hover:bg-blue-600 text-white"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-gaming-gray rounded-lg p-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gaming-dark text-sm font-medium text-gaming-light">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            <div className="space-y-6 mt-6">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="md:col-span-6 flex items-center">
                    <div className="w-20 h-20 bg-gaming-dark rounded overflow-hidden mr-4">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 
                        className="font-medium text-white hover:text-gaming-blue cursor-pointer"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name}
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-400 hover:text-red-500 flex items-center mt-1"
                      >
                        <Trash size={12} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-center text-gaming-light">
                    <span className="md:hidden text-sm mr-2">Price:</span>
                    ${item.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-gaming-dark rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gaming-light hover:text-gaming-blue"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gaming-light hover:text-gaming-blue"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 text-center font-medium text-white">
                    <span className="md:hidden text-sm mr-2">Total:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gaming-dark flex justify-between">
              <Button
                onClick={clearCart}
                variant="outline"
                className="border-gaming-dark text-gaming-light hover:bg-gaming-dark"
              >
                Clear Cart
              </Button>
              <Button
                onClick={() => navigate('/products')}
                variant="outline"
                className="border-gaming-blue text-gaming-blue hover:bg-gaming-blue hover:text-white"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gaming-gray rounded-lg p-6">
            <h2 className="text-xl font-medium text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 text-gaming-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-white">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="text-white">Calculated at checkout</span>
              </div>
              <div className="border-t border-gaming-dark my-3 pt-3 flex justify-between">
                <span className="font-medium text-white">Total</span>
                <span className="font-bold text-gaming-blue">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              onClick={handleCheckout}
              className="w-full mt-6 bg-gaming-blue hover:bg-blue-600 text-white py-6"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
