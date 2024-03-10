export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
export type batch = {
  Row: {
    created_at: string
    end_year: string
    id: number
    start_year: string
  }
  Insert: {
    created_at?: string
    end_year: string
    id?: number
    start_year: string
  }
  Update: {
    created_at?: string
    end_year?: string
    id?: number
    start_year?: string
  }
  Relationships: []
}
export type department = {
  Row: {
    code: string | null
    created_at: string
    id: number
    mission_url: string | null
    name: string | null
    updated_at: string | null
    vision_url: string | null
  }
  Insert: {
    code?: string | null
    created_at?: string
    id?: number
    mission_url?: string | null
    name?: string | null
    updated_at?: string | null
    vision_url?: string | null
  }
  Update: {
    code?: string | null
    created_at?: string
    id?: number
    mission_url?: string | null
    name?: string | null
    updated_at?: string | null
    vision_url?: string | null
  }
  Relationships: []
}
export type Database = {
  public: {
    Tables: {
      advisors: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_advisors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      batch: batch
      departments: department
      hod: {
        Row: {
          created_at: string
          dept_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          dept_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          dept_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_hod_dept_id_fkey"
            columns: ["dept_id"]
            isOneToOne: true
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_hod_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      staff: {
        Row: {
          created_at: string
          dept_id: number | null
          is_advisor: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string
          dept_id?: number | null
          is_advisor?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string
          dept_id?: number | null
          is_advisor?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_staff_dept_id_fkey"
            columns: ["dept_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          adm_no: string | null
          batch_id: number | null
          chemistry: number | null
          created_at: string
          dept_id: number | null
          gender: string | null
          id: number
          keam: number | null
          maths: number | null
          physics: number | null
          pre_degree: number | null
          proof_url: string | null
          rank: number | null
          reg_no: string | null
          remarks: string | null
          updated_at: string | null
        }
        Insert: {
          adm_no?: string | null
          batch_id?: number | null
          chemistry?: number | null
          created_at?: string
          dept_id?: number | null
          gender?: string | null
          id?: number
          keam?: number | null
          maths?: number | null
          physics?: number | null
          pre_degree?: number | null
          proof_url?: string | null
          rank?: number | null
          reg_no?: string | null
          remarks?: string | null
          updated_at?: string | null
        }
        Update: {
          adm_no?: string | null
          batch_id?: number | null
          chemistry?: number | null
          created_at?: string
          dept_id?: number | null
          gender?: string | null
          id?: number
          keam?: number | null
          maths?: number | null
          physics?: number | null
          pre_degree?: number | null
          proof_url?: string | null
          rank?: number | null
          reg_no?: string | null
          remarks?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_students_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_students_dept_id_fkey"
            columns: ["dept_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          }
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
          name: string | null
          phone: string | null
          role_id: number | null
          role_name: string | null
          update_at: string | null
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          role_id?: number | null
          role_name?: string | null
          update_at?: string | null
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          role_id?: number | null
          role_name?: string | null
          update_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_role_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_role_name_fkey"
            columns: ["role_name"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
          user_id: string
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
    }
    Enums: {
      app_permission: "channels.delete" | "messages.delete"
      app_role: "admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
    Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
    Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database["public"]["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
