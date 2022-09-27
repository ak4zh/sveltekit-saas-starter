# SvelteKit SaaS Starter

A free SvelteKit template for SaaS products.
Technologies

- [SvelteKit](https://kit.svelte.dev/) - The fastest way to build svelte apps
- [Tailwindcss](https://tailwindcss.com/) - CSS framework for styling
- [Skeleton](https://skeleton.brainandbonesllc.com/) - Svelte component library
- [Stripe](https://stripe.com/) - Payment processor
- [Supabase](https://supabase.com/) - Postgres Database & Authentication.

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
    // set pricing table id if you want to render stripe pricing table
    PUBLIC_STRIPE_PRICING_TABLE_ID=

    PUBLIC_SUPABASE_URL=
    PUBLIC_SUPABASE_ANON_KEY=
    PUBLIC_LOGIN_REDIRECT_PATH=/dashboard

#### supabase/.env

    STRIPE_SECRET_KEY=sk_test_...
    STRIPE_WEBHOOK_SECRET=whsec_...


### Step 3: Supabase Project and Edge Functions

1) Create a new supabase project from supabase dashboard 
2) Now link the project to current repo.

        supabase link --project-ref YOUR_PROJECT_REF -p YOUR_DATABASE_PASSWORD

3) Migrate database

        supabase db push

4) Deploy supabase edge functions

        supabase functions deploy stripe-sync --no-verify-jwt
        supabase functions deploy create-stripe-customer

5) Create Database hook for creating stripe customer

    - Go to Database > Database Webhooks
    - Enable Weekbook and Create a new Webhook

5) Supabase dashboard configs
    - Go to your `Project Settings > Authentication` and configure following:
        - User Sessions > Site URL = `https://127.0.0.1:5173` 
            - (for production set it to your root domain)
        - Redirect URLs (if this is not set, magic URLs will redirect to root domain instead of /login page)
            - `https://127.0.0.1:5173/**`
            - `https://{YOUR_PRODUCTION_DOMAIN}/**`


## Features

### Pricing Page

Pricing page pulls the data from stripe directly so it's always updated with any change you make in stripe dashboard.
