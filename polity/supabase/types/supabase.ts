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
      notifications_by_user: {
        Row: {
          created_at: string
          id: string
          read_by_receiver: boolean
          receiver: string
          sender: string
          type_of_notification: Database["public"]["Enums"]["notifications_enum"]
        }
        Insert: {
          created_at?: string
          id?: string
          read_by_receiver?: boolean
          receiver: string
          sender: string
          type_of_notification?: Database["public"]["Enums"]["notifications_enum"]
        }
        Update: {
          created_at?: string
          id?: string
          read_by_receiver?: boolean
          receiver?: string
          sender?: string
          type_of_notification?: Database["public"]["Enums"]["notifications_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_by_user_receiver_fkey"
            columns: ["receiver"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_by_user_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "users"
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
          receive_follow_notifications: boolean
          updated_at: string | null
          username: string | null
        }
        Insert: {
          first_name?: string | null
          fts?: unknown | null
          id: string
          last_name?: string | null
          profile_image?: string | null
          receive_follow_notifications?: boolean
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          first_name?: string | null
          fts?: unknown | null
          id?: string
          last_name?: string | null
          profile_image?: string | null
          receive_follow_notifications?: boolean
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
          unread_notifications_counter: number
        }
        Insert: {
          follower_counter?: number
          following_counter?: number
          id: string
          unread_notifications_counter?: number
        }
        Update: {
          follower_counter?: number
          following_counter?: number
          id?: string
          unread_notifications_counter?: number
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
      create_notification_from_user_transaction:
        | {
            Args: {
              sender: string
              receiver: string
              type_of_notification: Database["public"]["Enums"]["notifications_enum"]
              read_by_receiver: boolean
            }
            Returns: undefined
          }
        | {
            Args: {
              sender: string
              receiver: string
              type_of_notification: string
              read_by_receiver: boolean
            }
            Returns: undefined
          }
      follow_transaction: {
        Args: {
          follower_id: string
          following_id: string
        }
        Returns: undefined
      }
      reset_notification_counter: {
        Args: {
          user_id: string
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
          receive_follow_notifications: boolean
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
          unread_notifications_counter: number
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
      select_notifications_of_users: {
        Args: {
          user_id: string
        }
        Returns: {
          type_of_notification: Database["public"]["Enums"]["notifications_enum"]
          read_by_receiver: boolean
          created_at: string
          first_name: string
          last_name: string
          profile_image: string
        }[]
      }
      select_notifications_of_users2: {
        Args: {
          user_id: string
        }
        Returns: {
          created_at: string
          id: string
          read_by_receiver: boolean
          receiver: string
          sender: string
          type_of_notification: Database["public"]["Enums"]["notifications_enum"]
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
      update_receive_notifications_from_follow: {
        Args: {
          user_id: string
          new_status: boolean
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
      notifications_enum: "follow_from_user"
      tutorial_enum: "welcome" | "profile" | "search"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
