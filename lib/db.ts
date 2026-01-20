import { createServerSupabaseClient } from "./supabase/server";
import type { Service, SiteSettings, Image, User } from "./types";

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }
    return (data as Service[]) || [];
  } catch (error) {
    console.error("Error in getServices:", error);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching site settings:", error);
      return null;
    }
    return (data as SiteSettings | null) || null;
  } catch (error) {
    console.error("Error in getSiteSettings:", error);
    return null;
  }
}

export async function getImages(section?: string): Promise<Image[]> {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from("images")
      .select("*")
      .order("order", { ascending: true });

    if (section) {
      query = query.eq("section", section);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching images:", error);
      return [];
    }
    return (data as Image[]) || [];
  } catch (error) {
    console.error("Error in getImages:", error);
    return [];
  }
}

export async function checkAdminAccess(userId: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data) return false;
  return (data as User).role === "admin";
}
