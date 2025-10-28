import { ShoppingBag, Truck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/lib/cart';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee?: number;
  discount?: number;
}

export default function OrderSummary({ 
  items, 
  subtotal, 
  deliveryFee = 0, 
  discount = 0 
}: OrderSummaryProps) {
  // Always show total as subtotal only - no delivery fees or taxes
  const total = subtotal;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5" />
          <span>Order Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ₹{item.product.price}
                  </p>
                </div>
              </div>
              <span className="font-semibold">
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          {/* Always show free delivery */}
          <div className="flex justify-between text-green-600">
            <span className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span>Delivery Fee</span>
            </span>
            <span>FREE</span>
          </div>

          {/* Always show no taxes */}
          <div className="flex justify-between text-green-600">
            <span>Taxes & Fees</span>
            <span>₹0.00</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-blue-600">₹{total.toFixed(2)}</span>
        </div>

        {/* Delivery Info */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Estimated Delivery</span>
          </div>
          <p className="text-sm text-blue-700">
            30-45 minutes for all orders
          </p>
          <p className="text-sm text-blue-700">
            100% FREE delivery - No hidden charges!
          </p>
        </div>

        {/* Order Benefits */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              ✓ Fresh & Quality Guaranteed
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              ✓ FREE Delivery - No Extra Charges
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              ✓ Pay Only ₹1 Per Ice Cream
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              ✓ 100% Secure UPI Payment
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}