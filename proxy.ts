// app/proxy.ts
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  if (
    request.headers.get("x-proxy-ignore") ||
    request.nextUrl.searchParams.has("_rsc") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string) {
        response.cookies.set(name, value);
      },
      remove(name: string) {
        response.cookies.set(name, "");
      },
    },
  });

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (request.nextUrl.pathname === "/admin/login") {
      if (user) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return response;
    }

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!userData?.role || userData.role !== "admin") {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
