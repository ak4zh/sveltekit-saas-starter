# SvelteKit SaaS Starter

A free SvelteKit template for SaaS products.
Technologies

- SvelteKit - The fastest way to build svelte apps
- Tailwind - CSS framework for styling
- Skeleton - Svelte component library
- Stripe - Payment processor
- Supabase - Postgres Database & Authentication.

## Setup

### Step 1: Clone project

    npx degit https://github.com/ak4zh/sveltekit-saas-starter
    cd sveltekit-saas-starter
    cp .env.example .env
    cp supabase/.env.example .env
    pnpm install

### Step 2: Update environment variables

Update the env variables in .env and ./supabase/.env

#### .env

    PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
    STRIPE_SECRET_KEY=sk_test_...
    PUBLIC_STRIPE_PRICING_TABLE_ID=

    PUBLIC_SUPABASE_URL=
    PUBLIC_SUPABASE_ANON_KEY=
    PUBLIC_LOGIN_REDIRECT_PATH=/dashboard

#### supabase/.env

    STRIPE_SECRET_KEY=sk_test_...
    STRIPE_WEBHOOK_SECRET=whsec_...


### Step 3: Supabase Project and Edge Functions

Create a new supabase project from supabase dashboard and then link the project to current repo.

    supabase link --project-ref YOUR_PROJECT_REF -p YOUR_DATABASE_PASSWORD

Migrate database

    supabase db push

Deploy supabase edge functions

    supabase functions deploy stripe-sync --no-verify-jwt


## Features

### Pricing Page

Pricing page pulls the data from stripe directly so it's always updated with any change you make in stripe dashboard.
