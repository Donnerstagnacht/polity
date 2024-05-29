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
          _invitation_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
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
      check_if_user_following_group: {
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
      create_group_relation: {
        Args: {
          _group_id: string
          _related_group_id: string
          _relation_type: Database["public"]["Enums"]["group_relation"]
          _created_at?: string
          _updated_at?: string
          _right_to_inform?: boolean
          _right_to_speak?: boolean
          _right_to_amend?: boolean
          _right_to_vote_active?: boolean
          _right_to_vote_passive?: boolean
        }
        Returns: undefined
      }
      create_group_transaction: {
        Args: {
          _name: string
          _description: string
          _level: Database["public"]["Enums"]["group_level"]
          _invited_members: string[]
        }
        Returns: undefined
      }
      delete_group_member_invitation: {
        Args: {
          _group_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      delete_group_member_invitation_by_id: {
        Args: {
          _invitation_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      delete_group_member_request: {
        Args: {
          _group_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
      }
      delete_group_member_request_by_id: {
        Args: {
          _request_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["membership"]
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
          id: string
          first_sign_in: boolean
          skip_tutorial: boolean
          last_tutorial: Database["public"]["Enums"]["tutorial_enum"]
        }[]
      }
      read_followers_of_group: {
        Args: {
          _group_id: string
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
      read_followings_of_group: {
        Args: {
          _group_id: string
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
          _group_id: string
        }
        Returns: {
          id: string
          name: string
          level: Database["public"]["Enums"]["group_level"]
          description: string
        }[]
      }
      read_group_counters: {
        Args: {
          _group_id: string
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
          _group_id: string
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
          _group_id: string
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
          _group_id: string
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
      read_notifications_of_user: {
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
          _user_id: string
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
          _user_id: string
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
          id: string
          name: string
          level: Database["public"]["Enums"]["group_level"]
          description: string
        }[]
      }
      search_user: {
        Args: {
          _search_term: string
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
          _new_status: Database["public"]["Enums"]["tutorial_enum"]
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
