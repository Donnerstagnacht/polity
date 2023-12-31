export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    authenticated_access: {
        Tables: {
            assistants: {
                Row: {
                    first_sign_in: boolean
                    id: string
                    last_tutorial: "welcome" | "profile" | "search"
                    skip_tutorial: boolean
                }
                Insert: {
                    first_sign_in?: boolean
                    id: string
                    last_tutorial?: "welcome" | "profile" | "search"
                    skip_tutorial?: boolean
                }
                Update: {
                    first_sign_in?: boolean
                    id?: string
                    last_tutorial?: "welcome" | "profile" | "search"
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
                    type_of_notification: "follow_from_user"
                }
                Insert: {
                    created_at?: string
                    id?: string
                    read_by_receiver?: boolean
                    receiver: string
                    sender: string
                    type_of_notification?: "follow_from_user"
                }
                Update: {
                    created_at?: string
                    id?: string
                    read_by_receiver?: boolean
                    receiver?: string
                    sender?: string
                    type_of_notification?: "follow_from_user"
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
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            check_if_user_receives_follow_notifications: {
                Args: {
                    user_id: string
                }
                Returns: boolean
            }
            create_notification_from_user_transaction: {
                Args: {
                    sender: string
                    receiver: string
                    type_of_notification: "follow_from_user"
                    read_by_receiver: boolean
                }
                Returns: undefined
            }
            decrement_follower_counter: {
                Args: {
                    user_id: string
                }
                Returns: undefined
            }
            decrement_following_counter: {
                Args: {
                    user_id: string
                }
                Returns: undefined
            }
            delete_following_follower_relationship: {
                Args: {
                    follower_id: string
                    following_id: string
                }
                Returns: undefined
            }
            increment_follower_counter: {
                Args: {
                    user_id: string
                }
                Returns: undefined
            }
            increment_following_counter: {
                Args: {
                    user_id: string
                }
                Returns: undefined
            }
            increment_notification_counter: {
                Args: {
                    user_id: string
                }
                Returns: undefined
            }
            insert_following_follower_relationship: {
                Args: {
                    follower_id: string
                    following_id: string
                }
                Returns: undefined
            }
            insert_notification_by_user: {
                Args: {
                    sender: string
                    receiver: string
                    type_of_notification: "follow_from_user"
                    read_by_receiver: boolean
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

export type TablesAuthenticatedAccess<
    PublicTableNameOrOptions extends | keyof (Database["authenticated_access"]["Tables"] & Database["authenticated_access"]["Views"])
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
    : PublicTableNameOrOptions extends keyof (Database["authenticated_access"]["Tables"] &
            Database["authenticated_access"]["Views"])
        ? (Database["authenticated_access"]["Tables"] &
            Database["authenticated_access"]["Views"])[PublicTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsertAuthenticatedAccess<
    PublicTableNameOrOptions extends | keyof Database["authenticated_access"]["Tables"]
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
    : PublicTableNameOrOptions extends keyof Database["authenticated_access"]["Tables"]
        ? Database["authenticated_access"]["Tables"][PublicTableNameOrOptions] extends {
                Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdateAuthenticatedAccess<
    PublicTableNameOrOptions extends | keyof Database["authenticated_access"]["Tables"]
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
    : PublicTableNameOrOptions extends keyof Database["authenticated_access"]["Tables"]
        ? Database["authenticated_access"]["Tables"][PublicTableNameOrOptions] extends {
                Update: infer U
            }
            ? U
            : never
        : never

export type EnumsAuthenticatedAccess<
    PublicEnumNameOrOptions extends | keyof Database["authenticated_access"]["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["authenticated_access"]["Enums"]
        ? Database["authenticated_access"]["Enums"][PublicEnumNameOrOptions]
        : never
