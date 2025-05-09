
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types/product';
import { toast } from "@/components/ui/sonner";

// Sample product data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Gaming Keyboard',
    description: 'Mechanical RGB gaming keyboard with programmable keys',
    price: 129.99,
    category: 'Keyboards',
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3',
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: 'Ultra Gaming Mouse',
    description: 'High precision gaming mouse with adjustable DPI',
    price: 79.99,
    category: 'Mice',
    imageUrl: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3',
    stock: 20,
    featured: true
  },
  {
    id: '3',
    name: 'Immersive Gaming Headset',
    description: 'Surround sound headset with noise-cancelling microphone',
    price: 149.99,
    category: 'Headsets',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3',
    stock: 10,
    featured: true
  },
  {
    id: '4',
    name: 'Gaming Mouse Pad',
    description: 'Extra large gaming mouse pad with RGB lighting',
    price: 39.99,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1661266327927-04becc32fd7f?ixlib=rb-4.0.3',
    stock: 30,
    featured: false
  },
  {
    id: '5',
    name: 'Gaming Controller',
    description: 'Ergonomic gaming controller with customizable buttons',
    price: 69.99,
    category: 'Controllers',
    imageUrl: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3',
    stock: 25,
    featured: false
  },
  {
    id: '6',
    name: 'Gaming Chair',
    description: 'Comfortable gaming chair with lumbar support',
    price: 299.99,
    category: 'Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3',
    stock: 5,
    featured: true
  }
];

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    toast.success(`Product "${newProduct.name}" has been added`);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success(`Product "${updatedProduct.name}" has been updated`);
  };

  const deleteProduct = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
    if (productToDelete) {
      toast.success(`Product "${productToDelete.name}" has been deleted`);
    }
  };

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  const getProductsByCategory = (category: string) => {
    if (category === 'All') {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProductById, 
      getProductsByCategory, 
      getFeaturedProducts 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
