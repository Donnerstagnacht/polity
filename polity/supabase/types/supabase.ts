export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assistants: {
        Row: {
          first_sign_in: boolean
          id: string
          last_tutorial: Database["public"]["Enums"]["tutorial_enum"]
          skip_tutorial: boolean
        }
        Insert: {
          first_sign_in?: boolean
          id: string
          last_tutorial?: Database["public"]["Enums"]["tutorial_enum"]
          skip_tutorial?: boolean
        }
        Update: {
          first_sign_in?: boolean
          id?: string
          last_tutorial?: Database["public"]["Enums"]["tutorial_enum"]
          skip_tutorial?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "assistants_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      following_profiles: {
        Row: {
          follower: string
          following: string
        }
        Insert: {
          follower: string
          following: string
        }
        Update: {
          follower?: string
          following?: string
        }
        Relationships: [
          {
            foreignKeyName: "following_profiles_follower_fkey"
            columns: ["follower"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "following_profiles_following_fkey"
            columns: ["following"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          fts: unknown | null
          id: string
          last_name: string | null
          profile_image: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          first_name?: string | null
          fts?: unknown | null
          id: string
          last_name?: string | null
          profile_image?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          first_name?: string | null
          fts?: unknown | null
          id?: string
          last_name?: string | null
          profile_image?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_counters: {
        Row: {
          follower_counter: number
          following_counter: number
          id: string
        }
        Insert: {
          follower_counter?: number
          following_counter?: number
          id: string
        }
        Update: {
          follower_counter?: number
          following_counter?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_counters_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_if_following: {
        Args: {
          follower_id: string
          following_id: string
        }
        Returns: boolean
      }
      follow_transaction: {
        Args: {
          follower_id: string
          following_id: string
        }
        Returns: undefined
      }
      search_user: {
        Args: {
          search_term: string
        }
        Returns: {
          first_name: string | null
          fts: unknown | null
          id: string
          last_name: string | null
          profile_image: string | null
          updated_at: string | null
          username: string | null
        }[]
      }
      select_assistant: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          first_sign_in: boolean
          skip_tutorial: boolean
          last_tutorial: Database["public"]["Enums"]["tutorial_enum"]
        }[]
      }
      select_follower_of_user: {
        Args: {
          following_id: string
        }
        Returns: {
          id: string
          first_name: string
          last_name: string
        }[]
      }
      select_following_counter: {
        Args: {
          user_id: string
        }
        Returns: {
          profile_id: string
          follower_counter: number
          following_counter: number
        }[]
      }
      select_following_of_user: {
        Args: {
          follower_id: string
        }
        Returns: {
          id: string
          first_name: string
          last_name: string
        }[]
      }
      unfollow_transaction: {
        Args: {
          follower_id: string
          following_id: string
        }
        Returns: undefined
      }
      update_first_sign_in: {
        Args: {
          user_id: string
          new_status: boolean
        }
        Returns: undefined
      }
      update_last_tutorial: {
        Args: {
          user_id: string
          new_status: Database["public"]["Enums"]["tutorial_enum"]
        }
        Returns: undefined
      }
      update_skip_tutorial: {
        Args: {
          user_id: string
          new_status: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      tutorial_enum: "welcome" | "profile" | "search"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
