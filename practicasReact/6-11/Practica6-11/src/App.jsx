/*

INFORMACIÓN DE SUPABASE:

  Usuario de ejemplo para admin: 
    Nombre: adminFeo    Correo: jc.gomez@edu.gva.es   Contraseña: Feofeofeo2@
  Usuario de ejemplo normal: 
    Nombre: usuarioFeo    Correo: feo@feo.es   Contraseña: Feofeofeo2@


INFORMACIÓN DE SQL: 

  Funciones utilizadas:
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    -- Esta función genera una fila en roles y el perfil cada vez que un usuario se registra, tiene borrado en cascada
    CREATE OR REPLACE FUNCTION public.gestion_nuevo_usuario() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
    BEGIN
      INSERT INTO public.ROLES (id_rol, correo, rol) VALUES (NEW.id, NEW.email, 'usuario') ON CONFLICT (id_rol) DO NOTHING;
      INSERT INTO public.PERFIL (id_usuario, nombre_completo) VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name') ON CONFLICT (id_usuario) DO NOTHING;
      RETURN NEW;
    END;
    $$;
    DROP TRIGGER IF EXISTS auth_user_created ON auth.users;
    -- Establece el trigger para la función anterior
    CREATE TRIGGER auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.gestion_nuevo_usuario();
    -- Crea una función para saber si un usuario tiene permisos de administrador
    CREATE OR REPLACE FUNCTION public.is_admin_user() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
      SELECT EXISTS (SELECT 1 FROM public.ROLES r WHERE r.id_rol = (SELECT auth.uid()) AND lower(r.rol) = 'admin');
    $$;

  Declaración de tablas: 
    DROP TABLE IF EXISTS ROLES;
    DROP TABLE IF EXISTS PERFIL;
    DROP TABLE IF EXISTS LISTA_PRODUCTO;
    DROP TABLE IF EXISTS LISTAS;
    DROP TABLE IF EXISTS PRODUCTOS;

    CREATE TABLE PRODUCTOS (
      uuid VARCHAR(36) PRIMARY KEY,
      nombre VARCHAR(127) NOT NULL,
      peso FLOAT DEFAULT 0,
      precio FLOAT DEFAULT 0 NOT NULL,
      url_imagen VARCHAR(127) DEFAULT 'https://i.ibb.co/8SQJtJ1/sinportada.jpg',
      duegno VARCHAR(36) DEFAULT 'admin',
      descripcion VARCHAR(511)
    );

    -- Las siguientes tablas tienen borrado en cascada cuando se borre su usuario/producto

    CREATE TABLE LISTAS (
      uuid VARCHAR(36) PRIMARY KEY,
      nombre VARCHAR(127) NOT NULL,
      uuid_usuario VARCHAR(36) NOT NULL,
      fecha VARCHAR(15),
      descripcion VARCHAR(127)
    );

    CREATE TABLE LISTA_PRODUCTO (
      uuid_lista VARCHAR(36) REFERENCES LISTAS(uuid),
      uuid_producto VARCHAR(36) REFERENCES PRODUCTOS(uuid),
      uuid_usuario VARCHAR(36),
      cantidad INTEGER DEFAULT 0,
      PRIMARY KEY (uuid_lista, uuid_producto, uuid_usuario)
    );
  
    -- Por cada usuario guarda su correo y su rol ("admin" o "usuario")
    CREATE TABLE ROLES (
      id_rol UUID PRIMARY KEY,
      correo VARCHAR(127) UNIQUE,
      rol VARCHAR(8) DEFAULT 'usuario',
      CONSTRAINT pertenencia_usuario_rol FOREIGN KEY (id_rol) REFERENCES auth.users (id) ON DELETE CASCADE
    );

    -- Almacena información extendida del usuario (nombre_completo valdrá lo mismo que el display_name en el schema auth)
    CREATE TABLE PERFIL (
      id_usuario UUID PRIMARY KEY,
      avatar VARCHAR(127) DEFAULT 'https://i.ibb.co/q30wzvtk/sinavatar.png',
      nombre_completo VARCHAR(63),
      descripcion VARCHAR(511) DEFAULT '',
      CONSTRAINT pertenencia_usuario_perfil FOREIGN KEY (id_usuario) REFERENCES auth.users (id) ON DELETE CASCADE
    );

  Políticas en las tablas:
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

NOTAS EXTRA:
  Algunas partes de la aplicación no están pensadas para soportar millones de objetos (ejemplo: millones de usuarios, millones de objetos, millones de listas).
  Para solucionar esto estaría interesante usar la estrategia de paginación y búsqueda indexada, esto habría que implementarlo tanto en el frontend como en el backend.
  También habría estado interesante implementar más roles, ya que de momento los administradores pueden hacer lo que quieran en los productos y cambiar los permisos de otros usuarios (incluso si son administradores).

  ADMINS VEN LISTAS AJENAS
  ADMINST CRUD A PERFIL

*/

import React from 'react'
import './App.css'
import Cabecera from './components/Principal/Cabecera.jsx';
import MenuNavegacion from './components/Principal/MenuNavegacion.jsx';
import Pie from './components/Principal/Pie.jsx';
import Contenedor from './components/Contenedor.jsx';
import Contenido from './components/Contenido.jsx';
import ProveedorSesion from './contexts/ProveedorSesion.jsx';
import ProveedorProductos from './contexts/ProveedorProductos.jsx';
import ProveedorListas from './contexts/ProveedorListas.jsx';

function App() {

  return (
    <>
      <Contenedor>
        <ProveedorSesion>
          <Cabecera />
          <MenuNavegacion />
          <ProveedorProductos>
            <ProveedorListas>
              <Contenido />
            </ProveedorListas>
          </ProveedorProductos>
        </ProveedorSesion>
        <Pie />
      </Contenedor>
    </>
  )
}

export default App;
