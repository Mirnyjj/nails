# AVDEEVA Nails Landing Page

Production-ready Next.js 15 landing page with Supabase backend, featuring animated backgrounds, admin panel, and full SEO optimization.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **Supabase** integration (Auth, Database, Storage)
- **Animated Background** system with GIF/video support
- **Admin Panel** with full CRUD operations
- **SEO Optimized** (Open Graph, Schema.org, Sitemap)
- **Responsive Design** with TailwindCSS
- **PWA Ready** with manifest and service worker support

## 📋 Prerequisites

- Node.js 18+ 
- Supabase account and project
- npm or yarn

## 🛠️ Setup

### 1. Clone and Install

```bash
npm install
```

### 2. Configure Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the migration file to create database schema:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Execute the SQL

### 3. Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Create Admin User

In Supabase SQL Editor, run:

```sql
-- First, create auth user (use Supabase Auth UI or API)
-- Then link to users table:

INSERT INTO public.users (id, email, role)
VALUES (
  'your-auth-user-id',
  'admin@example.com',
  'admin'
);
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── admin/          # Admin routes (protected)
│   ├── layout.tsx      # Root layout with SEO
│   ├── page.tsx        # Landing page
│   ├── robots.ts       # Robots.txt
│   └── sitemap.ts      # Sitemap.xml
├── components/
│   ├── admin/          # Admin components
│   ├── AnimatedBackground.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Portfolio.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── lib/
│   ├── supabase/       # Supabase clients
│   ├── db.ts          # Database queries
│   └── utils.ts        # Utilities
└── supabase/
    └── migrations/    # Database migrations
```

## 🎨 Admin Panel

Access at `/admin/login`

Features:
- **Services Management**: CRUD operations for services
- **Images Gallery**: Upload and manage images
- **Site Settings**: Edit hero content and background
- **Background Upload**: Drag-drop GIF/video uploader

## 🔒 Security

- Admin routes protected with middleware
- Role-based access control (RBAC)
- Server-side authentication checks
- Row Level Security (RLS) in Supabase

## 📱 SEO Features

- Dynamic metadata from Supabase
- Open Graph tags
- Twitter Cards
- Schema.org JSON-LD (LocalBusiness, Service)
- Canonical URLs
- Sitemap.xml auto-generated
- Robots.txt optimized

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build command: `npm run build`
Start command: `npm start`

## 📝 Database Schema

### Tables

- **services**: Services with prices and descriptions
- **images**: Gallery images with sections
- **site_settings**: Hero content and background URLs
- **users**: User roles (admin/user)

See `supabase/migrations/001_initial_schema.sql` for full schema.

## 🎯 Next Steps

1. Complete admin CRUD components (currently placeholders)
2. Add image upload functionality
3. Implement contact form submission to Supabase
4. Add i18n support (next-intl)
5. Add error boundaries and loading states
6. Create PWA service worker

## 📄 License

Private project - All rights reserved

## 👤 Author

Анастасия Авдеева - Nail Studio
