# Bassist Barry Music Academy (BBMA)

A full-stack music course enrollment platform built with Next.js 16 App Router, Tailwind CSS v4, Supabase, Paystack, and Nodemailer. Students can browse courses, register, make payments, receive ebooks by email, and access tier-gated video content on a personal dashboard.

**Live:** [bassistbarrymusicacademy.vercel.app](https://bassistbarrymusicacademy.vercel.app)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Payment Flow](#payment-flow)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Known Gotchas & Lessons Learned](#known-gotchas--lessons-learned)
- [Challenges & Solutions](#challenges--solutions)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Database & Auth | Supabase (PostgreSQL + Auth + Storage + RLS) |
| Payments | Paystack (server-side verification + webhooks) |
| Email | Nodemailer + Gmail SMTP |
| Fonts | Fraunces, Karla, Space Mono (via `next/font/google`) |
| Deployment | Vercel |

---

## Features

### Public Pages
- **Home** - Hero slideshow, Meet Barry section, course tier preview, testimonials carousel, CTA, footer
- **About** - Barry's story timeline, credentials, vision/mission/values
- **Courses** - Detailed tier breakdown, how it works, FAQ accordion
- **Contact** - Contact form with real-time validation, contact info, social links

### Auth System
- Global auth modal (login / signup / forgot password) using Context API + `useReducer`
- No separate auth pages - everything lives in a modal overlay
- Real-time form validation - required fields, password match, error clearing on keystroke
- Forgot password flow sends a reset link via Supabase Auth
- Password reset page at `/auth/reset-password`
- Auth-aware navbar - shows avatar with initials + greeting when logged in, dropdown with name/email/dashboard/logout
- `onAuthStateChange` listener keeps navbar in sync without manual state passing

### Payments
- Paystack integration with server-side initialization and verification
- Prices always fetched from the database — never trusted from the client
- Pending payment record created before redirect to Paystack
- Server-side verification via Paystack API after redirect
- Webhook handler with HMAC-SHA512 signature verification as a safety net
- Replay attack protection — duplicate payment references are detected and rejected
- Payment status tracked: `pending` → `success` / `failed`

### Ebook Delivery
- Nodemailer + Gmail SMTP sends branded HTML email after payment confirmation
- Ebooks stored in a **private** Supabase Storage bucket
- 24-hour signed URL generated per delivery — expires after download window
- Non-blocking email send — doesn't delay the user's redirect to dashboard

### Dashboard
- Protected route — unauthenticated users redirected to home
- Shows free welcome video to all registered users
- Shows tier-gated video content based on enrollment
- Shows locked placeholder cards to unenrolled users with CTA to enroll
- Enrollment status card with active tier and enrollment date
- Payment success/failed/already-processed banner on redirect

### Database Security
- Row Level Security (RLS) on all tables
- Content gated at database level — not just UI hiding
- Users can only read/write their own data
- Materials policy uses tier rank comparison — Advanced students access all lower-tier content too
- Admin client (service role key) used only in server-side API routes

---

## Project Structure

```
src/
  app/
    api/
      paystack/
        initialize/route.js   ← creates pending payment, initializes Paystack
        verify/route.js       ← verifies payment server-side, creates enrollment
        webhook/route.js      ← Paystack webhook with HMAC verification
    auth/
      reset-password/page.js  ← password reset landing page
    components/
      about/                  ← AboutHero, BarryStory, BarryCredentials, BarryMission, AboutCTA
      contact/                ← ContactHero, ContactForm, ContactInfo
      courses/                ← CoursesHero, CoursesOverview, CoursesTiers, CoursesProcess, CoursesFAQ, CoursesCTA
      home/                   ← HeroSection, MeetBarry, CoursesPreview, WhyChooseBBMA, Testimonials, FinalCTA
      AuthModal.jsx           ← login / signup / forgot password modal
      AuthModalContext.jsx    ← global modal state via Context API
      Footer.jsx
      LogoutButton.jsx
      Navbar.jsx
      SplashScreen.jsx        ← animated SVG bass guitar on first visit
    context/
      AuthModalContext.jsx
    dashboard/
      page.js                 ← protected dashboard with tier-gated content
    lib/
      supabase.js             ← browser client (createBrowserClient)
      supabase.server.js      ← server client with cookie handling
      supabase.admin.js       ← admin client with service role key (bypasses RLS)
      sendEbookEmail.js       ← Nodemailer Gmail ebook delivery
    about/page.js
    contact/page.js
    courses/page.js
    page.js                   ← homepage
    layout.js
    globals.css               ← Tailwind v4 @theme tokens
```

---

## Database Schema

### Tables

```sql
profiles          -- one-to-one with auth.users, auto-created by trigger
enrollments       -- links users to tiers, status: active/inactive
payments          -- audit trail for every Paystack transaction
tiers             -- seeded with Beginner/Intermediate/Advanced
materials         -- videos and ebooks, gated by tier rank or is_free flag
```

### Tier Ranks

| Tier | Rank | Price |
|---|---|---|
| Beginner | 1 | ₦15,000 |
| Intermediate | 2 | ₦25,000 |
| Advanced | 3 | ₦40,000 |

Higher rank unlocks all lower-rank content — an Advanced student sees Beginner and Intermediate materials too.

### Key RLS Policy (Materials)

```sql
-- Paid materials: only accessible if user has an enrollment
-- whose tier rank >= the material's tier rank
create policy "Paid materials visible to enrolled users"
  on public.materials for select
  using (
    auth.uid() is not null
    and exists (
      select 1
      from enrollments e
      join tiers et on et.id = e.tier_id
      join tiers mt on mt.id = materials.tier_id
      where e.user_id = auth.uid()
      and e.status = 'active'
      and et.rank >= mt.rank
    )
  );
```

### Auto-Profile Trigger

```sql
-- Automatically creates a profile row when a new user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## Payment Flow

```
User clicks Enroll
      ↓
Server checks auth + fetches tier price from DB
      ↓
Server creates PENDING payment record
      ↓
Server initializes Paystack transaction
      ↓
User redirected to Paystack checkout
      ↓
User pays (card / bank transfer / USSD)
      ↓
┌─────────────────────────────────────────┐
│  Two parallel paths (both idempotent)   │
│                                         │
│  Browser redirect →  /api/paystack/verify    │
│  Paystack webhook →  /api/paystack/webhook   │
└─────────────────────────────────────────┘
      ↓
Server verifies with Paystack API (server-to-server)
      ↓
Replay attack check (reference already success?)
      ↓
Payment updated to SUCCESS
      ↓
Enrollment created
      ↓
Ebook email sent via Gmail (non-blocking)
      ↓
User redirected to /dashboard?payment=success
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Paystack
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

# App
NEXT_PUBLIC_APP_URL=https://bassistbarrymusicacademy.vercel.app

# Email (Gmail SMTP via Nodemailer)
GMAIL_USER=
GMAIL_APP_PASSWORD=
```

All variables must be added to Vercel → Settings → Environment Variables. After adding, redeploy — env changes don't apply to existing builds automatically.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/AghoghoOgbotor18/bassistbarrymusicacademy.git
cd bassistbarrymusicacademy

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Known Gotchas & Lessons Learned

### 1. Windows Git Case Sensitivity vs Vercel (Linux)
**Problem:** Folder names like `About/`, `Contact/`, `Dashboard/` work fine on Windows (case-insensitive filesystem) but cause 404s on Vercel which runs Linux (case-sensitive). Same issue applies to file extensions — `hero1.JPG` vs `hero1.jpg`.

**Fix:** Rename through git using a two-step rename via a temp name:
```bash
git mv src/app/About src/app/about-temp
git mv src/app/about-temp src/app/about
```
Direct case-only renames are invisible to git on Windows — the temp step forces git to register the change.

### 2. Next.js 16 — `middleware.js` Renamed to `proxy.ts`
**Problem:** Next.js 16 deprecated `middleware.js` in favour of `proxy.ts`. The old file caused `fetch failed` errors in the Edge Runtime when trying to call Supabase.

**Fix:** Rename `src/middleware.js` → `src/proxy.ts` and export `proxy` instead of `middleware`. Also scope the matcher to only `/dashboard/:path*` to prevent it running on API routes.

### 3. Supabase Admin Client — Missing `autoRefreshToken: false`
**Problem:** The admin client (service role key) sometimes behaved like a regular user client, causing RLS violations on server-side inserts.

**Fix:** Always initialize the admin client with:
```js
createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false }
})
```

### 4. `export default` Missing on Helper Components
**Problem:** Components like `MaterialCard`, `LockedCard`, `PaymentBanner`, and `ErrorModal` were defined in the dashboard file without `export default`, then imported in other files — causing build failures and "module not found" errors.

**Fix:** Any component defined in its own file and imported elsewhere must have `export default`. Components defined and used in the same file don't need it.

### 5. `useSearchParams` Requires Suspense in App Router
**Problem:** The dashboard page used `useSearchParams()` to read `?payment=success` from the URL. This caused a prerender error at build time: `Error occurred prerendering page "/dashboard"`.

**Fix:** Extract the `useSearchParams` logic into a separate `PaymentBanner` component and wrap it in `<Suspense fallback={null}>`:
```jsx
<Suspense fallback={null}>
  <PaymentBanner />
