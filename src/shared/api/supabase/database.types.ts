export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      coffee: {
        Row: {
          accent: Database["public"]["Enums"]["coffee_accent"]
          created_at: string
          description: string
          details: string
          id: string
          is_available: boolean
          number: string
          price: number
          slug: string
          sort_order: number
          tag: string
          title: string
          updated_at: string
        }
        Insert: {
          accent: Database["public"]["Enums"]["coffee_accent"]
          created_at?: string
          description: string
          details: string
          id: string
          is_available?: boolean
          number: string
          price: number
          slug: string
          sort_order?: number
          tag: string
          title: string
          updated_at?: string
        }
        Update: {
          accent?: Database["public"]["Enums"]["coffee_accent"]
          created_at?: string
          description?: string
          details?: string
          id?: string
          is_available?: boolean
          number?: string
          price?: number
          slug?: string
          sort_order?: number
          tag?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          coffee_id: string
          coffee_title: string
          created_at: string
          id: string
          order_id: string
          quantity: number
          subtotal: number | null
          unit_price: number
        }
        Insert: {
          coffee_id: string
          coffee_title: string
          created_at?: string
          id?: string
          order_id: string
          quantity: number
          subtotal?: number | null
          unit_price: number
        }
        Update: {
          coffee_id?: string
          coffee_title?: string
          created_at?: string
          id?: string
          order_id?: string
          quantity?: number
          subtotal?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_coffee_id_fkey"
            columns: ["coffee_id"]
            isOneToOne: false
            referencedRelation: "coffee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string | null
          customer_phone: string | null
          id: string
          order_number: number
          pickup_slot_id: string
          status: Database["public"]["Enums"]["order_status"]
          total_price: number
          total_quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          order_number?: never
          pickup_slot_id: string
          status?: Database["public"]["Enums"]["order_status"]
          total_price?: number
          total_quantity?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          order_number?: never
          pickup_slot_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_price?: number
          total_quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_pickup_slot_id_fkey"
            columns: ["pickup_slot_id"]
            isOneToOne: false
            referencedRelation: "pickup_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      pickup_slots: {
        Row: {
          created_at: string
          id: string
          is_available: boolean
          max_orders: number
          slot_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_available?: boolean
          max_orders?: number
          slot_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_available?: boolean
          max_orders?: number
          slot_time?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_order: {
        Args: {
          p_customer_name?: string
          p_customer_phone?: string
          p_items: Json
          p_pickup_slot_id: string
        }
        Returns: {
          order_id: string
          order_number: number
          total_price: number
          total_quantity: number
        }[]
      }
    }
    Enums: {
      coffee_accent: "espresso" | "milk" | "soft"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      coffee_accent: ["espresso", "milk", "soft"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
