export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  hidden: {
    Tables: {
      assistants: {
        Row: {
          first_sign_in: boolean
          id: string
          last_tutorial: Database["hidden"]["Enums"]["tutorial_enum"]
          skip_tutorial: boolean
        }
        Insert: {
          first_sign_in?: boolean
          id: string
          last_tutorial?: Database["hidden"]["Enums"]["tutorial_enum"]
          skip_tutorial?: boolean
        }
        Update: {
          first_sign_in?: boolean
          id?: string
          last_tutorial?: Database["hidden"]["Enums"]["tutorial_enum"]
          skip_tutorial?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "assistants_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      following_groups: {
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
            foreignKeyName: "following_groups_follower_fkey"
            columns: ["follower"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "following_groups_following_fkey"
            columns: ["following"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
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
          },
        ]
      }
      group_hashtags: {
        Row: {
          group_id: string
          hashtag_id: string
          id: string
        }
        Insert: {
          group_id: string
          hashtag_id: string
          id: string
        }
        Update: {
          group_id?: string
          hashtag_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_hashtag_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_hashtag_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
        ]
      }
      group_invited_members: {
        Row: {
          created_at: string
          group_id: string
          id: string
          member_id: string
          member_type: Database["hidden"]["Enums"]["group_member"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          member_id: string
          member_type?: Database["hidden"]["Enums"]["group_member"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          member_id?: string
          member_type?: Database["hidden"]["Enums"]["group_member"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_invited_member_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_invited_member_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_member_requests: {
        Row: {
          created_at: string
          group_id: string
          id: string
          member_id: string
          member_type: Database["hidden"]["Enums"]["group_member"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          member_id: string
          member_type?: Database["hidden"]["Enums"]["group_member"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          member_id?: string
          member_type?: Database["hidden"]["Enums"]["group_member"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_member_request_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_member_request_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          created_at: string
          group_id: string
          id: string
          member_id: string
          member_type: Database["hidden"]["Enums"]["group_member"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          member_id: string
          member_type?: Database["hidden"]["Enums"]["group_member"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          member_id?: string
          member_type?: Database["hidden"]["Enums"]["group_member"] | null
          updated_at?: string
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
      group_relations: {
        Row: {
          created_at: string
          group_id: string
          id: string
          related_group_id: string
          relation_type: Database["hidden"]["Enums"]["group_relation"] | null
          right_to_amend: boolean | null
          right_to_inform: boolean | null
          right_to_speak: boolean | null
          right_to_vote_active: boolean | null
          right_to_vote_passive: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id: string
          related_group_id: string
          relation_type?: Database["hidden"]["Enums"]["group_relation"] | null
          right_to_amend?: boolean | null
          right_to_inform?: boolean | null
          right_to_speak?: boolean | null
          right_to_vote_active?: boolean | null
          right_to_vote_passive?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          related_group_id?: string
          relation_type?: Database["hidden"]["Enums"]["group_relation"] | null
          right_to_amend?: boolean | null
          right_to_inform?: boolean | null
          right_to_speak?: boolean | null
          right_to_vote_active?: boolean | null
          right_to_vote_passive?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_relation_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_relation_related_id_fkey"
            columns: ["related_group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_requested_relations: {
        Row: {
          created_at: string
          group_id: string
          id: string
          related_group_id: string
          relation_type: Database["hidden"]["Enums"]["group_relation"] | null
          right_to_amend: boolean | null
          right_to_inform: boolean | null
          right_to_speak: boolean | null
          right_to_vote_active: boolean | null
          right_to_vote_passive: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id: string
          related_group_id: string
          relation_type?: Database["hidden"]["Enums"]["group_relation"] | null
          right_to_amend?: boolean | null
          right_to_inform?: boolean | null
          right_to_speak?: boolean | null
          right_to_vote_active?: boolean | null
          right_to_vote_passive?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          related_group_id?: string
          relation_type?: Database["hidden"]["Enums"]["group_relation"] | null
          right_to_amend?: boolean | null
          right_to_inform?: boolean | null
          right_to_speak?: boolean | null
          right_to_vote_active?: boolean | null
          right_to_vote_passive?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_requested_relation_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_requested_relation_related_id_fkey"
            columns: ["related_group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          creator: string
          description: string | null
          fts: unknown | null
          id: string
          img_url: string | null
          level: Database["hidden"]["Enums"]["group_level"]
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator: string
          description?: string | null
          fts?: unknown | null
          id?: string
          img_url?: string | null
          level?: Database["hidden"]["Enums"]["group_level"]
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator?: string
          description?: string | null
          fts?: unknown | null
          id?: string
          img_url?: string | null
          level?: Database["hidden"]["Enums"]["group_level"]
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_table_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups_counters: {
        Row: {
          follower_counter: number
          following_counter: number
          group_member_counter: number
          id: string
          unread_notifications_counter: number
        }
        Insert: {
          follower_counter?: number
          following_counter?: number
          group_member_counter?: number
          id: string
          unread_notifications_counter?: number
        }
        Update: {
          follower_counter?: number
          following_counter?: number
          group_member_counter?: number
          id?: string
          unread_notifications_counter?: number
        }
        Relationships: [
          {
            foreignKeyName: "groups_counters_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtag_groups: {
        Row: {
          group_id: string
          hashtag_id: string
          id: string
        }
        Insert: {
          group_id: string
          hashtag_id: string
          id: string
        }
        Update: {
          group_id?: string
          hashtag_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hashtag_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hashtag_groups_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtags: {
        Row: {
          id: string
          value: string
        }
        Insert: {
          id: string
          value: string
        }
        Update: {
          id?: string
          value?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string
          creator_id: string
          date: string
          description: string | null
          fts: unknown | null
          group_id: string
          id: string
          name: string
          type: Database["hidden"]["Enums"]["meeting_type"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          date: string
          description?: string | null
          fts?: unknown | null
          group_id: string
          id: string
          name: string
          type?: Database["hidden"]["Enums"]["meeting_type"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          date?: string
          description?: string | null
          fts?: unknown | null
          group_id?: string
          id?: string
          name?: string
          type?: Database["hidden"]["Enums"]["meeting_type"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications_by_user: {
        Row: {
          created_at: string
          id: string
          read_by_receiver: boolean
          receiver: string
          sender: string
          type_of_notification: Database["hidden"]["Enums"]["notifications_enum"]
        }
        Insert: {
          created_at?: string
          id?: string
          read_by_receiver?: boolean
          receiver: string
          sender: string
          type_of_notification?: Database["hidden"]["Enums"]["notifications_enum"]
        }
        Update: {
          created_at?: string
          id?: string
          read_by_receiver?: boolean
          receiver?: string
          sender?: string
          type_of_notification?: Database["hidden"]["Enums"]["notifications_enum"]
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
          },
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
          },
        ]
      }
      profiles_counters: {
        Row: {
          follower_counter: number
          following_counter: number
          group_membership_counter: number
          id: string
          unread_notifications_counter: number
        }
        Insert: {
          follower_counter?: number
          following_counter?: number
          group_membership_counter?: number
          id: string
          unread_notifications_counter?: number
        }
        Update: {
          follower_counter?: number
          following_counter?: number
          group_membership_counter?: number
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
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth: string
          endpoint: string
          expirationtime: string | null
          id: string
          p256dh: string
        }
        Insert: {
          auth: string
          endpoint: string
          expirationtime?: string | null
          id: string
          p256dh: string
        }
        Update: {
          auth?: string
          endpoint?: string
          expirationtime?: string | null
          id?: string
          p256dh?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_group_relation_request_transaction: {
        Args: {
          _group_relation_request_id: string
          _group_id: string
        }
        Returns: undefined
      }
      check_profile_if_user_receives_follow_notifications: {
        Args: {
          _user_id: string
        }
        Returns: boolean
      }
      create_notification_from_user_transaction: {
        Args: {
          _sender: string
          _receiver: string
          _type_of_notification: Database["hidden"]["Enums"]["notifications_enum"]
          _read_by_receiver: boolean
        }
        Returns: undefined
      }
      decrement_group_follower_counter: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      decrement_group_following_counter: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      decrement_group_member_counter: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      decrement_profile_follower_counter: {
        Args: {
          _user_id: string
        }
        Returns: undefined
      }
      decrement_profile_following_counter: {
        Args: {
          _user_id: string
        }
        Returns: undefined
      }
      decrement_profile_group_membership_counter: {
        Args: {
          _user_id: string
        }
        Returns: undefined
      }
      group_followers_create: {
        Args: {
          _follower_id: string
          _following_id: string
        }
        Returns: undefined
      }
      group_followers_delete: {
        Args: {
          _follower_id: string
          _following_id: string
        }
        Returns: undefined
      }
      group_hashtag_relationship_delete: {
        Args: {
          _hashtag_id: string
        }
        Returns: undefined
      }
      group_hashtags_read: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          value_: string
        }[]
      }
      group_member_delete: {
        Args: {
          _user_id: string
          _group_id: string
        }
        Returns: undefined
      }
      group_member_invitations_read_one: {
        Args: {
          _group_id: string
          _user_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          member_id_: string
          member_type_: Database["hidden"]["Enums"]["group_member"]
          created_at_: string
          updated_at_: string
        }[]
      }
      group_member_request_read_one: {
        Args: {
          _group_id: string
          _user_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          member_id_: string
          member_type_: Database["hidden"]["Enums"]["group_member"]
          created_at_: string
          updated_at_: string
        }[]
      }
      group_members_by_id_delete: {
        Args: {
          _membership_id: string
        }
        Returns: unknown
      }
      group_members_create: {
        Args: {
          _group_id: string
          _member_id: string
          _member_type: Database["hidden"]["Enums"]["group_member"]
        }
        Returns: unknown
      }
      group_members_of_group_read_one: {
        Args: {
          _membership_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          member_id_: string
          member_type_: Database["hidden"]["Enums"]["group_member"]
          created_at_: string
          updated_at_: string
          profile_image_: string
        }[]
      }
      group_relation_create: {
        Args: {
          _group_id: string
          _related_group_id: string
          _relation_type: Database["hidden"]["Enums"]["group_relation"]
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
      group_relation_requests_create: {
        Args: {
          _group_id: string
          _related_group_id: string
          _relation_type: Database["hidden"]["Enums"]["group_relation"]
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
      group_relation_requests_delete: {
        Args: {
          _group_relation_id: string
        }
        Returns: {
          deleted_requested_group_relation: Record<string, unknown>
        }[]
      }
      group_relation_requests_read: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          related_group_id_: string
          relation_type_: Database["hidden"]["Enums"]["group_relation"]
          created_at_: string
          updated_at_: string
          right_to_inform_: boolean
          right_to_speak_: boolean
          right_to_amend_: boolean
          right_to_vote_active_: boolean
          right_to_vote_passive_: boolean
        }[]
      }
      group_relations_delete: {
        Args: {
          _group_relation_id: string
        }
        Returns: undefined
      }
      group_relations_read: {
        Args: {
          _group_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          related_group_id_: string
          relation_type_: Database["hidden"]["Enums"]["group_relation"]
          created_at_: string
          updated_at_: string
          right_to_inform_: boolean
          right_to_speak_: boolean
          right_to_amend_: boolean
          right_to_vote_active_: boolean
          right_to_vote_passive_: boolean
        }[]
      }
      groups_create: {
        Args: {
          _name: string
          _description: string
          _level: Database["hidden"]["Enums"]["group_level"]
          _created_by: string
          _created_at?: string
          _updated_at?: string
        }
        Returns: string
      }
      groups_hashtag_relationship_create: {
        Args: {
          _group_id: string
          _hashtag_id: string
        }
        Returns: undefined
      }
      hashtag_create: {
        Args: {
          _value: string
        }
        Returns: undefined
      }
      increment_group_follower_counter: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      increment_group_following_counter: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      increment_group_member_counter: {
        Args: {
          _group_id: string
        }
        Returns: undefined
      }
      increment_profile_follower_counter: {
        Args: {
          _user_id: string
        }
        Returns: undefined
      }
      increment_profile_following_counter: {
        Args: {
          _user_id: string
        }
        Returns: undefined
      }
      increment_profile_group_membership_counter: {
        Args: {
          _user_id: string
        }
        Returns: undefined
      }
      increment_profile_notification_counter: {
        Args: {
          _user_id: string
        }
        Returns: undefined
      }
      meetings_create: {
        Args: {
          _group_id: string
          _creator_id: string
          _name: string
          _description: string
          _type: Database["hidden"]["Enums"]["meeting_type"]
          _date: string
          _created_at?: string
          _updated_at?: string
        }
        Returns: undefined
      }
      meetings_read: {
        Args: {
          _group_id: string
        }
        Returns: {
          id: string
          group_id: string
          creator_id: string
          name: string
          description: string
          type: Database["hidden"]["Enums"]["meeting_type"]
          date: string
          created_at: string
          updated_at: string
        }[]
      }
      meetings_read_one: {
        Args: {
          _meeting_id: string
        }
        Returns: {
          id_: string
          group_id_: string
          creator_id_: string
          name_: string
          description_: string
          type_: Database["hidden"]["Enums"]["meeting_type"]
          date_: string
          created_at_: string
          updated_at_: string
        }[]
      }
      notifications_by_user_create: {
        Args: {
          _sender: string
          _receiver: string
          _type_of_notification: Database["hidden"]["Enums"]["notifications_enum"]
          _read_by_receiver: boolean
        }
        Returns: undefined
      }
      profile_followers_create: {
        Args: {
          _follower_id: string
          _following_id: string
        }
        Returns: undefined
      }
      profile_followers_delete: {
        Args: {
          _follower_id: string
          _following_id: string
        }
        Returns: undefined
      }
      push_subscriptions_of_user_read: {
        Args: {
          _user_to_be_notified: string
        }
        Returns: {
          id_: string
          endpoint_: string
          expirationtime_: string
          auth_: string
          p256dh_: string
        }[]
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