</Suspense>
```

### 6. Paystack Prices Must Come From the Database
**Problem:** If the price is sent from the client (browser) to the initialize API, a user could manipulate it in devtools and pay any amount they choose.

**Fix:** The initialize route ignores any price from the request body. It fetches the tier by `slug` from the database and uses the price stored there. The client only sends `tierSlug` — nothing financially sensitive.

### 7. Webhook Must Always Return 200
**Problem:** If the webhook returns a non-200 status, Paystack retries it repeatedly for hours, potentially creating duplicate enrollments.

**Fix:** The webhook handler always returns `{ received: true }` with a 200 status — even on errors. Errors are logged internally for investigation. The replay attack check prevents duplicate processing if the webhook fires after the redirect already succeeded.

### 8. `next/router` vs `next/navigation`
**Problem:** VS Code autocomplete often suggests `next/router` (Pages Router) when you type `useRouter` or `usePathname`. In the App Router, this causes: `NextRouter was not mounted`.

**Fix:** Always import from `next/navigation` in App Router projects:
```js
import { useRouter, usePathname } from "next/navigation";
import { useRouter } from "next/router"; // Pages Router only
```

### 9. Supabase Environment Variables Not on Vercel
**Problem:** `.env.local` is git-ignored (correctly), so Vercel never sees the variables. Build fails with `URL and API key are required`.

**Fix:** Every variable in `.env.local` must be manually added in Vercel → Settings → Environment Variables. After adding, trigger a redeploy — existing deployments don't pick up new variables automatically.

### 10. Tailwind v4 Uses CSS-First Theming
**Problem:** `tailwind.config.js` theme extensions (like custom colors) don't work in Tailwind v4 the same way as v3.

**Fix:** All custom tokens go in `globals.css` inside `@theme {}`:
```css
@theme {
  --color-ebony: #1b130d;
  --color-maple: #d9a246;
}
```
This makes `bg-ebony`, `text-maple` etc. available as Tailwind utility classes automatically. No `tailwind.config.js` needed for theme tokens in v4.

### 11. `next/image` with `fill` Needs a Positioned Parent
**Problem:** Images using `fill` prop render as zero height if the parent doesn't have `position: relative` and a defined height.

**Fix:** Always wrap `fill` images in a parent with `relative` and either a fixed height or an aspect ratio class:
```jsx
<div className="relative aspect-video"> {/* or h-screen, etc. */}
  <Image src="..." fill className="object-cover" />
