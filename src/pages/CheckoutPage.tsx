
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';
import { useCart } from '@/context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Payment method validation
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        toast.error('Please provide credit card details');
        return;
      }
    }
    
    // Process order
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-confirmation', { state: { orderId: generateOrderId() } });
  };
  
  const generateOrderId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="bg-gaming-gray rounded-lg p-6 mb-6">
              <h2 className="text-xl font-medium text-white mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName" className="text-gaming-light">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gaming-light">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="email" className="text-gaming-light">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gaming-dark border-gaming-dark text-white mt-1"
                  required
                />
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-gaming-gray rounded-lg p-6 mb-6">
              <h2 className="text-xl font-medium text-white mb-4">Shipping Information</h2>
              
              <div className="mb-4">
                <Label htmlFor="address" className="text-gaming-light">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="bg-gaming-dark border-gaming-dark text-white mt-1"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gaming-light">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-gaming-light">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-gaming-light">Zip Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-gaming-gray rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-4">Payment Method</h2>
              
              <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="text-gaming-light">Credit Card</Label>
                </div>
                
                {formData.paymentMethod === 'credit' && (
                  <div className="ml-6 mt-4 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-gaming-light">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="bg-gaming-dark border-gaming-dark text-white mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry" className="text-gaming-light">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="bg-gaming-dark border-gaming-dark text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvc" className="text-gaming-light">CVC</Label>
                        <Input
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="bg-gaming-dark border-gaming-dark text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 mt-4 mb-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="text-gaming-light">PayPal</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-gaming-gray rounded-lg p-6">
            <h2 className="text-xl font-medium text-white mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gaming-dark rounded overflow-hidden mr-3">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white">{item.name}</h3>
                      <p className="text-sm text-gaming-light">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-gaming-light">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gaming-dark mt-6 pt-6">
              <div className="flex justify-between text-gaming-light mb-2">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gaming-light mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gaming-light mb-2">
                <span>Tax</span>
                <span>${(calculateTotal() * 0.07).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-4">
                <span className="text-white">Total</span>
                <span className="text-gaming-blue">${(calculateTotal() * 1.07).toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              onClick={handleSubmit}
              className="w-full mt-6 bg-gaming-blue hover:bg-blue-600 text-white py-6"
            >
              Place Order
            </Button>
            
            <p className="text-center text-xs text-gaming-light mt-4">
              By placing an order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
