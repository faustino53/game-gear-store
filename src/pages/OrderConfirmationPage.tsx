
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || { orderId: null };
  
  if (!orderId) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-gaming-blue flex items-center justify-center">
          <CheckCheck size={40} className="text-white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-4">Thank You for Your Order!</h1>
      <p className="text-gaming-light mb-8">
        Your order has been placed and is being processed. You will receive an email confirmation shortly.
      </p>
      
      <div className="bg-gaming-gray rounded-lg p-6 mb-8">
        <h2 className="text-xl font-medium text-white mb-4">Order Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gaming-light">Order Number:</p>
            <p className="text-gaming-blue font-bold">{orderId}</p>
          </div>
          <div>
            <p className="text-gaming-light">Order Date:</p>
            <p className="text-white">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gaming-light">Payment Method:</p>
            <p className="text-white">Credit Card</p>
          </div>
          <div>
            <p className="text-gaming-light">Shipping Method:</p>
            <p className="text-white">Standard Shipping (3-5 business days)</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="border-gaming-blue text-gaming-blue hover:bg-gaming-blue hover:text-white"
        >
          Return to Home
        </Button>
        <Button
          onClick={() => navigate('/products')}
          className="bg-gaming-blue hover:bg-blue-600 text-white"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
