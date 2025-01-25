/// <reference types="vite/client" />

interface PaystackPop {
  newTransaction(options: {
    key: string;
    email: string;
    amount: number;
    currency: string;
    ref: string;
    metadata?: {
      user_id?: string;
      custom_fields?: Array<{
        display_name: string;
        variable_name: string;
        value: string;
      }>;
    };
    callback: (response: any) => void;
    onClose: () => void;
  }): void;
}

interface Window {
  PaystackPop: {
    new(): PaystackPop;
  };
}