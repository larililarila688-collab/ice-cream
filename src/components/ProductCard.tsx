import { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/products';
import { cart } from '@/lib/cart';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      cart.addItem(product, quantity);
      toast.success(`${product.name} added to cart!`, {
        description: `Quantity: ${quantity} | Total: ₹${(product.price * quantity).toFixed(2)}`
      });
      setQuantity(1);
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-white/90 text-gray-800"
          >
            {product.category}
          </Badge>
          {!product.inStock && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 right-2"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-600">Size: {product.size}</p>
            <div className="flex flex-wrap gap-1">
              {product.flavors.map((flavor, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {flavor}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-3">
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500">per {product.size.toLowerCase()}</span>
          </div>

          {product.inStock ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full"
                size="sm"
              >
                {isAdding ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <Button disabled className="w-full" size="sm">
              Out of Stock
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}