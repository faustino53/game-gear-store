
import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // If not admin, redirect to home
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gaming-gray rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
            
            <nav className="space-y-2">
              <Link to="/admin" className="block">
                <Button
                  variant={isActive('/admin') ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive('/admin') 
                      ? 'bg-gaming-blue text-white' 
                      : 'text-gaming-light hover:text-white hover:bg-gaming-dark'
                  }`}
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/admin/products" className="block">
                <Button
                  variant={isActive('/admin/products') ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive('/admin/products') 
                      ? 'bg-gaming-blue text-white' 
                      : 'text-gaming-light hover:text-white hover:bg-gaming-dark'
                  }`}
                >
                  Products
                </Button>
              </Link>
              <Link to="/admin/orders" className="block">
                <Button
                  variant={isActive('/admin/orders') ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive('/admin/orders') 
                      ? 'bg-gaming-blue text-white' 
                      : 'text-gaming-light hover:text-white hover:bg-gaming-dark'
                  }`}
                >
                  Orders
                </Button>
              </Link>
              <Link to="/admin/users" className="block">
                <Button
                  variant={isActive('/admin/users') ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive('/admin/users') 
                      ? 'bg-gaming-blue text-white' 
                      : 'text-gaming-light hover:text-white hover:bg-gaming-dark'
                  }`}
                >
                  Users
                </Button>
              </Link>
            </nav>
            
            <div className="border-t border-gaming-dark mt-6 pt-6">
              <Link to="/" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gaming-light hover:text-white hover:bg-gaming-dark"
                >
                  Back to Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
