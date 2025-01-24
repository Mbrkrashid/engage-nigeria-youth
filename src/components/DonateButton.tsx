import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

declare const PaystackPop: any;

export const DonateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      console.log('Initializing Paystack payment...');
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: { secret } } = await supabase.functions.invoke('get-paystack-key');
      if (!secret) {
        throw new Error('Failed to get Paystack key');
      }

      const handler = PaystackPop.setup({
        key: secret,
        email: user?.email || 'donor@example.com',
        amount: 1000 * 100, // ₦1000 in kobo
        currency: 'NGN',
        ref: `donate_${Math.floor(Math.random() * 1000000000 + 1)}`,
        metadata: {
          user_id: user?.id
        },
        callback: async (response: any) => {
          console.log('Payment successful:', response);
          
          const { error } = await supabase.from('donations').insert([
            {
              amount: 1000,
              payment_status: 'completed',
              payment_method: 'paystack',
              donor_email: user?.email || 'donor@example.com',
              donor_name: user?.user_metadata?.full_name
            }
          ]);

          if (error) {
            console.error('Error recording donation:', error);
            toast({
              title: "Error",
              description: "Failed to record donation. Please contact support.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Thank you!",
              description: "Your donation has been received. Together we can make a difference!",
            });
          }
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
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="bg-secondary hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
    >
      <Heart className="w-5 h-5 mr-2 animate-pulse" />
      {isLoading ? "Processing..." : "Support the Movement"}
    </Button>
  );
};