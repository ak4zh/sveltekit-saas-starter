create table "public"."user_data" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "stripe_customer_id" text
);

alter table "public"."user_data" enable row level security;

CREATE UNIQUE INDEX user_data_pkey ON public.user_data USING btree (id);

alter table "public"."user_data" add constraint "user_data_pkey" PRIMARY KEY using index "user_data_pkey";

alter table "public"."user_data" add constraint "user_data_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."user_data" validate constraint "user_data_id_fkey";


create function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.user_data (id)
  values (new.id);
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
      'https://zwmoejldasqvopbocdmt.functions.supabase.co/create-stripe-customer', 'POST',
      '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3bW9lamxkYXNxdm9wYm9jZG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5Mjc3MzEsImV4cCI6MTk3NzUwMzczMX0.uN8_EmmuQMrvCq4gFGfu2YJendjrClIuNSQyB6O2GCc"}'
    );