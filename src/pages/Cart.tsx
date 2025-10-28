import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cart, CartItem as CartItemType } from '@/lib/cart';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import Navbar from '@/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartItems = () => {
      setCartItems(cart.getItems());
    };

    updateCartItems();
    const unsubscribe = cart.subscribe(updateCartItems);

    return unsubscribe;
  }, []);

  const subtotal = cart.getTotal();
  // No delivery fee - everything is free delivery
  const deliveryFee = 0;
  const total = subtotal; // Total is just subtotal, no extra charges

  const handleClearCart = () => {
    cart.clear();
    toast.success('Cart cleared successfully');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious ice creams to your cart yet. 
              Browse our collection - all ice creams just ₹1 each!
            </p>
            <div className="space-y-4">
              <Link to="/products">
                <Button size="lg" className="px-8">
                  Browse Ice Creams - ₹1 Each!
                </Button>
              </Link>
              <div>
                <Link to="/">
                  <Button variant="outline" size="lg" className="px-8">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart - No extra charges!
              </p>
            </div>
          </div>
          
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card>
              <CardHeader>
                <CardTitle>You might also like - All ₹1!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* This would show recommended products */}
                  <div className="text-center py-8 col-span-full">
                    <p className="text-gray-500">Check out more ₹1 ice creams</p>
                    <Link to="/products">
                      <Button variant="outline" className="mt-2">
                        Browse More ₹1 Ice Creams
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              deliveryFee={0}
            />

            {/* Checkout Button */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      Total: ₹{total.toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      No delivery fees • No taxes • No hidden charges!
                    </p>
                  </div>

                  <Separator />

                  <Button
                    onClick={handleCheckout}
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    Proceed to Checkout - Pay ₹{total.toFixed(2)}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Secure checkout powered by UPI • Pay to 9701968630@paytm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Delivery Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>🚚 100% FREE delivery on all orders</p>
                  <p>⏱️ Estimated delivery: 30-45 minutes</p>
                  <p>🌡️ Temperature controlled delivery</p>
                  <p>💰 Pay only ₹1 per ice cream - No extra charges!</p>
                  <p>📞 Call support: 9701968630</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}