</div>
```

### 12. Rules of Hooks — No Early Returns Before Hook Calls
**Problem:** `AuthModal` had `if (!open) return null` before `useState` and `useReducer` calls. React threw "Rendered fewer hooks than expected" when the modal tried to open.

**Fix:** All hooks must be called unconditionally at the top of the component, before any conditional returns:
```jsx
// correct
const [error, setError] = useState(null);
const [formData, dispatch] = useReducer(formReducer, initialState);
if (!open) return null; // ← early return AFTER all hooks
```

### 13. `tierId` Type Mismatch from Paystack Metadata
**Problem:** Metadata values stored in Paystack come back as strings (`"1"`, `"2"`, `"3"`). The `tiers` table uses integer IDs. Direct comparison or lookup fails silently.

**Fix:** Always `parseInt(tierId)` when reading from Paystack metadata before using it for database operations or object lookups:
```js
tier_id: parseInt(tierId),
const ebook = ebookFiles[parseInt(tierId)];
```

---

## Challenges & Solutions

### Challenge 1 - Building a Content Gate That Can't Be Bypassed
Simply hiding buttons in the UI is not security. A user who knows the API can call Supabase directly and read any row.

**Solution:** Supabase Row Level Security policies enforce access at the database level. The materials policy joins enrollments → tiers and checks `et.rank >= mt.rank` on every query. Even a direct API call with the anon key returns nothing for content the user isn't enrolled in.

### Challenge 2 - Payment Verification Security
If you verify payments client-side, anyone can fake a successful response in the browser.

**Solution:** The client never makes any trust decisions about payment success. The verify route calls Paystack's API server-to-server using the secret key. The client just provides a reference string — all decision-making happens on the server.

### Challenge 3 - Ebook Security
Storing ebooks in `public/` means anyone who knows the URL can access them without paying.

**Solution:** Ebooks live in a private Supabase Storage bucket. After payment is confirmed, the server generates a time-limited signed URL (24 hours) and emails it. The URL is unique per delivery and stops working after 24 hours. The underlying file path is never exposed to the client.

### Challenge 4 - Missed Payments (Browser Tab Closed)
If a user pays on Paystack but closes the browser before the redirect completes, the verify route never runs and the enrollment is never created.

**Solution:** A Paystack webhook runs server-to-server independently of the browser. Both the redirect route and the webhook can create the enrollment — but the replay attack check (querying `payments` for an existing `success` status) ensures only one enrollment is ever created, even if both fire.

### Challenge 5 - Next.js App Router Learning Curve
First time using Next.js App Router - concepts like Server Components, `"use client"`, `cookies()` API, and route handlers are all different from Vite/CRA.

**Solution:** Built understanding incrementally, started with static pages, then added client components for interactivity, then server-side API routes for payments. The key mental model: Server Components by default, opt into `"use client"` only when you need `useState`, `onClick`, or browser APIs.

---

## Future Improvements

- [ ] Add a custom domain and switch email to Resend with branded sender
- [ ] Admin dashboard for Barry to upload new materials without touching code
- [ ] Framer Motion animations across all page sections
- [ ] Email resend functionality for students who didn't receive their ebook
- [ ] Course progress tracking on the dashboard
- [ ] Paystack live keys for production payments