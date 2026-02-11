create policy "delete-productos" on "public"."productos" as PERMISSIVE for DELETE to authenticated using (is_admin_user());
create policy "insert-productos" on "public"."productos" as PERMISSIVE for INSERT to authenticated with check (is_admin_user());
create policy "select-productos" on "public"."productos" as PERMISSIVE for SELECT to authenticated using (true);
create policy "update-productos" on "public"."productos" as PERMISSIVE for UPDATE to authenticated using (is_admin_user());

create policy "insert-listas" on "public"."listas" as PERMISSIVE for INSERT to authenticated with check (true);
create policy "select-listas" on "public"."listas" as PERMISSIVE for SELECT to authenticated using (((uuid_usuario)::text = (auth.uid())::text OR is_admin_user()));
create policy "delete-listas" on "public"."listas" as PERMISSIVE for DELETE to authenticated using (((uuid_usuario)::text = (auth.uid())::text)); -- cascade delete user -> lista
create policy "update-listas" on "public"."listas" as PERMISSIVE for UPDATE to public using (((uuid_usuario)::text = (auth.uid())::text));

create policy "select-lista_producto" on "public"."lista_producto" as PERMISSIVE for SELECT to authenticated using (((uuid_usuario)::text = (auth.uid())::text));
create policy "insert-lista_producto" on "public"."lista_producto" as PERMISSIVE for INSERT to authenticated with check (((uuid_usuario)::text = (auth.uid())::text));
create policy "update-lista_producto"on "public"."lista_producto" as PERMISSIVE for UPDATE to authenticated using (((uuid_usuario)::text = (auth.uid())::text));
create policy "delete-lista_producto" on "public"."lista_producto" as PERMISSIVE for DELETE to authenticated using (((uuid_usuario)::text = (auth.uid())::text)); -- cascade delete productos -> lista_producto

-- cascade delete user -> perfil
create policy "insert-perfil" on "public"."perfil" to authenticated with check ((((SELECT auth.uid() AS uid))::text = (id_usuario)::text));
create policy "select-perfil"on "public"."perfil" to public using (((id_usuario)::text = (auth.uid())::text OR is_admin_user()));
create policy "update-perfil" on "public"."perfil" to authenticated using (((id_usuario)::text = (auth.uid())::text OR is_admin_user()));

-- cascade delete user -> roles
create policy "select-roles" on "public"."roles" to authenticated using (true); 
create policy "update-roles" on "public"."roles" to authenticated using (is_admin_user()) with check (is_admin_user());