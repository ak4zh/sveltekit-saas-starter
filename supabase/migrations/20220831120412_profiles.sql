create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone not null default now(),
    "full_name" text,
    "username" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";


create policy "profiles.allow_select_own_profile" on profiles
  for select using (auth.uid() = id);

create policy "profiles.allow_update_own_profile" on profiles
  for update using (auth.uid() = id);


create function public.create_user_profile()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is inserted
create trigger on_auth_user_inserted_create_profile
  after insert on auth.users
  for each row execute procedure public.create_user_profile();
