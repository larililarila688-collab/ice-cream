import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { products, categories, Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'react-router-dom';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.flavors.some(flavor => flavor.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      // Price range filter (all items are ₹1 now, so this is mostly for demo purposes)
      let matchesPrice = true;
      if (priceRange === 'under-2') {
        matchesPrice = product.price < 2;
      } else if (priceRange === '1-only') {
        matchesPrice = product.price === 1;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('name');
    setPriceRange('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Ice Cream Collection</h1>
          <p className="text-gray-600">All ice creams at just ₹1 each! Amazing deals on premium flavors!</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search ice creams, flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredAndSortedProducts.length} products found
                  </span>
                  {(searchQuery || selectedCategory !== 'All' || priceRange !== 'all') && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price Range</label>
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="1-only">₹1 Only</SelectItem>
                          <SelectItem value="under-2">Under ₹2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sort By</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name (A-Z)</SelectItem>
                          <SelectItem value="price-low">Price (Low to High)</SelectItem>
                          <SelectItem value="price-high">Price (High to Low)</SelectItem>
                          <SelectItem value="rating">Rating (High to Low)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Stock Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Availability</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Products</SelectItem>
                          <SelectItem value="in-stock">In Stock Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== 'All' || priceRange !== 'all') && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Search: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-red-600">×</button>
              </Badge>
            )}
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All')} className="ml-1 hover:text-red-600">×</button>
              </Badge>
            )}
            {priceRange !== 'all' && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Price: {priceRange}</span>
                <button onClick={() => setPriceRange('all')} className="ml-1 hover:text-red-600">×</button>
              </Badge>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}