export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  authenticated: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_group_invitation_by_id_transaction: {
        Args: {
          _invitation_id: string
        }
        Returns: unknown
      }
      accept_group_invitation_transaction: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      accept_group_membership_request_transaction: {
        Args: {
          _request_id: string
        }
        Returns: undefined
      }
      check_group_membership_status: {
        Args: {
          _group_id: string
        }
        Returns: string
      }
      check_if_user_follows_group: {
        Args: {
          _following_id: string
        }
        Returns: boolean
      }
      check_if_user_follows_profile: {
        Args: {
          _following_id: string
        }
        Returns: boolean
      }
      create_group_member_invitation: {
        Args: {
          _group_id: string
          _member_id: string
        }
        Returns: undefined
      }
      create_group_member_request: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      create_group_transaction: {
        Args: {
          _name: string
          _description: string
          _level: "local" | "regional" | "national"
          _invited_members: string[]
        }
        Returns: undefined
      }
      delete_group_member_invitation: {
        Args: {
          _group_id: string
        }
        Returns: unknown
      }
      delete_group_member_invitation_by_id: {
        Args: {
          _invitation_id: string
        }
        Returns: unknown
      }
      delete_group_member_request: {
        Args: {
          _group_id: string
        }
        Returns: unknown
      }
      delete_group_member_request_by_id: {
        Args: {
          _request_id: string
        }
        Returns: unknown
      }
      follow_group_transaction: {
        Args: {
          _following_id: string
        }
        Returns: undefined
      }
      follow_profile_transaction: {
        Args: {
          _following_id: string
        }
        Returns: undefined
      }
      leave_group_by_membership_id_transaction: {
        Args: {
          _membership_id: string
        }
        Returns: undefined
      }
      leave_group_member_transaction: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      read_assistant: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          first_sign_in_: boolean
          skip_tutorial_: boolean
          last_tutorial_: "welcome" | "profile" | "search"
        }[]
      }
      read_followers_of_group: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          profile_image_: string
          first_name_: string
          last_name_: string
        }[]
      }
      read_followers_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          profile_image_: string
          first_name_: string
          last_name_: string
        }[]
      }
      read_followings_of_group: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          profile_image_: string
          first_name_: string
          last_name_: string
        }[]
      }
      read_followings_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          profile_image_: string
          first_name_: string
          last_name_: string
        }[]
      }
      read_group: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          name_: string
          level_: "local" | "regional" | "national"
          description_: string
        }[]
      }
      read_group_counters: {
        Args: {
          _group_id: string
        }
        Returns: {
          group_id_: string
          follower_counter_: number
          following_counter_: number
          group_member_counter_: number
        }[]
      }
      read_group_followings_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          img_url_: string
          name_: string
          level_: "local" | "regional" | "national"
        }[]
      }
      read_group_member_invitations: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          member_id_: string
          member_type_: "member" | "board_member" | "board_president"
          first_name_: string
          last_name_: string
          profile_image_: string
        }[]
      }
      read_group_member_invitations_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          group_id_: string
          group_name_: string
          group_level_: "local" | "regional" | "national"
        }[]
      }
      read_group_member_requests: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          member_id_: string
          member_type_: "member" | "board_member" | "board_president"
          first_name_: string
          last_name_: string
          profile_image_: string
        }[]
      }
      read_group_members: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          member_id_: string
          member_type_: "member" | "board_member" | "board_president"
          first_name_: string
          last_name_: string
          profile_image_: string
        }[]
      }
      read_group_requests_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          group_id_: string
          group_name_: string
          group_level_: "local" | "regional" | "national"
        }[]
      }
      read_groups_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          group_id_: string
          group_name_: string
          group_level_: "local" | "regional" | "national"
        }[]
      }
      read_notifications_of_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          type_of_notification_: "follow_from_user"
          read_by_receiver_: boolean
          created_at_: string
          first_name_: string
          last_name_: string
          profile_image_: string
        }[]
      }
      read_profile: {
        Args: {
          _user_id: string
        }
        Returns: {
          profile_id_: string
          first_name_: string
          last_name_: string
          profile_image_: string
        }[]
      }
      read_profile_counters: {
        Args: {
          _user_id: string
        }
        Returns: {
          profile_id_: string
          follower_counter_: number
          following_counter_: number
          group_membership_counter_: number
        }[]
      }
      read_profile_notification_settings: {
        Args: Record<PropertyKey, never>
        Returns: {
          receive_follow_notifications_: boolean
        }[]
      }
      read_unread_notifications_counter: {
        Args: Record<PropertyKey, never>
        Returns: {
          profile_id_: string
          unread_notifications_counter_: number
        }[]
      }
      remove_follower_of_authenticated_user_transaction: {
        Args: {
          _follower_id: string
        }
        Returns: undefined
      }
      remove_group_follower_transaction: {
        Args: {
          _follower_id: string
          _group_id_in: string
        }
        Returns: undefined
      }
      reset_profile_notification_counter: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_group: {
        Args: {
          _search_term: string
        }
        Returns: {
          id_: string
          name_: string
          level_: "local" | "regional" | "national"
          description_: string
        }[]
      }
      search_user: {
        Args: {
          _search_term: string
        }
        Returns: {
          id_: string
          first_name_: string
          last_name_: string
          username_: string
        }[]
      }
      unfollow_group_transaction: {
        Args: {
          _following_id: string
        }
        Returns: undefined
      }
      unfollow_profile_transaction: {
        Args: {
          _following_id: string
        }
        Returns: undefined
      }
      update_first_sign_in: {
        Args: {
          _new_status: boolean
        }
        Returns: undefined
      }
      update_last_tutorial: {
        Args: {
          _new_status: "welcome" | "profile" | "search"
        }
        Returns: undefined
      }
      update_profile: {
        Args: {
          _updated_at?: string
          _username?: string
          _first_name?: string
          _last_name?: string
          _profile_image?: string
          _receive_follow_notifications?: boolean
        }
        Returns: undefined
      }
      update_profile_receive_notifications_from_follow: {
        Args: {
          _new_status: boolean
        }
        Returns: undefined
      }
      update_skip_tutorial: {
        Args: {
          _new_status: boolean
        }
        Returns: undefined
      }
      upsert_push_subscription: {
        Args: {
          _endpoint: string
          _expirationtime: string
          _auth: string
          _p256dh: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
