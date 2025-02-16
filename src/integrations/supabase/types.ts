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
      achievements: {
        Row: {
          category: Database["public"]["Enums"]["achievement_category"]
          created_at: string
          description: string
          icon_url: string | null
          id: string
          points: number
          required_count: number
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["achievement_category"]
          created_at?: string
          description: string
          icon_url?: string | null
          id?: string
          points?: number
          required_count?: number
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["achievement_category"]
          created_at?: string
          description?: string
          icon_url?: string | null
          id?: string
          points?: number
          required_count?: number
          title?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes: number | null
          status: string | null
          title: string
          views: number | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number | null
          status?: string | null
          title: string
          views?: number | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number | null
          status?: string | null
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      challenges: {
        Row: {
          created_at: string
          description: string
          end_date: string | null
          id: string
          points: number
          start_date: string | null
          status: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date?: string | null
          id?: string
          points: number
          start_date?: string | null
          status?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          points?: number
          start_date?: string | null
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          category: string
          content_type: string
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          category: string
          content_type: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          category?: string
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          donor_email: string | null
          donor_name: string | null
          id: string
          payment_method: string
          payment_status: string
        }
        Insert: {
          amount: number
          created_at?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          payment_method: string
          payment_status: string
        }
        Update: {
          amount?: number
          created_at?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          payment_method?: string
          payment_status?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      live_support: {
        Row: {
          created_at: string
          id: string
          message: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          description: string | null
          id: string
          media_type: string
          status: string | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          media_type: string
          status?: string | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          media_type?: string
          status?: string | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          status: Database["public"]["Enums"]["message_status"] | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["message_status"] | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["message_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          invite_code: string | null
          message_timeout: number | null
          phone: string | null
          referral_code: string | null
          show_messages: boolean | null
          social_links: Json | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          invite_code?: string | null
          message_timeout?: number | null
          phone?: string | null
          referral_code?: string | null
          show_messages?: boolean | null
          social_links?: Json | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          invite_code?: string | null
          message_timeout?: number | null
          phone?: string | null
          referral_code?: string | null
          show_messages?: boolean | null
          social_links?: Json | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string
          id: string
          options: Json
          points: number
          question: string
          quiz_id: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          id?: string
          options: Json
          points?: number
          question: string
          quiz_id: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          id?: string
          options?: Json
          points?: number
          question?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          points: number
          start_date: string | null
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          points?: number
          start_date?: string | null
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          points?: number
          start_date?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_id: string
          referrer_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
          status?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          id: string
          skill_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          skill_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          skill_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      social_media_shares: {
        Row: {
          content_type: string
          content_url: string
          created_at: string
          description: string | null
          engagement_metrics: Json | null
          hashtags: string[] | null
          id: string
          platform: Database["public"]["Enums"]["social_platform"]
          points_earned: number | null
          reach: number | null
          updated_at: string
          user_id: string
          verification_status: string | null
          views: number | null
        }
        Insert: {
          content_type: string
          content_url: string
          created_at?: string
          description?: string | null
          engagement_metrics?: Json | null
          hashtags?: string[] | null
          id?: string
          platform: Database["public"]["Enums"]["social_platform"]
          points_earned?: number | null
          reach?: number | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
          views?: number | null
        }
        Update: {
          content_type?: string
          content_url?: string
          created_at?: string
          description?: string | null
          engagement_metrics?: Json | null
          hashtags?: string[] | null
          id?: string
          platform?: Database["public"]["Enums"]["social_platform"]
          points_earned?: number | null
          reach?: number | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "social_media_shares_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_shares: {
        Row: {
          created_at: string
          id: string
          platform: string
          referral_code: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          platform: string
          referral_code: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          referral_code?: string
          user_id?: string | null
        }
        Relationships: []
      }
      sponsorships: {
        Row: {
          amount: number
          created_at: string
          id: string
          message: string | null
          phone_number: string | null
          sponsor_email: string | null
          sponsor_name: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          message?: string | null
          phone_number?: string | null
          sponsor_email?: string | null
          sponsor_name?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          message?: string | null
          phone_number?: string | null
          sponsor_email?: string | null
          sponsor_name?: string | null
          status?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          completed_at: string | null
          created_at: string
          id: string
          progress: number
          user_id: string
        }
        Insert: {
          achievement_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          progress?: number
          user_id: string
        }
        Update: {
          achievement_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          progress?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed_at: string
          created_at: string
          id: string
          points_earned: number
          status: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string
          created_at?: string
          id?: string
          points_earned: number
          status?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string
          created_at?: string
          id?: string
          points_earned?: number
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          achievements_count: number | null
          created_at: string
          current_tier: Database["public"]["Enums"]["engagement_tier"] | null
          id: string
          level: number | null
          quiz_points: number | null
          referral_points: number | null
          total_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements_count?: number | null
          created_at?: string
          current_tier?: Database["public"]["Enums"]["engagement_tier"] | null
          id?: string
          level?: number | null
          quiz_points?: number | null
          referral_points?: number | null
          total_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements_count?: number | null
          created_at?: string
          current_tier?: Database["public"]["Enums"]["engagement_tier"] | null
          id?: string
          level?: number | null
          quiz_points?: number | null
          referral_points?: number | null
          total_points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_points_profiles"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_quiz_attempts: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          quiz_id: string
          score: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          quiz_id: string
          score?: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          quiz_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_uploads: {
        Row: {
          created_at: string
          description: string | null
          engagement_metrics: Json | null
          id: string
          media_type: string
          media_url: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          engagement_metrics?: Json | null
          id?: string
          media_type: string
          media_url: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          engagement_metrics?: Json | null
          id?: string
          media_type?: string
          media_url?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          availability: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          skills: string[] | null
          user_id: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      voter_education: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      achievement_category:
        | "sharing"
        | "referral"
        | "engagement"
        | "quiz"
        | "content_creation"
      engagement_tier: "bronze" | "silver" | "gold" | "platinum"
      message_status: "sent" | "delivered" | "read"
      social_platform: "facebook" | "tiktok" | "instagram" | "twitter"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
