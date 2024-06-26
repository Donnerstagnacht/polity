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
      assistants_first_sign_in_update: {
        Args: {
          _new_status: boolean
        }
        Returns: {
          id_: string
          first_sign_in_: boolean
          skip_tutorial_: boolean
          last_tutorial_: string
        }[]
      }
      assistants_last_tutorial_update: {
        Args: {
          _new_status: "welcome" | "profile" | "search"
        }
        Returns: {
          id_: string
          first_sign_in_: boolean
          skip_tutorial_: boolean
          last_tutorial_: string
        }[]
      }
      assistants_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          first_sign_in_: boolean
          skip_tutorial_: boolean
          last_tutorial_: "welcome" | "profile" | "search"
        }[]
      }
      assistants_skip_tutorial_update: {
        Args: {
          _new_status: boolean
        }
        Returns: {
          id_: string
          first_sign_in_: boolean
          skip_tutorial_: boolean
          last_tutorial_: string
        }[]
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
      followers_of_group_read: {
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
      followings_of_group_read: {
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
      group_counters_read: {
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
      group_followings_of_user_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          img_url_: string
          name_: string
          level_: "local" | "regional" | "national"
        }[]
      }
      group_member_invitations_by_id_delete: {
        Args: {
          _invitation_id: string
        }
        Returns: unknown
      }
      group_member_invitations_create: {
        Args: {
          _group_id: string
          _member_id: string
        }
        Returns: undefined
      }
      group_member_invitations_delete: {
        Args: {
          _group_id: string
        }
        Returns: unknown
      }
      group_member_invitations_delete_by_inviter: {
        Args: {
          _group_id: string
          _member_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          member_id_: string
          invited_by_: string
        }[]
      }
      group_member_invitations_of_user_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          group_id_: string
          group_name_: string
          group_level_: "local" | "regional" | "national"
          img_url_: string
        }[]
      }
      group_member_invitations_read: {
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
      group_member_requests_create: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      group_member_requests_delete: {
        Args: {
          _group_id: string
        }
        Returns: unknown
      }
      group_member_requests_delete_by_id: {
        Args: {
          _request_id: string
        }
        Returns: unknown
      }
      group_member_requests_of_group_read: {
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
      group_member_requests_of_user_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          group_id_: string
          group_name_: string
          group_level_: "local" | "regional" | "national"
          img_url_: string
        }[]
      }
      group_members_of_group_read: {
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
      group_read: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          name_: string
          description_: string
          level_: "local" | "regional" | "national"
          img_url_: string
          created_at_: string
          updated_at_: string
        }[]
      }
      groups_create_transaction: {
        Args: {
          _name: string
          _description: string
          _level: "local" | "regional" | "national"
          _invited_members: string[]
        }
        Returns: undefined
      }
      groups_of_user_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          group_id_: string
          group_name_: string
          group_level_: "local" | "regional" | "national"
          img_url_: string
        }[]
      }
      groups_update: {
        Args: {
          _id: string
          _name?: string
          _description?: string
          _img_url?: string
        }
        Returns: {
          id_: string
          name_: string
          description_: string
          level_: "local" | "regional" | "national"
          img_url_: string
          created_at_: string
          updated_at_: string
        }[]
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
      notifications_of_user_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          type_of_notification_: "follow_from_user"
          read_by_receiver_: boolean
          created_at_: string
          profile_id_: string
          first_name_: string
          last_name_: string
          profile_image_: string
        }[]
      }
      profile_counters_read: {
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
      profile_followers_of_user_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          profile_image_: string
          first_name_: string
          last_name_: string
        }[]
      }
      profile_followings_of_user_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_: string
          profile_image_: string
          first_name_: string
          last_name_: string
        }[]
      }
      profiles_read: {
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
      profiles_read_notification_settings: {
        Args: Record<PropertyKey, never>
        Returns: {
          receive_follow_notifications_: boolean
        }[]
      }
      profiles_receive_notifications_from_follow_update: {
        Args: {
          _new_status: boolean
        }
        Returns: {
          receive_follow_notifications_: boolean
        }[]
      }
      profiles_update: {
        Args: {
          _username?: string
          _first_name?: string
          _last_name?: string
          _profile_image?: string
          _receive_follow_notifications?: boolean
        }
        Returns: {
          profile_id_: string
          first_name_: string
          last_name_: string
          profile_image_: string
        }[]
      }
      push_subscription_upsert: {
        Args: {
          _endpoint: string
          _expirationtime: string
          _auth: string
          _p256dh: string
        }
        Returns: undefined
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
          img_url_: string
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
          img_url_: string
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
      unread_notifications_counter_read: {
        Args: Record<PropertyKey, never>
        Returns: {
          profile_id_: string
          unread_notifications_counter_: number
        }[]
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
