# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Copy and run `supabase/migrations/001_initial_schema.sql`

### 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get these from: Supabase Dashboard → Settings → API

### 4. Create Admin User

**Option A: Via Supabase Dashboard**

1. Go to Authentication → Users
2. Create new user with email/password
3. Note the User ID

**Option B: Via SQL**

```sql
-- After creating auth user, link to users table:
INSERT INTO public.users (id, email, role)
VALUES ('user-id-from-auth', 'admin@example.com', 'admin');
```

### 5. Run Development Server

```bash
npm run dev
```

Visit:

- Landing: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## Storage Setup (for Background Uploads)

1. Go to Supabase Dashboard → Storage
2. Create bucket: `backgrounds` (public)
3. Create bucket: `images` (public)
4. Set up policies to allow authenticated admin uploads

## Production Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Troubleshooting

### Admin Login Not Working

- Check user exists in `auth.users`
- Check user has `role = 'admin'` in `public.users`
- Verify RLS policies are set correctly

### Images Not Loading

- Check Supabase Storage buckets exist
- Verify bucket policies allow public read
- Check image URLs in database

### Background Not Showing

- Verify `background_gif_url` in `site_settings`
- Check file is uploaded to Supabase Storage
- Verify Storage bucket is public

## Next Steps

1. Complete ImagesManager component (similar to ServicesManager)
2. Complete SettingsManager component
3. Add image upload functionality
4. Connect contact form to Supabase
5. Add i18n support (optional)
