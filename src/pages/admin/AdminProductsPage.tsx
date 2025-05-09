
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types/product';
import { Edit, Trash } from 'lucide-react';

const AdminProductsPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state for adding/editing products
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: '',
    featured: false
  });
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };
  
  const handleAddProduct = () => {
    // Reset form data
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      stock: '',
      featured: false
    });
    
    setIsAddDialogOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    // Set form data from product
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      stock: product.stock.toString(),
      featured: product.featured
    });
    
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };
  
  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Parse numeric values
    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrl || 'https://placehold.co/600x400?text=Gaming+Accessory',
      stock: parseInt(formData.stock) || 0,
      featured: formData.featured
    };
    
    addProduct(newProduct);
    setIsAddDialogOpen(false);
  };
  
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Parse numeric values
    const updatedProduct = {
      ...editingProduct,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrl,
      stock: parseInt(formData.stock),
      featured: formData.featured
    };
    
    updateProduct(updatedProduct);
    setIsEditDialogOpen(false);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Products</h1>
        <Button 
          onClick={handleAddProduct}
          className="bg-gaming-blue hover:bg-blue-600 text-white"
        >
          Add New Product
        </Button>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gaming-gray border-gaming-gray text-white"
        />
      </div>
      
      {/* Products Table */}
      <div className="bg-gaming-gray rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gaming-dark">
            <TableRow>
              <TableHead className="text-white">Image</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">Stock</TableHead>
              <TableHead className="text-white">Featured</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-gaming-dark">
                  <TableCell>
                    <div className="w-12 h-12 bg-gaming-dark rounded overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-white font-medium">{product.name}</TableCell>
                  <TableCell className="text-gaming-light">{product.category}</TableCell>
                  <TableCell className="text-gaming-light">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-gaming-light">{product.stock}</TableCell>
                  <TableCell>
                    {product.featured ? 
                      <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs">Featured</span> : 
                      <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">No</span>
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditProduct(product)}
                        className="text-gaming-light hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gaming-light">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gaming-gray text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gaming-light">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-gaming-light">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-gaming-light">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="bg-gaming-dark border-gaming-dark text-white mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="stock" className="text-gaming-light">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="bg-gaming-dark border-gaming-dark text-white mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="category" className="text-gaming-light">Category *</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="imageUrl" className="text-gaming-light">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="featured" className="text-gaming-light">Featured Product</Label>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsAddDialogOpen(false)}
                className="mr-2 text-gaming-light hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gaming-blue hover:bg-blue-600 text-white"
              >
                Add Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gaming-gray text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div>
              <Label htmlFor="edit-name" className="text-gaming-light">Product Name *</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description" className="text-gaming-light">Description</Label>
              <Input
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price" className="text-gaming-light">Price *</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="bg-gaming-dark border-gaming-dark text-white mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-stock" className="text-gaming-light">Stock</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="bg-gaming-dark border-gaming-dark text-white mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-category" className="text-gaming-light">Category *</Label>
              <Input
                id="edit-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-imageUrl" className="text-gaming-light">Image URL</Label>
              <Input
                id="edit-imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="bg-gaming-dark border-gaming-dark text-white mt-1"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="edit-featured" className="text-gaming-light">Featured Product</Label>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsEditDialogOpen(false)}
                className="mr-2 text-gaming-light hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gaming-blue hover:bg-blue-600 text-white"
              >
                Update Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsPage;
