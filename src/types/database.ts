// ============================================================
// CareerConnect - Database Type Definitions
// Generated from schema: sql/001_schema.sql
// ============================================================

export interface Seeker {
  id: string;
  auth_user_id: string;
  nickname: string;
  avatar_url: string | null;
  carrier_experience: string;
  experience_years: string | null;
  current_role: string | null;
  specialties: string[];
  qualifications: string[];
  monthly_sales: number | null;
  work_area: string | null;
  pain_points: string | null;
  is_open_to_scout: boolean;
  profile_visibility: 'public' | 'companies_only' | 'private';
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  auth_user_id: string;
  company_name: string;
  logo_url: string | null;
  cover_image_url: string | null;
  carrier: string;
  area: string | null;
  shop_count: number | null;
  employee_count: number | null;
  is_verified: boolean;
  verification_rank: string | null;
  average_tenure: number | null;
  turnover_rate: number | null;
  overtime_hours: number | null;
  allowance_rate: number | null;
  description: string | null;
  career_path: string | null;
  salary_model: string | null;
  benefits: string | null;
  is_hiring: boolean;
  hiring_positions: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  seeker_id: string;
  category: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  hashtags: string[];
  expires_at: string;
  is_pinned: boolean;
  created_at: string;
}

// 企業向け匿名ビュー（seeker_idが見えない）
export interface AnonymousPost {
  id: string;
  nickname: string;
  avatar_url: string | null;
  category: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  hashtags: string[];
  expires_at: string;
  is_pinned: boolean;
  created_at: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  seeker_id: string;
  created_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  seeker_id: string;
  content: string;
  created_at: string;
}

export interface Message {
  id: string;
  company_id: string;
  seeker_id: string;
  sender_type: 'company' | 'seeker';
  content: string;
  sign_on_bonus: number | null;
  offered_position: string | null;
  offered_salary_range: string | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_seeker_id: string | null;
  following_company_id: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  target_seeker_id: string | null;
  target_company_id: string | null;
  notification_type: 'like' | 'comment' | 'follow' | 'scout' | 'message';
  content: string;
  reference_id: string | null;
  is_read: boolean;
  created_at: string;
}

// 企業向け求職者ビュー（pain_pointsが見えない）
export interface SeekerForCompanies {
  id: string;
  nickname: string;
  avatar_url: string | null;
  carrier_experience: string;
  experience_years: string | null;
  current_role: string | null;
  specialties: string[];
  qualifications: string[];
  monthly_sales: number | null;
  work_area: string | null;
  bio: string | null;
  is_open_to_scout: boolean;
  profile_visibility: string;
  created_at: string;
}

// ============================================================
// Supabase Database type definition
// ============================================================
export interface Database {
  public: {
    Tables: {
      seekers: { Row: Seeker; Insert: Omit<Seeker, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Seeker, 'id' | 'created_at' | 'updated_at'>>; };
      companies: { Row: Company; Insert: Omit<Company, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>; };
      posts: { Row: Post; Insert: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'expires_at'>; Update: Partial<Omit<Post, 'id' | 'created_at'>>; };
      post_likes: { Row: PostLike; Insert: Omit<PostLike, 'id' | 'created_at'>; Update: never; };
      post_comments: { Row: PostComment; Insert: Omit<PostComment, 'id' | 'created_at'>; Update: never; };
      messages: { Row: Message; Insert: Omit<Message, 'id' | 'created_at' | 'is_read' | 'read_at'>; Update: Partial<Pick<Message, 'is_read'>>; };
      follows: { Row: Follow; Insert: Omit<Follow, 'id' | 'created_at'>; Update: never; };
      notifications: { Row: Notification; Insert: Omit<Notification, 'id' | 'created_at' | 'is_read'>; Update: Partial<Pick<Notification, 'is_read'>>; };
    };
    Views: {
      v_posts_anonymous: { Row: AnonymousPost; };
      v_seekers_for_companies: { Row: SeekerForCompanies; };
    };
  };
}

// ============================================================
// App-level types
// ============================================================
export type UserType = 'seeker' | 'company';

export interface AppUser {
  id: string;
  type: UserType;
  profile: Seeker | Company;
}

export const POST_CATEGORIES = [
  '愚痴',
  'ノウハウ',
  '質問',
  '成果報告',
  '業界ニュース',
  '転職相談',
] as const;

export type PostCategory = typeof POST_CATEGORIES[number];

export const CARRIERS = ['docomo', 'au', 'SoftBank', '楽天モバイル', 'MVNO'] as const;
export type Carrier = typeof CARRIERS[number];

export const ROLES = ['スタッフ', 'リーダー', '副店長', '店長', 'エリアマネージャー'] as const;
export type Role = typeof ROLES[number];

export const SPECIALTIES = [
  '新規獲得', 'MNP', '機種変更', '光回線', '法人営業',
  'クレカ獲得', '保険', 'NISA', 'でんき', 'ふるさと納税',
] as const;
export type Specialty = typeof SPECIALTIES[number];
