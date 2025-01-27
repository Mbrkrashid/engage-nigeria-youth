import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const DonateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      console.log('Initializing Paystack payment...');
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get Paystack key from Supabase Edge Function
      const { data: { publicKey }, error: keyError } = await supabase.functions.invoke('get-paystack-key');
      
      if (keyError || !publicKey) {
        console.error('Error getting Paystack key:', keyError);
        throw new Error('Failed to get Paystack key');
      }

      const handler = new window.PaystackPop();
      handler.newTransaction({
        key: publicKey,
        email: user?.email || 'donor@example.com',
        amount: 1000 * 100, // ₦1000 in kobo
        currency: 'NGN',
        ref: `donate_${Math.floor(Math.random() * 1000000000 + 1)}`,
        metadata: {
          user_id: user?.id,
          custom_fields: [{
            display_name: "Donation Type",
            variable_name: "donation_type",
            value: "one_time"
          }]
        },
        callback: async (response) => {
          console.log('Payment successful:', response);
          
          // Record the donation in the database
          const { error: dbError } = await supabase.from('donations').insert([{
            amount: 1000,
            payment_status: 'completed',
            payment_method: 'paystack',
            donor_email: user?.email || 'donor@example.com',
            donor_name: user?.user_metadata?.full_name
          }]);

          if (dbError) {
            console.error('Error recording donation:', dbError);
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
          toast({
            title: "Payment Cancelled",
            description: "You have closed the payment window.",
          });
        },
      });
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