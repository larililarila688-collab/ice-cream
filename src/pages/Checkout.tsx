import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cart, CartItem as CartItemType } from '@/lib/cart';
import OrderSummary from '@/components/OrderSummary';
import PaymentForm from '@/components/PaymentForm';
import Navbar from '@/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    paymentId: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const items = cart.getItems();
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    setCartItems(items);
  }, [navigate]);

  const subtotal = cart.getTotal();
  // No delivery fee or taxes - total is just subtotal
  const deliveryFee = 0;
  const total = subtotal;

  const handlePaymentSuccess = (paymentId: string, orderId: string) => {
    setPaymentStatus('success');
    setOrderDetails({ paymentId, orderId });
    
    // Clear cart after successful payment
    setTimeout(() => {
      cart.clear();
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error');
    toast.error(error);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No items to checkout</h2>
            <Link to="/products">
              <Button>Browse ₹1 Ice Creams</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your order! Your delicious ₹1 ice creams are being prepared!
              </p>
              
              {orderDetails && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-2">Order ID: <strong>{orderDetails.orderId}</strong></p>
                  <p className="text-sm text-gray-600">Payment ID: <strong>{orderDetails.paymentId}</strong></p>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-lg font-semibold text-green-600">
                  Total Paid: ₹{total.toFixed(2)} (No extra charges!)
                </p>
                <p className="text-sm text-gray-600">
                  Estimated delivery time: 30-45 minutes
                </p>
                <p className="text-sm text-gray-600">
                  You will receive SMS updates on 9701968630
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <Link to="/products">
                  <Button className="w-full sm:w-auto">
                    Order More ₹1 Ice Creams
                  </Button>
                </Link>
                <div>
                  <Link to="/">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
              <p className="text-gray-600 mb-8">
                We couldn't process your ₹{total.toFixed(2)} payment. Please try again or use a different payment method.
              </p>
              
              <div className="space-y-4">
                <Button onClick={() => setPaymentStatus('pending')}>
                  Try Again
                </Button>
                <div>
                  <Link to="/cart">
                    <Button variant="outline">
                      Back to Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/cart">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Pay only ₹{total.toFixed(2)} - No hidden charges!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <PaymentForm
              amount={total}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              deliveryFee={0}
            />
          </div>
        </div>

        {/* Security Notice */}
        <Card className="mt-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>🔒 SSL Secured</span>
              <span>•</span>
              <span>💳 UPI Direct Payment</span>
              <span>•</span>
              <span>🛡️ No Hidden Charges</span>
              <span>•</span>
              <span>💰 Pay Only ₹{total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}