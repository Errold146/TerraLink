# TerraLink - Context Summary

## Project Overview
TerraLink is a Next.js 16 app for managing and administering links in one place (like Linktree). It uses:
- **Next.js 16** with App Router
- **Clerk** for authentication
- **Prisma** (with PostgreSQL via `@prisma/adapter-pg`) for database
- **UploadThing** for file uploads
- **Sonner** for toast notifications (richColors, position: top-right)
- **Tailwind CSS** for styling
- **shadcn/ui** components

## Architecture
- `app/(auth)/` — Clerk sign-in/sign-up pages
- `app/(routes)/(home)/` — Main home page with multi-step user config flow
- `app/api/uploadthing/` — UploadThing route handler
- `app/api/info-user/` — User info API
- `components/home/` — Step components (StepOne, StepTwo, StepTree, StepFour) + LinkListItem
- `components/ProfilePreview/` — Phone preview components (PhoneProfileHeader, PhoneLinkItem, PhonoPreview)
- `components/profile/` — Profile editing components
- `components/shared/` — Shared components (AdminSidebar, Heading, Logo, Spinner)
- `components/ui/` — shadcn/ui components
- `context/StepConfigUser/` — React context for step configuration
- `context/UserContext/` — React context for user data
- `hooks/useStepConfig.ts` — Custom hook for step config
- `hooks/useUser.ts` — Custom hook for user data
- `proxy.ts` — Clerk middleware (acts as middleware.ts)

## Multi-Step User Config Flow
The home page has a multi-step wizard (HandlerSteps.tsx) where users configure their profile:
- **StepOne** — Select purpose/category (Personal, Business, Creator, etc.)
- **StepTwo** — Select social platforms/networks (Instagram, Twitter, YouTube, etc.)
- **StepTree** — Enter links/usernames to selected platforms
- **StepFour** — Upload/select profile image + enter name/username

Each step saves data in local state, to be sent to the database all at once at the end.

## Key Decisions & Fixes Applied

### UploadThing Setup
- **Route**: `app/api/uploadthing/core.ts` — defines `profileImage` endpoint (image, 4MB max, 1 file)
- **Client utils**: `utils/uploadthing.ts` — exports `UploadButton` and `UploadDropzone`
- **`url` is deprecated** → Use `ufsUrl` instead (e.g., `res?.[0].ufsUrl`)
- **`onUploadComplete` in core.ts** must return data: `return { url: file.ufsUrl }` — otherwise client callback never fires

### Clerk Middleware (proxy.ts)
- UploadThing's webhook callback route (`/api/uploadthing`) **must be public** in Clerk middleware
- Without this, the callback loops infinitely and `onClientUploadComplete` never fires
- Fix: Added `'/api/uploadthing(.*)'` to `isPublicRoute` matcher

### Sonner Toast
- Installed `sonner` package
- `<Toaster richColors position="top-right" />` added in `app/layout.tsx`
- Used in StepFour: `toast.success()` on upload complete, `toast.error()` on upload error

## Link Components

### LinkListItem (Main Page)
- Component for displaying links on the main home page
- Larger, more readable design with full URL display
- Uses `<a>` element with `target="_blank"` and `rel="noopener noreferrer"`
- Smooth transitions (300ms) with subtle hover effects
- Integrated social platform icons using react-icons
- Supports dark mode

### PhoneLinkItem (Phone Preview)
- Compact component for phone preview display
- Uses `<a>` element with `target="_blank"` and `rel="noopener noreferrer"`
- Smaller size optimized for mobile preview
- Icon-based with gradient backgrounds
- Hover effects with scale transitions

### PhonoPreview
- Full phone mockup with realistic design
- Android-style navigation buttons at bottom (back, home, recents)
- Background image support with gradient overlays
- Scrollable content area with profile header and links
- Screen reflection effects for realism

### StepFour UI
- Grid of predefined avatar images (from `data/StepFour.data.ts`)
- Divider with text "Or upload your own photo" between avatars and upload button
- Plus (+) circle button to reveal UploadButton (dashed violet border, hover scale effect)
- Images and plus button share consistent hover effects (scale, shadow, border color change)
- Name and Username inputs with emerald styling
- Continue button with cyan outline styling

## File Structure Notes
- `proxy.ts` at root = Clerk middleware (not a typical proxy)
- `prisma.config.ts` at root for Prisma configuration
- `lib/db.ts` — Database connection
- `lib/generated/prisma/` — Generated Prisma client with User and Link models
- `data/` folder contains static data for steps (StepOne.data.ts, StepTwo.data.ts, StepFour.data.ts)

## Dependencies (key versions)
- next: 16.1.6
- react: 19.2.3
- @clerk/nextjs: ^6.37.4
- uploadthing: ^7.7.4
- @uploadthing/react: ^7.3.3
- sonner: ^2.0.7
- prisma client: ^7.4.0
