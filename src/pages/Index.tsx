import { useState, useEffect } from 'react';
import { ArrowRight, Star, Truck, Shield, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 8));

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Fast Delivery",
      description: "Fresh ice cream delivered in 30-45 minutes"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Quality Guaranteed",
      description: "Premium ingredients and temperature controlled"
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Always Fresh",
      description: "Made daily with the finest ingredients"
    },
    {
      icon: <Phone className="h-8 w-8 text-orange-600" />,
      title: "24/7 Support",
      description: "Customer support available anytime"
    }
  ];

  const categories = [
    { name: "Classic Flavors", image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=200&fit=crop", count: "8+ flavors" },
    { name: "Premium Collection", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop", count: "6+ varieties" },
    { name: "Indian Specials", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop", count: "5+ kulfi types" },
    { name: "Family Packs", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=200&fit=crop", count: "Large sizes" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-lg px-4 py-2">
                  🍦 MEGA SALE: All Ice Creams Just ₹1!
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Premium Ice Cream
                  <span className="text-blue-600"> for Just ₹1!</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Unbelievable offer! Get premium ice creams with the finest ingredients. 
                  All flavors at just ₹1 each. Fast delivery with UPI payments accepted!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="text-lg px-8 py-3 bg-red-600 hover:bg-red-700">
                    Order Now - Just ₹1!
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Call: 9701968630
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span>30 Min Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Quality Assured</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=400&fit=crop"
                  alt="Vanilla Ice Cream"
                  className="rounded-2xl shadow-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=400&fit=crop"
                  alt="Chocolate Ice Cream"
                  className="rounded-2xl shadow-2xl mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border-4 border-red-500">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">🍦</div>
                  <div>
                    <p className="font-bold text-red-600 text-lg">15+ Flavors</p>
                    <p className="text-sm text-gray-600">All just ₹1 each!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Ice Cream Paradise?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Premium quality ice cream at unbeatable prices. All flavors at just ₹1 with real UPI payment integration!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">All categories available at just ₹1 per ice cream!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/products">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count} - ₹1 each</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Ice Creams - All ₹1!</h2>
              <p className="text-gray-600">Premium flavors at incredible prices</p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for ₹1 Ice Cream Madness?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Order now and get premium ice cream delivered to your doorstep in just 30-45 minutes. 
            All flavors at just ₹1 each with secure UPI payments to 9701968630@paytm.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8">
                Order Now - ₹1 Only!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8">
              Call: 9701968630
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-8 text-red-100 text-sm">
            <span>✓ UPI: 9701968630@paytm</span>
            <span>✓ Temperature Controlled Delivery</span>
            <span>✓ All Items Just ₹1!</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🍦</span>
                <span className="text-xl font-bold">Ice Cream Paradise</span>
              </div>
              <p className="text-gray-400 mb-4">
                Premium ice cream delivery service - All flavors at just ₹1 each!
              </p>
              <p className="text-gray-400">Contact: 9701968630</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400">
                <Link to="/" className="block hover:text-white">Home</Link>
                <Link to="/products" className="block hover:text-white">Products</Link>
                <Link to="/cart" className="block hover:text-white">Cart</Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2 text-gray-400">
                <p>Classic Flavors - ₹1</p>
                <p>Premium Collection - ₹1</p>
                <p>Indian Specials - ₹1</p>
                <p>Family Packs - ₹1</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Payment & Delivery</h3>
              <div className="space-y-2 text-gray-400">
                <p>UPI: 9701968630@paytm</p>
                <p>Delivery: 30-45 mins</p>
                <p>Free delivery above ₹50</p>
                <p>All items just ₹1!</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ice Cream Paradise. All rights reserved. | Powered by MGX | All Ice Creams ₹1 Each!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}