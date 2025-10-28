export interface PaymentDetails {
  amount: number;
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  error?: string;
}

// Razorpay configuration
const RAZORPAY_KEY = 'rzp_test_1234567890'; // This would be your actual Razorpay key

export class PaymentManager {
  static async initializePayment(details: PaymentDetails): Promise<PaymentResult> {
    try {
      // In a real application, you would make an API call to your backend
      // to create an order and get the order details from Razorpay
      
      const options = {
        key: RAZORPAY_KEY,
        amount: details.amount * 100, // Amount in paise
        currency: details.currency,
        name: 'Ice Cream Paradise',
        description: 'Ice Cream Order Payment',
        order_id: details.orderId,
        prefill: {
          name: details.customerName,
          email: details.customerEmail,
          contact: details.customerPhone,
        },
        theme: {
          color: '#3B82F6'
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        }
      };

      // For demo purposes, we'll simulate a successful payment
      // In production, you would use the actual Razorpay SDK
      return new Promise((resolve) => {
        setTimeout(() => {
          const success = Math.random() > 0.1; // 90% success rate for demo
          
          if (success) {
            resolve({
              success: true,
              paymentId: `pay_${Date.now()}`,
              orderId: details.orderId
            });
          } else {
            resolve({
              success: false,
              error: 'Payment failed. Please try again.'
            });
          }
        }, 2000);
      });
      
    } catch (error) {
      return {
        success: false,
        error: 'Payment initialization failed'
      };
    }
  }

  static generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static async processUPIPayment(upiId: string, amount: number): Promise<PaymentResult> {
    // Simulate UPI payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.05; // 95% success rate for UPI
        
        if (success) {
          resolve({
            success: true,
            paymentId: `upi_${Date.now()}`,
            orderId: this.generateOrderId()
          });
        } else {
          resolve({
            success: false,
            error: 'UPI payment failed. Please check your UPI ID and try again.'
          });
        }
      }, 3000);
    });
  }
}

// UPI Integration for the provided phone number
export const UPI_CONFIG = {
  merchantUPI: '9701968630@paytm', // Your UPI ID
  merchantName: 'Ice Cream Paradise',
  supportedApps: ['PhonePe', 'Paytm', 'GPay', 'BHIM']
};