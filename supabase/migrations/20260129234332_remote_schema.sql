create type "public"."ORDER" as enum ('PENDING', 'SENDED', 'ABORTED');

drop policy "Enable read access for all users" on "public"."orders";

drop policy "Enable users to view their own data only" on "public"."users";

alter table "public"."managers" drop constraint "managers_id_fkey";

alter table "public"."managers" drop constraint "managers_suppleant_fkey";

alter table "public"."orders" drop constraint "orders_location_fkey";

alter table "public"."stock_foods" drop constraint "stock_foods_id_fkey";

alter table "public"."stock_materials" drop constraint "stock_materials_pkey";

drop index if exists "public"."stock_materials_pkey";

alter table "public"."beers" alter column "id" set default gen_random_uuid();

alter table "public"."beers" alter column "id" drop identity;

alter table "public"."beers" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."beers_flavors" alter column "id" drop identity;

alter table "public"."beers_flavors" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."beers_taste" alter column "id" drop identity;

alter table "public"."beers_taste" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."coffee" alter column "id" set default gen_random_uuid();

alter table "public"."coffee" alter column "id" drop identity;

alter table "public"."coffee" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."foods" alter column "id" set default gen_random_uuid();

alter table "public"."foods" alter column "id" drop identity;

alter table "public"."foods" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."locations" add column "image" text;

alter table "public"."locations" alter column "id" set default gen_random_uuid();

alter table "public"."locations" alter column "id" drop identity;

alter table "public"."locations" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."managers" drop column "suppleant";

alter table "public"."managers" add column "location" uuid not null;

alter table "public"."managers" alter column "id" set default gen_random_uuid();

alter table "public"."managers" alter column "id" drop identity;

alter table "public"."managers" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."materials" alter column "id" set default gen_random_uuid();

alter table "public"."materials" alter column "id" drop identity;

alter table "public"."materials" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."orders" alter column "id" set default gen_random_uuid();

alter table "public"."orders" alter column "id" drop identity;

alter table "public"."orders" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."orders" alter column "location" drop not null;

alter table "public"."orders" alter column "location" set data type uuid using "location"::uuid;

alter table "public"."orders" alter column "order" set data type jsonb using "order"::jsonb;

alter table "public"."orders" alter column "status" set data type public."ORDER" using "status"::public."ORDER";

alter table "public"."softs" alter column "id" set default gen_random_uuid();

alter table "public"."softs" alter column "id" drop identity;

alter table "public"."softs" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."stock_beers" alter column "id" set default gen_random_uuid();

alter table "public"."stock_beers" alter column "id" drop identity;

alter table "public"."stock_beers" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."stock_foods" alter column "id" drop identity;

alter table "public"."stock_foods" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."stock_materials" alter column "id" drop identity;

alter table "public"."stock_materials" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."stock_softs" alter column "id" drop identity;

alter table "public"."stock_softs" alter column "id" set data type uuid using "id"::uuid;

drop type "public"."USER_ROLE";

CREATE UNIQUE INDEX beers_new_id_key ON public.beers USING btree (id);

CREATE UNIQUE INDEX coffee_id_key ON public.coffee USING btree (id);

CREATE UNIQUE INDEX foods_new_id_key ON public.foods USING btree (id);

CREATE UNIQUE INDEX locations_new_id_key ON public.locations USING btree (id);

CREATE UNIQUE INDEX managers_new_id_key ON public.managers USING btree (id);

CREATE UNIQUE INDEX materials_new_id_key ON public.materials USING btree (id);

CREATE UNIQUE INDEX orders_new_id_key ON public.orders USING btree (id);

CREATE UNIQUE INDEX softs_id_key ON public.softs USING btree (id);

alter table "public"."beers" add constraint "beers_new_id_key" UNIQUE using index "beers_new_id_key";

alter table "public"."coffee" add constraint "coffee_id_key" UNIQUE using index "coffee_id_key";

alter table "public"."foods" add constraint "foods_new_id_key" UNIQUE using index "foods_new_id_key";

alter table "public"."locations" add constraint "locations_new_id_key" UNIQUE using index "locations_new_id_key";

alter table "public"."managers" add constraint "managers_location_fkey" FOREIGN KEY (location) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."managers" validate constraint "managers_location_fkey";

