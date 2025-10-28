import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartItem as CartItemType, cart } from '@/lib/cart';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateQuantity = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      cart.updateQuantity(item.product.id, newQuantity);
      if (newQuantity === 0) {
        toast.success(`${item.product.name} removed from cart`);
      }
    } catch (error) {
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = () => {
    cart.removeItem(item.product.id);
    toast.success(`${item.product.name} removed from cart`);
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{item.product.name}</h3>
            <p className="text-sm text-gray-600 truncate">{item.product.description}</p>
            <p className="text-sm text-gray-500">Size: {item.product.size}</p>
            <div className="flex items-center mt-1">
              <span className="text-lg font-bold text-blue-600">₹{item.product.price}</span>
              <span className="text-sm text-gray-500 ml-1">each</span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="font-semibold min-w-[2rem] text-center">
                {item.quantity}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.quantity + 1)}
                disabled={isUpdating || item.quantity >= 10}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={removeItem}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <p className="text-lg font-bold">₹{itemTotal.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              {item.quantity} × ₹{item.product.price}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}