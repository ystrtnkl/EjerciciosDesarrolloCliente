DROP TABLE IF EXISTS ROLES;
DROP TABLE IF EXISTS PERFIL;
DROP TABLE IF EXISTS LISTA_PRODUCTO;
DROP TABLE IF EXISTS LISTAS;
DROP TABLE IF EXISTS PRODUCTOS;
--usuarios no manejada aqui

CREATE TABLE PRODUCTOS (
  uuid VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(127) NOT NULL,
  peso FLOAT DEFAULT 0,
  precio FLOAT DEFAULT 0 NOT NULL,
  url_imagen VARCHAR(127) DEFAULT 'https://i.ibb.co/8SQJtJ1/sinportada.jpg',
  --uuid_duegno VARCHAR(36) REFERENCES USER(uuid),
  duegno VARCHAR(36) DEFAULT 'admin',
  descripcion VARCHAR(511)
);

CREATE TABLE LISTAS (
  uuid VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(127) NOT NULL,
  uuid_usuario VARCHAR(36) NOT NULL,
  fecha VARCHAR(15),
  descripcion VARCHAR(127)
  --precio y coche calculados en runtime
);

CREATE TABLE LISTA_PRODUCTO (
  uuid_lista VARCHAR(36) REFERENCES LISTAS(uuid),
  uuid_producto VARCHAR(36) REFERENCES PRODUCTOS(uuid),
  uuid_usuario VARCHAR(36),
  cantidad INTEGER DEFAULT 0,
  PRIMARY KEY (uuid_lista, uuid_producto, uuid_usuario)
);

CREATE TABLE ROLES (
  id_rol UUID PRIMARY KEY,
  correo VARCHAR(127) UNIQUE,
  rol VARCHAR(8) DEFAULT 'usuario',
  CONSTRAINT pertenencia_usuario_rol FOREIGN KEY (id_rol)
    REFERENCES auth.users (id) ON DELETE CASCADE
);

CREATE TABLE PERFIL (
  id_usuario UUID PRIMARY KEY,
  avatar VARCHAR(127) DEFAULT 'https://i.ibb.co/q30wzvtk/sinavatar.png',
  nombre_completo VARCHAR(63),
  descripcion VARCHAR(511) DEFAULT '',
  CONSTRAINT pertenencia_usuario_perfil FOREIGN KEY (id_usuario)
    REFERENCES auth.users (id) ON DELETE CASCADE
);