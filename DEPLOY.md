# Deploy Sofaine Robot to Vercel (with Supabase Postgres)

This guide walks you through setting up a free Supabase database, connecting it to your Next.js app, and deploying to Vercel.

---

## Prerequisites

- GitHub account
- Vercel account (vercel.com)
- Supabase account (supabase.com)
- The `@sofainerobot` project pushed to a GitHub repository

---

## Step 1: Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or sign up).
2. Click **"New Project"**.
3. Choose your organization, enter a project name (e.g. `sofainerobot`), and set a database password. **Save this password** — you'll need it for the connection string.
4. Select a region close to your users.
5. Click **"Create new project"** and wait for it to be provisioned (~1–2 minutes).

## Step 2: Get the Supabase connection string

1. In the Supabase dashboard, go to **Settings → Database**.
2. Under **Connection string**, find **Connection string (pooled)** / **URI**.
3. Copy it. It looks like:

   ```
   postgresql://postgres.xxxxxxxx:YOUR_PASSWORD@db.xxxxxxxx.supabase.co:6543/postgres?pgbouncer=true
   ```

   - Use the **pooled** (port 6543) connection string — this is required for serverless platforms like Vercel.
   - Replace `YOUR_PASSWORD` with the database password you set in Step 1.
   - Keep `?pgbouncer=true` at the end.

## Step 3: Add environment variables locally

Edit `.env` (already git-ignored) and replace the placeholder `DATABASE_URL`:

```env
# Admin panel credentials
ADMIN_PASSWORD=sofaine_admin_2026
ADMIN_SESSION_SECRET=sofaine-change-me-in-production

# Cloud database (Supabase Postgres) — paste your pooled connection string here
DATABASE_URL="postgresql://postgres.xxxxxxxx:YOUR_PASSWORD@db.xxxxxxxx.supabase.co:6543/postgres?pgbouncer=true"

# Site URL
NEXTAUTH_URL=https://your-vercel-app.vercel.app   # update after Vercel deploy
```

## Step 4: Push the schema and seed the database

Run these commands locally (or in your CI) to create the tables and seed default content:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase (creates tables)
npx prisma db push

# Seed default Hero, FAQs, and Social Links
npx prisma db seed
```

After this, your Supabase database contains the initial site content. You can verify in the Supabase dashboard under **Table Editor**.

> Note: `prisma db push` is used instead of `prisma migrate` for simplicity during initial setup. For future schema changes, use `prisma migrate dev` and `prisma migrate deploy`.

## Step 5: Push code to GitHub

```bash
git add .
git commit -m "Add Supabase/Prisma database and admin panel"
git push origin main   # or your default branch
```

## Step 6: Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts:
- Set up and deploy? → **Yes**
- Which scope? → your account
- Link to existing project? → **No** (create new)
- Project name → `sofainerobot`
- Directory → `./`
- Want to override settings? → **No**

### Option B: Vercel Dashboard (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **"Add New Project"**.
3. Import your `sofainerobot` GitHub repository.
4. Framework preset is detected as **Next.js**.
5. Under **Environment Variables**, add these (copy from your local `.env`):
   - `DATABASE_URL` = your Supabase pooled connection string
   - `ADMIN_PASSWORD` = `sofainerobot_2026` (or your chosen password)
   - `ADMIN_SESSION_SECRET` = a random secret string
   - `NEXTAUTH_URL` = `https://your-app.vercel.app` (update after first deploy)
6. Click **Deploy**.

## Step 7: Run `prisma db push` on Vercel (one-time)

Vercel builds your app but does not automatically create database tables. After your first successful deploy, initialize the production database:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel
vercel login

# Link your project
vercel link   # select your sofainerobot project

# Run prisma db push in the Vercel environment
vercel env pull .env   # optional: sync env vars locally
npx prisma db push
```

Alternatively, add a **post-install build step** in `package.json` so tables are created on every deploy:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "postinstall": "prisma generate",
  "start": "next start"
}
```

Then in the Vercel dashboard, under **Settings → Build & Development Settings**, ensure the **Install Command** includes `npx prisma generate && npx prisma db push` (or run `prisma db push` once manually in production via `vercel` CLI).

> Tip: The cleanest production flow is to run `npx prisma migrate deploy` after each schema change via the Vercel CLI.

## Step 8: Update NEXTAUTH_URL

Once Vercel gives you your live URL (e.g. `https://sofainerobot.vercel.app`), add/update `NEXTAUTH_URL` in the Vercel project settings under **Environment Variables**, then redeploy.

## Step 9: Access your admin panel

- Live site: `https://your-app.vercel.app`
- Admin login: `https://your-app.vercel.app/admin/login`
  - Password: whatever you set in `ADMIN_PASSWORD` (default `sofaine_admin_2026`)
- Admin dashboard: `https://your-app.vercel.app/admin/dashboard`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `DATABASE_URL` missing / connection refused | Double-check you copied the **pooled** connection string (port 6543) and replaced the password. |
| Tables don't exist in production | Run `npx prisma db push` via the Vercel CLI after linking your project. |
| Admin login redirects back to login | Make sure `ADMIN_PASSWORD` is set identically in Vercel env vars and your local `.env`. |
| Prisma engine architecture error locally | Ignore locally (Termux ARM vs Prisma x86). It works on Vercel (x86_64). |

---

## Files changed for the database migration

- `prisma/schema.prisma` — data models (HeroSettings, FAQ, SocialLink)
- `prisma/seed.ts` — default content seed script
- `src/lib/prisma.ts` — Prisma Client singleton
- `src/lib/db.ts` — database access layer (replaced lowdb JSON file)
- `src/lib/actions.ts` — Server Actions now write to Supabase via Prisma
- `src/app/page.tsx` — fetches Hero/FAQ/Social from Supabase
- `src/app/admin/dashboard/page.tsx` — fetches from Supabase
- `.env` / `.env.example` — added `DATABASE_URL`
