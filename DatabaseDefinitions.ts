export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_data: {
        Row: {
          id: string;
          email: string;
          stripe_customer_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          stripe_customer_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          stripe_customer_id?: string | null;
          created_at?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          username: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          username?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          username?: string | null;
          updated_at?: string;
        };
      };
    };
    Functions: {};
  };
}

