import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const DonateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setIsLoading(true);
    try {
      const handler = PaystackPop.setup({
        key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Paystack public key
        email: 'donor@example.com',
        amount: 1000 * 100, // Amount in kobo (10,000 kobo = ₦100)
        currency: 'NGN',
        ref: `donate_${Math.floor(Math.random() * 1000000000 + 1)}`,
        callback: (response) => {
          console.log('Payment successful:', response);
          toast({
            title: "Thank you!",
            description: "Your donation has been received.",
          });
          setIsLoading(false);
        },
        onClose: () => {
          console.log('Payment window closed');
          setIsLoading(false);
        },
      });
      handler.openIframe();
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process donation. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="bg-secondary hover:bg-secondary/90"
    >
      <Heart className="w-5 h-5 mr-2" />
      {isLoading ? "Processing..." : "Support the Movement"}
    </Button>
  );
};