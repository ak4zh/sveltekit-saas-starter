create table "public"."user_data" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "email" text not null,
    "stripe_customer_id" text
);

alter table "public"."user_data" enable row level security;

CREATE UNIQUE INDEX user_data_pkey ON public.user_data USING btree (id);

alter table "public"."user_data" add constraint "user_data_pkey" PRIMARY KEY using index "user_data_pkey";

alter table "public"."user_data" add constraint "user_data_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."user_data" validate constraint "user_data_id_fkey";

create policy "user_data.allow_select_own_user_data" on user_data
  for select using (auth.uid() = id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.user_data (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- trigger the function every time a user is inserted
create trigger on_auth_user_inserted
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- trigger the function every time a row is inserted in user_data
-- I am aware I commited the anon key and project ref id
CREATE TRIGGER on_user_data_insert_create_stripe_customer
    AFTER INSERT ON public.user_data
    FOR EACH ROW
    EXECUTE FUNCTION supabase_functions.http_request(
      'https://xsbznfavbzjwhooewyyg.functions.supabase.co/create-stripe-customer', 'POST',
      '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzYnpuZmF2Ynpqd2hvb2V3eXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjk4NzYsImV4cCI6MTk4MzgwNTg3Nn0.k19SvRSvtpKGIWWBPLFwsL4QdfcBPJ_d6OpyNnC7IWc"}'
    );