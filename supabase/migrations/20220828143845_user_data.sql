create table "public"."user_data" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "stripe_customer_id" text,
    "email" text not null
);


alter table "public"."user_data" enable row level security;

CREATE UNIQUE INDEX user_data_pkey ON public.user_data USING btree (id);

alter table "public"."user_data" add constraint "user_data_pkey" PRIMARY KEY using index "user_data_pkey";

alter table "public"."user_data" add constraint "user_data_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."user_data" validate constraint "user_data_id_fkey";
