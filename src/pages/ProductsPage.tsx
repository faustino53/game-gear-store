
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import ProductGrid from '@/components/products/ProductGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider";

const ProductsPage = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    const search = searchParams.get('search') || '';
    
    setSelectedCategory(category);
    setSearchTerm(search);
    
    filterProducts(search, category, priceRange);
  }, [searchParams, products]);

  const filterProducts = (search: string, category: string, price: number[]) => {
    let filtered = products;
    
    // Filter by search term
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) || 
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by category
    if (category && category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= price[0] && product.price <= price[1]
    );
    
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    searchParams.set('category', category);
    setSearchParams(searchParams);
    filterProducts(searchTerm, category, priceRange);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
    filterProducts(value, selectedCategory, priceRange);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    filterProducts(searchTerm, selectedCategory, value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Gaming Accessories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters - Sidebar */}
        <div className="bg-gaming-gray rounded-lg p-6">
          <h2 className="text-xl font-medium text-white mb-4">Filters</h2>
          
          {/* Search */}
          <div className="mb-6">
            <Label htmlFor="search" className="text-white mb-2">Search</Label>
            <Input
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gaming-dark border-gaming-gray text-white"
            />
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <Label className="text-white mb-2">Price Range</Label>
            <div className="mt-2">
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="my-6"
              />
              <div className="flex justify-between">
                <span className="text-gaming-light">${priceRange[0]}</span>
                <span className="text-gaming-light">${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="md:col-span-3">
          {/* Category Tabs */}
          <Tabs defaultValue={selectedCategory} className="mb-8">
            <TabsList className="bg-gaming-gray w-full overflow-x-auto">
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => handleCategoryChange(category)}
                  className="data-[state=active]:bg-gaming-blue data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="pt-6">
                {filteredProducts.length > 0 ? (
                  <ProductGrid products={filteredProducts} />
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gaming-light text-lg">No products found matching your criteria</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
