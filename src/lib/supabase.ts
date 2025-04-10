import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmrijnuixrqikxyjolwv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcmlqbnVpeHJxaWt4eWpvbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDM1NDAsImV4cCI6MjA1OTYxOTU0MH0.Pown9SZTp_7PH0rRilqgv47CfaleHrm5AkG6LvTiFoU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface DetailItem {
  type: string;
  original: string;
  translated: string;
}

interface Section {
  heading: string;
  content: string;
  reference: string;
}

interface TerminologyItem {
  term: string;
  translation: string;
  context: string;
}

interface ReceiptItem {
  name: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

interface AdditionalInfo {
  type: string;
  original: string;
  translated: string;
}

export type Translation = {
  id: string;
  user_id: string;
  image_url: string;
  created_at: string;
  translation_data: {
    summary: string;
    confidence: number;
    sourceText: string;
    sourceLanguage: string;
    targetLanguage: string;
    translatedText: string;
    
    // General specific fields
    context?: string;
    
    // Menu specific fields
    detectedElements?: Array<{
      text: string;
      type: string;
      price: {
        regular?: string;
        special?: string;
      };
      translation: string;
    }>;
    
    // Product specific fields
    product?: {
      name?: string;
      brand?: string;
      category?: string;
      summary?: string;
    };
    details?: DetailItem[];
    specifications?: Record<string, string>;
    
    // Document specific fields
    document?: {
      type: string;
      title: string;
      issuer: string;
      date: string;
      reference: string;
    };
    sections?: Section[];
    metadata?: {
      recipients: string;
      signatures: string;
      attachments: string;
      classification: string;
    };
    terminology?: TerminologyItem[];
    
    // Receipt specific fields
    receipt?: {
      merchant: string;
      address: string;
      date: string;
      time: string;
    };
    transaction?: {
      subtotal: string;
      tax: string;
      total: string;
      paymentMethod: string;
    };
    items?: ReceiptItem[];
    additionalInfo?: AdditionalInfo[];
    
    processingTimeMs: number;
  };
  translation_type: string;
  location: string;
  is_favorite: boolean;
  notes: string;
};
