export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_if_following: {
        Args: {
          following_id: string
        }
        Returns: boolean
      }
      create_group_relation: {
        Args: {
          group_id: string
          related_group_id: string
          relation_type: Database["public"]["Enums"]["group_relation"]
          created_by?: string
          updated_at?: string
          right_to_inform?: boolean
          right_to_speak?: boolean
          right_to_amend?: boolean
          right_to_vote_active?: boolean
          right_to_vote_passive?: boolean
        }
        Returns: undefined
      }
      follow_transaction: {
        Args: {
          following_id: string
        }
        Returns: undefined
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      remove_follower_transaction: {
        Args: {
          follower_id: string
        }
        Returns: undefined
      }
      reset_notification_counter: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_user: {
        Args: {
          search_term: string
        }
        Returns: {
          id: string
          first_name: string
          last_name: string
          username: string
        }[]
      }
      select_all_push_subscriptions_of_user: {
        Args: {
          user_to_be_notified: string
        }
        Returns: {
          id: string
          endpoint: string
          expirationtime: string
          auth: string
          p256dh: string
        }[]
      }
      select_assistant: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          first_sign_in: boolean
          skip_tutorial: boolean
          last_tutorial: Database["public"]["Enums"]["tutorial_enum"]
        }[]
      }
      select_follower_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          profile_image: string
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
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          profile_image: string
          first_name: string
          last_name: string
        }[]
      }
      select_notifications_of_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          type_of_notification: Database["public"]["Enums"]["notifications_enum"]
          read_by_receiver: boolean
          created_at: string
          first_name: string
          last_name: string
          profile_image: string
        }[]
      }
      select_unread_notifications_counter: {
        Args: Record<PropertyKey, never>
        Returns: {
          profile_id: string
          unread_notifications_counter: number
        }[]
      }
      select_user: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          first_name: string
          last_name: string
          profile_image: string
        }[]
      }
      select_user_notification_settings: {
        Args: Record<PropertyKey, never>
        Returns: {
          receive_follow_notifications: boolean
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      unfollow_transaction: {
        Args: {
          following_id: string
        }
        Returns: undefined
      }
      update_first_sign_in: {
        Args: {
          new_status: boolean
        }
        Returns: undefined
      }
      update_last_tutorial: {
        Args: {
          new_status: Database["public"]["Enums"]["tutorial_enum"]
        }
        Returns: undefined
      }
      update_receive_notifications_from_follow: {
        Args: {
          new_status: boolean
        }
        Returns: undefined
      }
      update_skip_tutorial: {
        Args: {
          new_status: boolean
        }
        Returns: undefined
      }
      update_user: {
        Args: {
          updated_at_in?: string
          username_in?: string
          first_name_in?: string
          last_name_in?: string
          profile_image_in?: string
          receive_follow_notifications_in?: boolean
        }
        Returns: undefined
      }
      upsert_push_subscription: {
        Args: {
          endpoint: string
          expirationtime: string
          auth: string
          p256dh: string
        }
        Returns: undefined
      }
    }
    Enums: {
      group_level: "local" | "regional" | "federal"
      group_member: "member" | "board_member" | "board_president"
      group_relation: "child" | "parent" | "sibling"
      meeting_type: "inaugural_meeting" | "board_meeting" | "general_assembly"
      notifications_enum: "follow_from_user"
      tutorial_enum: "welcome" | "profile" | "search"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
