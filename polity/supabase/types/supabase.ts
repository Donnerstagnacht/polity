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
          firstSignIn: boolean | null
          fts: unknown | null
          id: string
          last_name: string | null
          lastTutorial: Database["public"]["Enums"]["tutorial_enum"] | null
          profile_image: string | null
          skipTutorial: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          first_name?: string | null
          firstSignIn?: boolean | null
          fts?: unknown | null
          id: string
          last_name?: string | null
          lastTutorial?: Database["public"]["Enums"]["tutorial_enum"] | null
          profile_image?: string | null
          skipTutorial?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          first_name?: string | null
          firstSignIn?: boolean | null
          fts?: unknown | null
          id?: string
          last_name?: string | null
          lastTutorial?: Database["public"]["Enums"]["tutorial_enum"] | null
          profile_image?: string | null
          skipTutorial?: boolean | null
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
          follower_counter: number | null
          following_counter: number | null
          id: string
        }
        Insert: {
          follower_counter?: number | null
          following_counter?: number | null
          id: string
        }
        Update: {
          follower_counter?: number | null
          following_counter?: number | null
          id?: string
        }
        Relationships: []
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
          firstSignIn: boolean | null
          fts: unknown | null
          id: string
          last_name: string | null
          lastTutorial: Database["public"]["Enums"]["tutorial_enum"] | null
          profile_image: string | null
          skipTutorial: boolean | null
          updated_at: string | null
          username: string | null
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
    }
    Enums: {
      tutorial_enum: "profile" | "search"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
