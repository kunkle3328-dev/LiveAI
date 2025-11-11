# LiveAI

LiveAI is a **futuristic cyber‑punk AI assistant** built with the modern [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing) and [Supabase](https://supabase.com/) as its backend.  It combines a glassmorphic user interface, theme switching and real‑time streaming to deliver an engaging conversational experience.  This repository contains the full stack required to run the application, including the database schema, frontend components and an API proxy for the OpenAI chat API.

## Features

* **Authentication** – Users can sign up and sign in using email/password or OAuth providers (Google/GitHub). Sessions are persisted via the Supabase client.
* **Conversations & history** – Each user owns multiple conversations.  Messages are stored in a `messages` table with row‑level security policies to ensure only the owner can read and write their data.
* **Streaming responses** – The `/api/chat` route proxies requests to OpenAI's Chat Completions API with `stream: true` enabled.  As tokens arrive, they are forwarded to the browser where a typing effect is displayed and persisted.
* **Real‑time updates** – Supabase Realtime broadcasts database changes over WebSockets.  Clients subscribe to new message inserts to keep multiple tabs in sync (see `chatStore.ts`).
* **Theme switching** – Light, dark and cyberpunk themes are provided out of the box.  The selected theme is stored in `localStorage` and applied using CSS variables.
* **PWA** – The app is installable on mobile and desktop.  A `manifest.json` and `next‑pwa` configuration generate a service worker that caches static assets and provides offline support.
* **Responsive & accessible UI** – Built with Tailwind CSS and Framer Motion, the interface adapts from mobile to desktop and includes animations for incoming messages.

## Database schema

The SQL schema lives in [`db/schema.sql`](./db/schema.sql).  It defines two tables:

* `conversations` – primary key `id` (UUID), `user_id` referencing `auth.users`, and `created_at` timestamp.
* `messages` – primary key `id`, `session_id` referencing `conversations`, `user_id`, `role` (user/assistant/system), `content`, and `created_at` timestamp.

Row‑level security policies ensure users can only read or write their own records.  To load this schema into your Supabase project, open the SQL editor in your Supabase dashboard and run the file contents.

## Environment variables

Create a `.env.local` file at the project root with the following values:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your‑supabase‑url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your‑supabase‑anon‑key>
OPENAI_API_KEY=<your‑openai‑api‑key>
```

The `OPENAI_API_KEY` is used by the `/api/chat` route to forward requests to OpenAI.  In production you should instead call your own backend function or Supabase Edge Function to avoid exposing the key.

## Running locally

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Navigate to <http://localhost:3000> to view the app.  The first time you open the site you will be asked to sign in or sign up.  After authenticating, create a new chat from the dashboard and start conversing.

## Deploying

This project is optimised for deployment on [Vercel](https://vercel.com/).  After configuring your environment variables in Vercel and Supabase, you can import this repository and deploy directly.  The **next‑pwa** plugin will automatically generate a service worker during the build step.

## References

* The OpenAI documentation notes that streaming responses let you process the beginning of the model's output while it continues generating the full response【325889947082705†L170-L181】.  To enable streaming you set `stream=true` when calling the API【325889947082705†L185-L219】.
* Supabase's realtime system uses PostgreSQL's logical decoding and WebSockets to deliver low‑latency updates【327247928864104†L38-L52】.  Messages are broadcast over channels and clients automatically reconnect【327247928864104†L96-L103】.

---

© EDC Media / LiveAI, 2025.  Built with ♥ in Michigan.