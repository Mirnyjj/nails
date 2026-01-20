import { Database } from './supabase/database.types';

// Service types
export type Service = Database['public']['Tables']['services']['Row'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];

// Image types
export type Image = Database['public']['Tables']['images']['Row'];
export type ImageInsert = Database['public']['Tables']['images']['Insert'];
export type ImageUpdate = Database['public']['Tables']['images']['Update'];

// Site Settings types
export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];
export type SiteSettingsInsert = Database['public']['Tables']['site_settings']['Insert'];
export type SiteSettingsUpdate = Database['public']['Tables']['site_settings']['Update'];

// User types
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];
