CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.ROLES (id_rol, correo, rol)
  VALUES (NEW.id, NEW.email, 'usuario')
  ON CONFLICT (id_rol) DO NOTHING;

  INSERT INTO public.PERFIL (id_usuario, nombre_completo)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name')
  ON CONFLICT (id_usuario) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auth_user_created ON auth.users;

CREATE TRIGGER auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();






CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.ROLES r
    WHERE r.id_rol = (SELECT auth.uid())
      AND lower(r.rol) = 'admin'
  );
$$;