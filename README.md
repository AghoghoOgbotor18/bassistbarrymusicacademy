# Bassist Barry Music Academy (BBMA)

A production-grade full-stack music course enrollment platform built with Next.js 16 App Router, Tailwind CSS v4, Supabase, Paystack, and Nodemailer. Students browse three course tiers, register, pay via Paystack, receive exclusive ebooks by email (permanent download link), and access tier-gated video content and downloadable ebooks on a personal dashboard. Instructor receives enrollment notifications including a one-on-one scheduling alert for Advanced students.

**Live:** [bassistbarrymusicacademy.vercel.app](https://bassistbarrymusicacademy.vercel.app)
**Repo:** [github.com/AghoghoOgbotor18/bassistbarrymusicacademy](https://github.com/AghoghoOgbotor18/bassistbarrymusicacademy)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture Decisions](#architecture-decisions)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Payment Flow](#payment-flow)
- [Email System](#email-system)
- [Security Model](#security-model)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Known Gotchas & Lessons Learned](#known-gotchas--lessons-learned)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server Components, route handlers, cookie-based session handling |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | No config file needed, custom tokens via `@theme` |
| Animations | Framer Motion | Scroll-triggered animations, staggered card reveals |
| Database & Auth | Supabase (PostgreSQL + Auth + Storage + RLS) | One platform for DB, auth, file storage, and row-level security |
| Payments | Paystack | Nigerian payment gateway — cards, bank transfer, USSD |
| Email | Nodemailer + Gmail SMTP | Sends to any email address without domain verification |
| Video Hosting | Cloudinary + YouTube (unlisted) | Cloudinary for intro video, YouTube embeds for course lessons |
| Fonts | Fraunces, Karla, Space Mono (`next/font/google`) | Auto-optimised, zero layout shift |
| Deployment | Vercel | Auto-deploys from GitHub, serverless functions |

---

## Features

### Public Pages
- **Home** — Hero crossfade slideshow, Meet Barry bio, intro video (Cloudinary, autoplay-on-scroll with mobile sound controls), course tier preview with direct payment CTA, testimonials carousel (1/2/3 cards by breakpoint, auto-advance), Why Choose BBMA, Final CTA, footer
- **About** — Barry's story timeline, credentials stats, vision/mission/values, CTA
- **Courses** — Detailed tier breakdown with outcome cards, how-it-works process, FAQ accordion, error modal on payment failure
- **Contact** — Real-time validated form wired to Gmail via Nodemailer, contact info cards, social links
- **Splash Screen** — Animated SVG bass guitar draws itself stroke by stroke on first visit using CSS `stroke-dashoffset` animation, stored in `sessionStorage` so it only plays once per session
- **Framer Motion animations** — Scroll-triggered fadeUp, stagger, and directional slide animations across all pages

### Auth System
- Global auth modal (login / signup / forgot password) using Context API + `useReducer` — no separate auth pages
- Real-time form validation — required fields, live password match checking, error clears on keystroke
- Password visibility toggle (eye icon) on all password inputs including the reset page
- `touched` state resets on mode switch — no stale "required" errors when switching between login and signup
- Forgot password with 60-second client-side cooldown and auto-switch back to login after success
- Auth-aware navbar — avatar with initials, "Hi, [firstName]" greeting, dropdown with name/email/dashboard/logout
- `onAuthStateChange` listener keeps navbar in sync without page reload
- Navbar transparent on homepage hero only, always solid on other pages
- Full-screen mobile menu overlay with backdrop blur

### Payments
- Paystack integration with server-side initialization and verification
- Prices always fetched from the database — client sends only `tierSlug`, never a price
- Pending payment record created before redirect — audit trail for abandoned checkouts
- Server-side verification via Paystack API after browser redirect
- Webhook handler with HMAC-SHA512 signature verification as a parallel safety net
- Both verify and webhook routes are fully idempotent — safe to run twice, no duplicate enrollments
- Replay attack protection — reference already marked `success` redirects to success (not "already processed")
- Rate limiting: initialize (5/user/minute), verify (10/IP/minute)
- Idempotency key on Paystack API call (`user_id + tier_id + date`)
- All tier buttons disabled while any payment is initializing — prevents concurrent tier clicks
- Payment error shown as branded modal overlay, not inline text

### Email System
- **Student ebook email** — permanent Supabase Storage signed URL (10-year expiry), branded HTML email in BBMA wood theme
- **Barry notification email** — every enrollment triggers an alert; Advanced tier shows amber banner + scheduling prompt with direct mailto link to student
- **Contact form email** — sends to Barry with `replyTo` set to sender so Barry can reply directly
- All emails `await`ed before redirect/response — Vercel serverless function stays alive until send completes

### Dashboard
- Protected route — unauthenticated users redirected to home
- Enrollment status card with active tier name and date
- Free welcome video (YouTube embed with thumbnail preview) for all registered users
- Tier-gated YouTube video lessons with thumbnail preview, title overlay, and play button
- Single active video at a time — clicking new video auto-pauses the previous one
- Cumulative ebook access — Beginner: 1, Intermediate: 2, Advanced: 3 ebooks
- Ebook download via 2-hour signed URLs from `/api/storage/signed-url` (session-verified)
- Advanced tier one-on-one card with scheduling info instead of video player
- Upgrade CTA for Beginner and Intermediate users showing next tier features and price
- Locked placeholder cards for unenrolled users with enroll CTA
- Payment success/failed banner via `useSearchParams` wrapped in `<Suspense>`

### Database Security
- Row Level Security on all five tables
- Materials policy uses tier rank comparison (`et.rank >= mt.rank`) — gated at DB level
- Admin client (service role key) only in server-side API routes
- Supabase Storage has its own independent policy — service role explicitly granted

---

## Architecture Decisions

### Why two Supabase clients?
- **Browser client** — `"use client"` components, subject to RLS
- **Server client** (`@supabase/ssr`) — API routes and server components, reads HTTP cookies
- **Admin client** (service role) — bypasses RLS, trusted server-only operations only

### Why Nodemailer + Gmail instead of Resend?
Resend's test domain only delivers to the account owner's email. Gmail SMTP works for any recipient without domain verification. When Barry gets a custom domain, switching to Resend is one line change.

### Why YouTube for course videos?
A single 75MB video in Supabase Storage would exhaust the free bandwidth tier in minutes. YouTube (unlisted) handles streaming, quality, and mobile for free. Cloudinary hosts the homepage intro video because it needs autoplay-on-scroll with custom controls.

### Why permanent signed URLs for ebook emails?
Students paid for lifetime access. A 24-hour expiry on an email link means students who revisit the email days later get a broken link — that's a bad experience and creates support burden. The dashboard generates fresh 2-hour URLs per session (still short-lived and secure). The email link is set to 10 years — functionally permanent.

### Why await emails before redirecting?
Vercel serverless functions are killed the moment a response fires. Non-blocking `.catch()` emails never complete. Each email is `await`ed in its own `try/catch` — failure is logged but doesn't block the user.

### Why email Barry for Advanced scheduling instead of a booking tool?
Barry doesn't know his schedule in advance — automated booking tools require constant manual updates. Email notification gives him the student's details and a clear next step. He schedules directly. More flexible, more personal.

### Why in-memory rate limiting instead of Redis?
At current scale, Redis adds infrastructure cost without meaningful benefit. The real protection is idempotency + Paystack's own fraud detection. Trade-off documented: multiple Vercel instances each have their own Map — not globally enforced.

---

## Project Structure

```
src/
  app/
    api/
      contact/route.js              ← contact form email to Barry
      paystack/
        initialize/route.js         ← rate limit, auth, DB price, idempotency, Paystack init
        verify/route.js             ← server-side verify, idempotent enrollment, await emails
        webhook/route.js            ← HMAC-SHA512 verified, idempotent, await emails
      storage/
        signed-url/route.js         ← session-verified 2-hour signed URL for dashboard ebooks
    auth/
      reset-password/page.js        ← password reset with eye icon toggles
    components/
      about/                        ← AboutHero, BarryStory, BarryCredentials, BarryMission, AboutCTA
      contact/                      ← ContactHero, ContactForm (wired to API), ContactInfo
      courses/                      ← CoursesHero, CoursesOverview, CoursesTiers, CoursesProcess, CoursesFAQ, CoursesCTA
      home/                         ← HeroSection, MeetBarry, IntroVideo, CoursesPreview, WhyChooseBBMA, Testimonials, FinalCTA
      DashboardContent/
        MaterialCard.jsx            ← video (YouTube thumbnail) + ebook + 1-on-1 card variants; needs export default
        LockedCard.jsx
        PaymentBanner.jsx           ← useSearchParams wrapped in Suspense
        UpgradeCTA.jsx              ← upgrade prompt for Beginner and Intermediate users
      ui/
        animations.js               ← shared Framer Motion variants
      AuthModal.jsx                 ← login/signup/forgot with eye icons, cooldown, touched reset
      AuthModalContext.jsx
      ErrorModal.jsx
      Footer.jsx
      LogoutButton.jsx
      Navbar.jsx                    ← transparent home only, solid elsewhere, full-screen mobile menu
      SplashScreen.jsx              ← stroke-dashoffset SVG animation, sessionStorage guard
    context/
      AuthModalContext.jsx
    dashboard/
      page.js                       ← protected, activeVideoId state, signed URL generation
    lib/
      supabase.js
      supabase.server.js
      supabase.admin.js             ← autoRefreshToken: false, persistSession: false
      sendEbookEmail.js             ← Nodemailer, 10-year signed URL, branded HTML
      sendBarryNotification.js      ← enrollment alert with Advanced scheduling prompt
    about/page.js
    contact/page.js
    courses/page.js
    page.js
    layout.js
    globals.css                     ← Tailwind v4 @theme color and font tokens
```

---

## Database Schema

### Tables

```sql
profiles      -- one-to-one with auth.users, auto-created by trigger
enrollments   -- links users to tiers; status: active/inactive
payments      -- audit trail; status: pending/success/failed
tiers         -- seeded with Beginner/Intermediate/Advanced + rank
materials     -- videos and ebooks; gated by tier rank or is_free flag
```

### Tier Ranks

| Tier | Rank | Price |
|---|---|---|
| Beginner | 1 | ₦7,000 |
| Intermediate | 2 | ₦14,000 |
| Advanced | 3 | ₦50,000 |

Higher rank unlocks all lower-rank content — Advanced sees all three ebooks and all videos.

### Key RLS Policy — Materials

```sql
create policy "Paid materials visible to enrolled users"
  on public.materials for select
  using (
    auth.uid() is not null
    and exists (
      select 1 from enrollments e
      join tiers et on et.id = e.tier_id
      join tiers mt on mt.id = materials.tier_id
      where e.user_id = auth.uid()
      and e.status = 'active'
      and et.rank >= mt.rank
    )
  );
```

### Supabase Storage Policy

```sql
-- Storage has its own system — separate from database RLS
create policy "Service role can do all on ebook bucket"
on storage.objects for all to service_role
using (bucket_id = 'ebook')
with check (bucket_id = 'ebook');
```

### Auto-Profile Trigger

```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## Payment Flow

```
User clicks Enroll
      ↓
Client checks auth — opens signup modal if not logged in
      ↓
POST /api/paystack/initialize
  • Rate limit (5/user/minute)
  • Verify session (server client)
  • Fetch tier price from DB (never trust client)
  • Check for existing active enrollment
  • Generate idempotency key (user + tier + date)
  • Initialize Paystack
  • Create PENDING payment record
      ↓
Browser redirects to Paystack checkout
      ↓
User pays (card / bank transfer / USSD)
      ↓
┌──────────────────────────────────────────────────┐
│  Two parallel paths — both fully idempotent       │
│  Browser redirect → GET /api/paystack/verify     │
│  Paystack server  → POST /api/paystack/webhook   │
└──────────────────────────────────────────────────┘
Each path:
  • Rate limit check
  • Verify with Paystack API (server-to-server)
  • If already SUCCESS → redirect to ?payment=success (not "already_processed")
  • Update payment to SUCCESS
  • Check enrollment existence before insert
  • await sendEbookEmail(...)
  • await sendBarryNotification(...)
      ↓
/dashboard?payment=success
Dashboard loads → 2-hour signed URLs generated for ebook cards
```

---

## Email System

### Student Ebook Email
- 10-year Supabase Storage signed URL — permanently accessible, no broken links
- Branded HTML email in BBMA wood theme
- Dashboard link included for ongoing content access

### Barry Notification Email
- Every enrollment triggers an alert with student name, email, tier, date
- Advanced tier: amber alert banner + scheduling instructions + direct mailto link
- Non-advanced: "no action needed" message

### Contact Form Email
- Rate limited: 3 messages/IP/10 minutes
- `replyTo` set to sender — Barry hits reply to respond
- Formatted with sender details and message body

---

## Security Model

| Layer | Protection |
|---|---|
| Database RLS | Every table — users only access their own rows |
| Materials RLS | `et.rank >= mt.rank` — content gated at DB, not UI |
| Storage policy | Service role explicitly granted — DB RLS bypass ≠ Storage bypass |
| Payment price | Always from DB server-side — client sends slug only |
| Webhook | HMAC-SHA512 signature — spoofed requests rejected with 401 |
| Replay attacks | Reference checked for existing `success` before processing |
| Idempotency | Enrollment checked before insert — safe to run twice |
| Rate limiting | Init: 5/user/min · Verify: 10/IP/min · Contact: 3/IP/10min |
| Ebook email | 10-year signed URL — permanent access, path never exposed |
| Dashboard ebooks | 2-hour signed URL via session-verified API route |
| Service role key | Never in browser — server API routes only |

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

NEXT_PUBLIC_APP_URL=https://bassistbarrymusicacademy.vercel.app

GMAIL_USER=barry@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
BARRY_EMAIL=barry@gmail.com
```

Add all variables to **Vercel → Settings → Environment Variables**. Redeploy after any change — existing deployments do not pick up new variables automatically.

---

## Getting Started

```bash
git clone https://github.com/AghoghoOgbotor18/bassistbarrymusicacademy.git
cd bassistbarrymusicacademy
npm install
cp .env.example .env.local
# fill in all variables
npm run dev
```

### Supabase Setup
1. Create project → run all schema SQL in SQL Editor
2. Create private storage bucket named `ebook`
3. Run storage policy SQL
4. Upload three PDF ebooks to the `ebook` bucket
5. **Authentication → Rate Limits** — configure password reset limits

### Gmail App Password
1. Enable 2-Step Verification
2. **Google Account → Security → App Passwords** → create for "BBMA"
3. Use the 16-character password as `GMAIL_APP_PASSWORD`

---

## Known Gotchas & Lessons Learned

### 1. Windows Git Case Sensitivity vs Vercel
**Problem:** `About/` works on Windows, 404s on Vercel (Linux). Same for `.JPG` vs `.jpg`.
**Fix:** Two-step rename via temp name — direct case-only rename is invisible to git on Windows.

### 2. Next.js 16 — `middleware.js` → `proxy.ts`
**Problem:** Next.js 16 deprecated `middleware.js`. Caused `fetch failed` in Edge Runtime.
**Fix:** Rename to `src/proxy.ts`, export `proxy`, scope matcher to `/dashboard/:path*` only.

### 3. Supabase Admin Client Needs Auth Options
**Problem:** Admin client sometimes behaved like a regular client — RLS violations on inserts.
**Fix:** `createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })`

### 4. `export default` Missing on Helper Components
**Problem:** Components without `export default` silently resolve to `undefined`. No error shown. Build fails or component renders nothing.
**Fix:** Every component in its own file needs `export default`. Always audit imports when extracting components.

### 5. `useSearchParams` Requires Suspense
**Problem:** `useSearchParams()` in a page causes prerender error at build time.
**Fix:** Extract into child component, wrap with `<Suspense fallback={null}>`.

### 6. Paystack Prices From Client Can Be Manipulated
**Problem:** User could change the price in devtools before the request fires.
**Fix:** Client sends only `tierSlug`. Server fetches the price from DB. Client input ignored.

### 7. Webhook Must Always Return 200
**Problem:** Non-200 causes Paystack to retry for hours, risking duplicate processing.
**Fix:** Always `return NextResponse.json({ received: true })`. Log errors internally. Idempotency prevents duplicates.

### 8. `next/router` vs `next/navigation`
**Problem:** VS Code autocomplete suggests `next/router` — causes `NextRouter was not mounted`.
**Fix:** Always `import { useRouter } from "next/navigation"` in App Router projects.

### 9. Supabase Env Variables Not on Vercel
**Problem:** `.env.local` is git-ignored — Vercel never sees it.
**Fix:** Add every variable manually in Vercel → Settings → Environment Variables. Redeploy after.

### 10. Tailwind v4 CSS-First Theming
**Problem:** `tailwind.config.js` theme extensions don't work in v4.
**Fix:** Put custom tokens in `globals.css` inside `@theme {}`.

### 11. `next/image` with `fill` Needs Positioned Parent
**Problem:** Images with `fill` render zero height without a positioned parent.
**Fix:** Wrap in `<div className="relative aspect-video">`.

### 12. Rules of Hooks — No Early Returns Before Hook Calls
**Problem:** `if (!open) return null` before hooks caused "Rendered fewer hooks than expected".
**Fix:** All hooks at top, early return after all hooks are declared.

### 13. `tierId` Type Mismatch From Paystack Metadata
**Problem:** Paystack metadata returns all values as strings. DB uses integers. Silent failures.
**Fix:** Always `parseInt(tierId)` before DB operations or object lookups.

### 14. Supabase Storage ≠ Database RLS
**Problem:** Service role bypasses DB RLS but NOT Storage policies. Private bucket with 0 storage policies blocks everything — including service role. Fails completely silently. `createSignedUrl` returns null with no error thrown.
**Fix:** Create a dedicated storage policy for the service role on the ebook bucket.

### 15. Ebooks Must Not Live in `public/`
**Problem:** `public/` files accessible to anyone with the URL — no auth required.
**Fix:** Private Supabase Storage bucket + signed URLs generated server-side after session verification.

### 16. `useState` Missing Import in Extracted Components
**Problem:** Extracting `MaterialCard` without checking — `useState` missing, silent crash on render.
**Fix:** Always audit all hook imports when extracting components to their own files.

### 17. Dashboard Signed URLs Need an API Route
**Problem:** Admin client can't run in the browser — exposes service role key.
**Fix:** `/api/storage/signed-url` verifies session first, generates signed URL server-side.

### 18. Vercel Kills Serverless Functions on Response
**Problem:** Non-blocking `.catch()` emails get killed when `NextResponse.redirect()` fires. `sendBarryNotification` was completely silent — the process was dead before it ran.
**Fix:** `await` each email in its own `try/catch` before the redirect. Function stays alive until both emails complete.

### 19. Webhook Races Browser Redirect — Wrong Banner Shown
**Problem:** Webhook processes payment before browser redirect. Verify sees `status === "success"` and redirects to `?payment=already_processed` — confusing a student who legitimately paid.
**Fix:** When verify finds an already-processed reference, redirect to `?payment=success`. Student paid — always show success.

### 20. Video Auto-Pause Between Cards
**Problem:** Each `MaterialCard` had isolated `playing` state — no cross-card communication.
**Fix:** Lifted `activeVideoId` to dashboard page. Card renders iframe only if `activeVideoId === material.id`.

### 21. YouTube Thumbnail Missing for Unlisted Videos
**Problem:** `maxresdefault.jpg` doesn't exist for all unlisted YouTube videos — broken image shown.
**Fix:** `thumbError` state — `onError` falls back to `hqdefault.jpg` which always exists.

### 22. Touched State Not Clearing on Mode Switch
**Problem:** Switching from signup to login kept `touched` — "Email required" showed immediately on login form before user typed anything.
**Fix:** Reset both `touched` AND `formData` in `switchMode`.

### 23. Deleting Users From Table Editor Doesn't Remove From Auth
**Problem:** Deleted from `profiles` table but auth record stays — re-registering shows "User already registered".
**Fix:** Always delete from **Supabase → Authentication → Users**, not Table Editor.

### 24. Contact Form Was Never Wired Up
**Problem:** `handleSubmit` had a `setTimeout` simulation — messages never sent.
**Fix:** Created `/api/contact/route.js` with Nodemailer, rate limiting, and `replyTo` set to sender.

### 25. Ebook Email Links Expiring After 24 Hours
**Problem:** Students revisiting the email days or weeks later get a broken download link — frustrating experience that creates unnecessary support requests.
**Fix:** Set signed URL expiry to 10 years (`60 * 60 * 24 * 365 * 10`). Dashboard still uses 2-hour URLs (session-based, correct). Email link is functionally permanent — students paid for lifetime access.

---

## Challenges & Solutions

### Challenge 1 — Content Gate That Can't Be Bypassed
UI-level hiding is not security. Anyone with the Supabase URL can call the API directly.

**Solution:** RLS policy at DB level using rank comparison (`et.rank >= mt.rank`). Even a direct API call with the anon key returns nothing for unpaid content.

### Challenge 2 — Payment Verification Security
Client-side verification can be faked in devtools.

**Solution:** Client provides only a reference string. Server calls Paystack API with the secret key. All trust decisions happen server-to-server.

### Challenge 3 — Ebook Security
`public/` files are accessible to anyone who knows the URL.

**Solution:** Private Supabase Storage. Email: 10-year signed URL (permanent access). Dashboard: 2-hour signed URL via session-verified API route.

### Challenge 4 — Missed Payments (Browser Tab Closed)
User pays, closes browser — redirect never fires, enrollment never created.

**Solution:** Paystack webhook fires server-to-server regardless of browser state. Both paths are idempotent — enrollment check before insert ensures only one enrollment.

### Challenge 5 — Race Condition Between Webhook and Redirect
Webhook processes payment first → verify sees "already success" → shows "already processed" to a student who legitimately paid.

**Solution:** When payment is already success on verify, redirect to `?payment=success` — not "already processed". Both paths are legitimate; both show the success experience.

### Challenge 6 — Email Delivery Silent Failures on Vercel
Non-blocking `.catch()` emails get killed when the serverless function returns.

**Solution:** `await` each email in its own `try/catch` before the redirect. Failure is logged but doesn't block the user.

### Challenge 7 — Advanced Tier One-on-One Scheduling
Barry doesn't know his schedule in advance — no automated booking system can handle this.

**Solution:** Barry receives a notification email with student contact details and a clear prompt. He schedules directly via email. More flexible, more personal, zero maintenance.

### Challenge 8 — Cumulative Ebook Access
An Intermediate student shouldn't have less than a Beginner.

**Solution:** The existing RLS rank policy handles this automatically. No application-level filtering needed — just insert materials with the correct `tier_id` and let the DB do the work.

### Challenge 9 — One Video Playing at a Time
Each card had isolated `playing` state — no cross-card communication.

**Solution:** Lifted `activeVideoId` to dashboard. Only one card renders an iframe at a time.

### Challenge 10 — First Time Using Next.js App Router
Server Components, cookies() API, route handlers, and the server/client boundary were all new concepts.

**Solution:** Built incrementally — static pages first, then client components, then API routes. Mental model: Server Components by default, `"use client"` only when you need `useState`, `onClick`, or browser APIs.

---

## Future Improvements

- [ ] Switch email to Resend with custom domain when Barry registers one
- [ ] Admin dashboard so Barry can upload new materials without touching code
- [ ] Email resend button on dashboard for students who can't find their ebook email
- [ ] Course progress tracking — mark lessons as complete
- [ ] Redis for globally consistent rate limiting across Vercel instances
- [ ] Automated tests for payment flow and RLS policies