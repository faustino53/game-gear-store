
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProducts } from '@/context/ProductContext';

const AdminDashboardPage = () => {
  const { products } = useProducts();
  
  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((total, product) => total + product.stock, 0);
  const lowStockProducts = products.filter(product => product.stock < 5).length;
  
  // Calculate product distribution by category
  const categoryCounts: Record<string, number> = {};
  products.forEach(product => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gaming-gray border-gaming-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gaming-light">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{totalProducts}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gaming-gray border-gaming-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gaming-light">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{totalStock} units</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gaming-gray border-gaming-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gaming-light">Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{lowStockProducts}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Products by Category */}
      <Card className="bg-gaming-gray border-gaming-dark mb-8">
        <CardHeader>
          <CardTitle className="text-white">Products by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} className="flex items-center">
                <div className="w-32 text-gaming-light">{category}</div>
                <div className="flex-1 bg-gaming-dark rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gaming-blue h-full"
                    style={{ width: `${(count / totalProducts) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-white">{count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Activity */}
      <Card className="bg-gaming-gray border-gaming-dark">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gaming-dark pb-2">
              <div>
                <p className="text-white">New product added</p>
                <p className="text-sm text-gaming-light">Gaming Chair</p>
              </div>
              <div className="text-sm text-gaming-light">
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-gaming-dark pb-2">
              <div>
                <p className="text-white">Product stock updated</p>
                <p className="text-sm text-gaming-light">Pro Gaming Keyboard</p>
              </div>
              <div className="text-sm text-gaming-light">
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-gaming-dark pb-2">
              <div>
                <p className="text-white">New user registered</p>
                <p className="text-sm text-gaming-light">user@example.com</p>
              </div>
              <div className="text-sm text-gaming-light">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
