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
      board_memberships_of_authenticated_user: {
        Row: {
          created_at: string | null
          group_id: string | null
          id: string | null
          member_id: string | null
          member_type: Database["public"]["Enums"]["group_member"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          group_id?: string | null
          id?: string | null
          member_id?: string | null
          member_type?: Database["public"]["Enums"]["group_member"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          group_id?: string | null
          id?: string | null
          member_id?: string | null
          member_type?: Database["public"]["Enums"]["group_member"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_member_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_member_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships_of_authenticated_user: {
        Row: {
          created_at: string | null
          group_id: string | null
          id: string | null
          member_id: string | null
          member_type: Database["public"]["Enums"]["group_member"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          group_id?: string | null
          id?: string | null
          member_id?: string | null
          member_type?: Database["public"]["Enums"]["group_member"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          group_id?: string | null
          id?: string | null
          member_id?: string | null
          member_type?: Database["public"]["Enums"]["group_member"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_member_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_member_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_group_invitation_by_id_transaction: {
        Args: {
          invitation_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      accept_group_invitation_transaction: {
        Args: {
          group_id_in: string
        }
        Returns: undefined
      }
      accept_group_membership_request_transaction: {
        Args: {
          request_id: string
        }
        Returns: undefined
      }
      check_group_membership_status: {
        Args: {
          group_id_in: string
        }
        Returns: string
      }
      check_if_following: {
        Args: {
          following_id: string
        }
        Returns: boolean
      }
      check_if_following_group: {
        Args: {
          following_id: string
        }
        Returns: boolean
      }
      create_group_member_invitation: {
        Args: {
          group_id: string
          member_id: string
        }
        Returns: undefined
      }
      create_group_member_request: {
        Args: {
          group_id_in: string
        }
        Returns: undefined
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
      create_group_transaction: {
        Args: {
          name: string
          description: string
          level: Database["public"]["Enums"]["group_level"]
          invited_members: string[]
        }
        Returns: undefined
      }
      delete_group_member_invitation: {
        Args: {
          group_id_in: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      delete_group_member_invitation_by_id: {
        Args: {
          invitation_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      delete_group_member_request: {
        Args: {
          group_id_in: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      delete_group_member_request_by_id: {
        Args: {
          request_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      follow_group_transaction: {
        Args: {
          following_id: string
        }
        Returns: undefined
      }
      follow_profile_transaction: {
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
      leave_group_by_membership_id_transaction: {
        Args: {
          membership_id_in: string
        }
        Returns: undefined
      }
      leave_group_member_transaction: {
        Args: {
          group_id_in: string
        }
        Returns: undefined
      }
      read_all_push_subscriptions_of_user: {
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
      read_assistant: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          first_sign_in: boolean
          skip_tutorial: boolean
          last_tutorial: Database["public"]["Enums"]["tutorial_enum"]
        }[]
      }
      read_follower_of_group: {
        Args: {
          group_id_in: string
        }
        Returns: {
          id: string
          profile_image: string
          first_name: string
          last_name: string
        }[]
      }
      read_followers_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          profile_image: string
          first_name: string
          last_name: string
        }[]
      }
      read_following_of_group: {
        Args: {
          group_id_in: string
        }
        Returns: {
          id: string
          profile_image: string
          first_name: string
          last_name: string
        }[]
      }
      read_followings_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          profile_image: string
          first_name: string
          last_name: string
        }[]
      }
      read_group_columns: {
        Args: {
          group_id: string
        }
        Returns: {
          id: string
          name: string
          level: Database["public"]["Enums"]["group_level"]
          description: string
        }[]
      }
      read_group_counter: {
        Args: {
          group_id_in: string
        }
        Returns: {
          group_id: string
          follower_counter: number
          following_counter: number
          group_member_counter: number
        }[]
      }
      read_group_followings_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          img_url: string
          name: string
          level: Database["public"]["Enums"]["group_level"]
        }[]
      }
      read_group_member_invitations: {
        Args: {
          group_id_in: string
        }
        Returns: {
          id: string
          group_id: string
          member_id: string
          member_type: Database["public"]["Enums"]["group_member"]
          first_name: string
          last_name: string
          profile_image: string
        }[]
      }
      read_group_member_invitations_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          group_id: string
          group_name: string
          group_level: Database["public"]["Enums"]["group_level"]
        }[]
      }
      read_group_member_requests: {
        Args: {
          group_id_in: string
        }
        Returns: {
          id: string
          group_id: string
          member_id: string
          member_type: Database["public"]["Enums"]["group_member"]
          first_name: string
          last_name: string
          profile_image: string
        }[]
      }
      read_group_members: {
        Args: {
          group_id_in: string
        }
        Returns: {
          id: string
          group_id: string
          member_id: string
          member_type: Database["public"]["Enums"]["group_member"]
          first_name: string
          last_name: string
          profile_image: string
        }[]
      }
      read_group_requests_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          group_id: string
          group_name: string
          group_level: Database["public"]["Enums"]["group_level"]
        }[]
      }
      read_groups_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          group_id: string
          group_name: string
          group_level: Database["public"]["Enums"]["group_level"]
        }[]
      }
      read_notifications_of_users: {
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
      read_profile_counters: {
        Args: {
          user_id: string
        }
        Returns: {
          profile_id: string
          follower_counter: number
          following_counter: number
          group_membership_counter: number
        }[]
      }
      read_profile_notification_settings: {
        Args: Record<PropertyKey, never>
        Returns: {
          receive_follow_notifications: boolean
        }[]
      }
      read_unread_notifications_counter: {
        Args: Record<PropertyKey, never>
        Returns: {
          profile_id: string
          unread_notifications_counter: number
        }[]
      }
      read_user: {
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
      remove_follower_of_authenticated_user_transaction: {
        Args: {
          follower_id: string
        }
        Returns: undefined
      }
      remove_group_follower_transaction: {
        Args: {
          follower_id: string
          group_id_in: string
        }
        Returns: undefined
      }
      reset_profile_notification_counter: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_group: {
        Args: {
          search_term: string
        }
        Returns: {
          id: string
          name: string
          level: Database["public"]["Enums"]["group_level"]
          description: string
        }[]
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
      unfollow_group_transaction: {
        Args: {
          following_id: string
        }
        Returns: undefined
      }
      unfollow_profile_transaction: {
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
      update_profile: {
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
      update_profile_receive_notifications_from_follow: {
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
      group_level: "local" | "regional" | "national"
      group_member: "member" | "board_member" | "board_president"
      group_relation: "child" | "parent" | "sibling"
      meeting_type: "inaugural_meeting" | "board_meeting" | "general_assembly"
      notifications_enum: "follow_from_user"
      tutorial_enum: "welcome" | "profile" | "search"
    }
    CompositeTypes: {
      delete_group: {
        group_id: string | null
        member_id: string | null
      }
      membership: {
        id: string | null
        group_id: string | null
        member_id: string | null
      }
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
