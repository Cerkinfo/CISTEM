
  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "first_name" text not null,
    "last_name" text not null,
    "pseudo" text not null,
    "image" text not null
      );


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX users_image_key ON public.users USING btree (image);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_email_check" CHECK ((email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)) not valid;

alter table "public"."users" validate constraint "users_email_check";

alter table "public"."users" add constraint "users_first_name_length" CHECK (((char_length(first_name) >= 2) AND (char_length(first_name) <= 50))) not valid;

alter table "public"."users" validate constraint "users_first_name_length";

alter table "public"."users" add constraint "users_image_key" UNIQUE using index "users_image_key";

alter table "public"."users" add constraint "users_last_name_length" CHECK (((char_length(last_name) >= 2) AND (char_length(last_name) <= 50))) not valid;

alter table "public"."users" validate constraint "users_last_name_length";

alter table "public"."users" add constraint "users_pseudo_format" CHECK ((pseudo ~ '^[a-zA-Z0-9._-]+$'::text)) not valid;

alter table "public"."users" validate constraint "users_pseudo_format";

alter table "public"."users" add constraint "users_pseudo_length" CHECK (((char_length(pseudo) >= 4) AND (char_length(pseudo) <= 30))) not valid;

alter table "public"."users" validate constraint "users_pseudo_length";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


  create policy "Enable users to view their own data only"
  on "public"."users"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = id));