alter table "public"."managers" add constraint "managers_new_id_key" UNIQUE using index "managers_new_id_key";

alter table "public"."materials" add constraint "materials_new_id_key" UNIQUE using index "materials_new_id_key";

alter table "public"."orders" add constraint "orders_new_id_key" UNIQUE using index "orders_new_id_key";

alter table "public"."orders" add constraint "orders_new_location_fkey" FOREIGN KEY (location) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_new_location_fkey";

alter table "public"."softs" add constraint "softs_id_key" UNIQUE using index "softs_id_key";

alter table "public"."stock_foods" add constraint "stock_foods_new_id_fkey" FOREIGN KEY (id) REFERENCES public.foods(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."stock_foods" validate constraint "stock_foods_new_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.decrement_location_orders()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE public.locations
    SET orders = orders - 1
    WHERE id = NEW.location;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_order_stock()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    item jsonb;
    item_id uuid;
    quantity integer;
    current_stock integer;
BEGIN
    -- Parcours de la colonne order (jsonb array)
    FOR item IN
        SELECT * FROM jsonb_array_elements(NEW.order)
    LOOP
        item_id := (SELECT key::uuid FROM jsonb_each(item) LIMIT 1);
        quantity := (SELECT value::integer FROM jsonb_each(item) LIMIT 1);

        -- Vérifier chaque table de stock
        -- beers
        IF EXISTS (SELECT 1 FROM public.stock_beers WHERE id = item_id) THEN
            SELECT stock INTO current_stock FROM public.stock_beers WHERE id = item_id;
            IF current_stock - quantity < 0 THEN
                RAISE EXCEPTION 'Insufficient stock (beer)';
            END IF;
            UPDATE public.stock_beers SET stock = stock - quantity WHERE id = item_id;

        -- softs
        ELSIF EXISTS (SELECT 1 FROM public.stock_softs WHERE id = item_id) THEN
            SELECT stock INTO current_stock FROM public.stock_softs WHERE id = item_id;
            IF current_stock - quantity < 0 THEN
                RAISE EXCEPTION 'Insufficient stock (soft)';
            END IF;
            UPDATE public.stock_softs SET stock = stock - quantity WHERE id = item_id;

        -- foods
        ELSIF EXISTS (SELECT 1 FROM public.stock_foods WHERE id = item_id) THEN
            SELECT stock INTO current_stock FROM public.stock_foods WHERE id = item_id;
            IF current_stock - quantity < 0 THEN
                RAISE EXCEPTION 'Insufficient stock (food)';
            END IF;
            UPDATE public.stock_foods SET stock = stock - quantity WHERE id = item_id;

        -- materials
        ELSIF EXISTS (SELECT 1 FROM public.stock_materials WHERE id = item_id) THEN
            SELECT stock INTO current_stock FROM public.stock_materials WHERE id = item_id;
            IF current_stock - quantity < 0 THEN
                RAISE EXCEPTION 'Insufficient stock (material)';
            END IF;
            UPDATE public.stock_materials SET stock = stock - quantity WHERE id = item_id;

        ELSE
            RAISE EXCEPTION 'Stock item not found';
        END IF;
    END LOOP;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_location_orders()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE public.locations
    SET orders = orders + 1
    WHERE id = NEW.location;

    RETURN NEW;
END;
$function$
;

create or replace view "public"."products_view" as  SELECT beers.id,
    beers.name,
    beers.image,
    'beer'::text AS type
   FROM public.beers
UNION ALL
 SELECT softs.id,
    softs.name,
    softs.image,
    'soft'::text AS type
   FROM public.softs
UNION ALL
 SELECT foods.id,
    foods.name,
    foods.image,
    'food'::text AS type
   FROM public.foods
UNION ALL
 SELECT materials.id,
    materials.name,
    materials.image,
    'material'::text AS type
   FROM public.materials;



  create policy "Enable read access for all authenticated users"
  on "public"."managers"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for all authenticated users"
  on "public"."orders"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for all authenticated users"
  on "public"."users"
  as permissive
  for select
  to authenticated
using (true);


CREATE TRIGGER trg_decrement_location_orders AFTER DELETE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.decrement_location_orders();

CREATE TRIGGER trg_handle_order_stock AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_order_stock();

CREATE TRIGGER trg_increment_location_orders AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.increment_location_orders();


