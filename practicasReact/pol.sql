alter policy "delete-productos"

on "public"."productos"

to authenticated

using (
true
);

alter policy "insert-productos"

on "public"."productos"

to authenticated

with check (
true
);

alter policy "select-productos"

on "public"."productos"

to public

using (
true
);

alter policy "update-productos"

on "public"."productos"

to authenticated

using (
true
);