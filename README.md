1) Go to supabase dashboard > Database > Wehbooks and enable Webhhooks.
2) Open `supabase/migrations/20220828143845_user_data.sql` and replace the default supabase url abnd anon key with your project info.

3) Add the relevant data in `.env` and `supabase/.env`
4) Go to https://app.supabase.com/account/tokens and create a new acces token.
5) Login to supabase cli by running `supabase login` and paste the token increated in previous step.

6) Connect supabnase project by running `supabase link --project-ref YOUR_PROJECT_REF` and paste the database password.
7) Run `supabase db push` to push the migrations.
8) Go to Supabase > Settings > API and add `stripe` scheme in Exposed schema and Extra search path

9) Deploy the supabase edge functions:

```bash
supabase functions deploy create-stripe-customer
supabase functions deploy stripe-sync --no-verify-jwt
```