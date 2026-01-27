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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      beers: {
        Row: {
          alcohol: number
          description: string | null
          id: number
          image: string | null
          name: string
          price: number
          type: string | null
          volume: number
        }
        Insert: {
          alcohol?: number
          description?: string | null
          id?: number
          image?: string | null
          name: string
          price?: number
          type?: string | null
          volume?: number
        }
        Update: {
          alcohol?: number
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          price?: number
          type?: string | null
          volume?: number
        }
        Relationships: []
      }
      beers_flavors: {
        Row: {
          id: number
          smell: string | null
          taste: string | null
          visual: string | null
        }
        Insert: {
          id?: number
          smell?: string | null
          taste?: string | null
          visual?: string | null
        }
        Update: {
          id?: number
          smell?: string | null
          taste?: string | null
          visual?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beers_flavors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
        ]
      }
      beers_taste: {
        Row: {
          acidity: number | null
          bitterness: number | null
          fruity: number | null
          id: number
          liveliness: number | null
          power: number | null
          roundness: number | null
        }
        Insert: {
          acidity?: number | null
          bitterness?: number | null
          fruity?: number | null
          id?: number
          liveliness?: number | null
          power?: number | null
          roundness?: number | null
        }
        Update: {
          acidity?: number | null
          bitterness?: number | null
          fruity?: number | null
          id?: number
          liveliness?: number | null
          power?: number | null
          roundness?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "beers_taste_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
        ]
      }
      coffee: {
        Row: {
          id: number
          image: string
          name: string
          price: number
          price_large: number | null
        }
        Insert: {
          id?: number
          image: string
          name: string
          price: number
          price_large?: number | null
        }
        Update: {
          id?: number
          image?: string
          name?: string
          price?: number
          price_large?: number | null
        }
        Relationships: []
      }
      foods: {
        Row: {
          id: number
          image: string | null
          ingredients: string | null
          name: string
          price: number
        }
        Insert: {
          id?: number
          image?: string | null
          ingredients?: string | null
          name: string
          price: number
        }
        Update: {
          id?: number
          image?: string | null
          ingredients?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      locations: {
        Row: {
          id: number
          name: string
          orders: number
          prefix: string
        }
        Insert: {
          id?: number
          name: string
          orders?: number
          prefix: string
        }
        Update: {
          id?: number
          name?: string
          orders?: number
          prefix?: string
        }
        Relationships: []
      }
      managers: {
        Row: {
          id: number
          manager: string
          suppleant: string | null
        }
        Insert: {
          id?: number
          manager: string
          suppleant?: string | null
        }
        Update: {
          id?: number
          manager?: string
          suppleant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "managers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "managers_manager_fkey"
            columns: ["manager"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "managers_suppleant_fkey"
            columns: ["suppleant"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          description: string | null
          id: number
          image: string | null
          name: string
          price: number
        }
        Insert: {
          description?: string | null
          id?: number
          image?: string | null
          name: string
          price?: number
        }
        Update: {
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: number
          location: number
          name: string
          order: Json
          status: string
        }
        Insert: {
          created_at?: string
          id?: number
          location: number
          name: string
          order: Json
          status: string
        }
        Update: {
          created_at?: string
          id?: number
          location?: number
          name?: string
          order?: Json
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_location_fkey"
            columns: ["location"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      softs: {
        Row: {
          id: number
          image: string | null
          name: string
          price: number
          volume: number
        }
        Insert: {
          id?: number
          image?: string | null
          name: string
          price: number
          volume: number
        }
        Update: {
          id?: number
          image?: string | null
          name?: string
          price?: number
          volume?: number
        }
        Relationships: []
      }
      stock_beers: {
        Row: {
          entity_per_crate: number
          id: number
          stock: number
        }
        Insert: {
          entity_per_crate?: number
          id?: number
          stock?: number
        }
        Update: {
          entity_per_crate?: number
          id?: number
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_beers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_foods: {
        Row: {
          entity_per_crate: number
          id: number
          stock: number
        }
        Insert: {
          entity_per_crate: number
          id?: number
          stock?: number
        }
        Update: {
          entity_per_crate?: number
          id?: number
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_foods_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_materials: {
        Row: {
          entity_per_crate: number
          id: number
          stock: number
        }
        Insert: {
          entity_per_crate: number
          id?: number
          stock?: number
        }
        Update: {
          entity_per_crate?: number
          id?: number
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_materials_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_softs: {
        Row: {
          entity_per_crate: number
          id: number
          stock: number
        }
        Insert: {
          entity_per_crate: number
          id?: number
          stock: number
        }
        Update: {
          entity_per_crate?: number
          id?: number
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_softs_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "softs"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          image: string
          last_name: string
          pseudo: string
          role: Database["public"]["Enums"]["ROLE"]
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          image: string
          last_name: string
          pseudo: string
          role?: Database["public"]["Enums"]["ROLE"]
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          image?: string
          last_name?: string
          pseudo?: string
          role?: Database["public"]["Enums"]["ROLE"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_tables: {
        Args: never
        Returns: {
          table_name: string
        }[]
      }
      pg_execute: { Args: { sql: string }; Returns: Record<string, unknown>[] }
    }
    Enums: {
      ROLE:
        | "ADMIN"
        | "TREZ"
        | "MANAGER_BAR"
        | "MANAGER_STOCK"
        | "MANAGER_DRAIN"
        | "WATER_SELLER"
        | "BENEVOLE"
      USER_ROLE: "ADMIN" | "MANAGER" | "SUPPLEANT" | "BENEVOLE" | "TEST"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ROLE: [
        "ADMIN",
        "TREZ",
        "MANAGER_BAR",
        "MANAGER_STOCK",
        "MANAGER_DRAIN",
        "WATER_SELLER",
        "BENEVOLE",
      ],
      USER_ROLE: ["ADMIN", "MANAGER", "SUPPLEANT", "BENEVOLE", "TEST"],
    },
  },
} as const
