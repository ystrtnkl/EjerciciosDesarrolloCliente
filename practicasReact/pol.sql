create policy "delete-productos"
on "public"."productos"
as PERMISSIVE
for DELETE
to authenticated
using (
 true
);

create policy "insert-productos"
on "public"."productos"
as PERMISSIVE
for INSERT
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

create policy "update-productos"
on "public"."productos"
as PERMISSIVE
for UPDATE
to authenticated
using (
 true
);


create policy "insert-listas"
on "public"."listas"
as PERMISSIVE
for INSERT
to authenticated
with check (
 true
);

create policy "select-listas"
on "public"."listas"
as PERMISSIVE
for SELECT
to authenticated
using (
 (select auth.uid()) = uuid_usuario
);

create policy "delete-listas"
on "public"."listas"
as PERMISSIVE
for DELETE
to authenticated
using (
 (select auth.uid()) = uuid_usuario
);

create policy "update-listas"
on "public"."listas"
as PERMISSIVE
for UPDATE
to public
using (
 (select auth.uid()) = uuid_usuario
);


create policy "select-lista_producto"
on "public"."lista_producto"
as PERMISSIVE
for SELECT
to authenticated
using (
  ((uuid_usuario)::text = (auth.uid())::text)
);

create policy "insert-lista_producto"
on "public"."lista_producto"
as PERMISSIVE
for INSERT
to authenticated
with check (
  ((uuid_usuario)::text = (auth.uid())::text)
);

create policy "update-lista_producto"
on "public"."lista_producto"
as PERMISSIVE
for UPDATE
to authenticated
using (
  ((uuid_usuario)::text = (auth.uid())::text)
);

create policy "delete-lista_producto"
on "public"."lista_producto"
as PERMISSIVE
for DELETE
to authenticated
using (
  ((uuid_usuario)::text = (auth.uid())::text)
);


--uuid_usuario = auth.uid()::text
--(select auth.uid()) = uuid_usuario
--((select auth.uid())::text = uuid_usuario::text)


