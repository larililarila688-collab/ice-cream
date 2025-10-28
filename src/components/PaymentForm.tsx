import { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { PaymentManager, PaymentDetails } from '@/lib/payment';
import { toast } from 'sonner';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentId: string, orderId: string) => void;
  onPaymentError: (error: string) => void;
}

export default function PaymentForm({ amount, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handlePayment = async () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      toast.error('Please fill in all customer details');
      return;
    }

    setIsProcessing(true);

    try {
      const paymentDetails: PaymentDetails = {
        amount,
        currency: 'INR',
        orderId: PaymentManager.generateOrderId(),
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone
      };

      let result;
      
      if (paymentMethod === 'upi') {
        // Direct UPI payment
        result = await PaymentManager.processUPIPayment('9701968630@paytm', amount);
      } else {
        // Other payment methods through Razorpay
        result = await PaymentManager.initializePayment(paymentDetails);
      }

      if (result.success && result.paymentId && result.orderId) {
        onPaymentSuccess(result.paymentId, result.orderId);
        toast.success('Payment successful!');
      } else {
        onPaymentError(result.error || 'Payment failed');
        toast.error(result.error || 'Payment failed');
      }
    } catch (error) {
      const errorMessage = 'Payment processing failed';
      onPaymentError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>

        <Separator />

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="font-semibold">Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer flex-1">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">UPI Payment</p>
                  <p className="text-sm text-gray-600">Pay directly via UPI (PhonePe, GPay, Paytm)</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Label htmlFor="netbanking" className="flex items-center space-x-2 cursor-pointer flex-1">
                <Building className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Net Banking</p>
                  <p className="text-sm text-gray-600">All major banks supported</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center space-x-2 cursor-pointer flex-1">
                <Wallet className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Digital Wallets</p>
                  <p className="text-sm text-gray-600">Paytm, PhonePe, Amazon Pay</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* UPI Details */}
        {paymentMethod === 'upi' && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">UPI Payment Details</span>
            </div>
            <p className="text-sm text-blue-700 mb-2">
              Payment will be processed to: <strong>9701968630@paytm</strong>
            </p>
            <p className="text-xs text-blue-600">
              You will be redirected to your UPI app to complete the payment
            </p>
          </div>
        )}

        {/* Payment Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600">₹{amount.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600">
            Secure payment powered by Razorpay
          </p>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-12 text-lg"
          size="lg"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Pay ₹${amount.toFixed(2)}`
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardContent>
    </Card>
  );
}