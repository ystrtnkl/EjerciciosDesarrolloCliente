DELETE FROM LISTA_PRODUCTO;
DELETE FROM LISTAS;
DELETE FROM PRODUCTOS;

-- 1. PRODUCTOS (10 entries)
INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('0f9b4001-1111-4a01-a001-001000000001', 'Yunque', 45000.0, 149.99, 'https://i.ibb.co/gZZCBvYg/A4.png', 'Literalmente un yunque para testear el peso');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('0f9b4001-1111-4a01-a001-000000030001', 'Coche', 1400000.0, 15000, 'https://i.ibb.co/qLKfzMyd/A0.png', 'Un coche genérico para probar valores');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('0f9b4001-1111-4a01-a001-000000777001', 'AMD Ryzen 9 9950X', 80.0, 619.99, 'https://i.ibb.co/bRjTHkF1/A2.png', 'El último procesador');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4002-2222-4a02-a002-000000000002', 'Leche Entera', 1030.0, 1.20, 'https://i.ibb.co/LX9hVZK9/A1.png', 'Cartón de 1L');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4003-3333-4a03-a003-000000000003', 'Pan Integral', 500.0, 1.80, 'https://i.ibb.co/bRjTHkF1/A2.png', 'Pan de molde');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4004-4444-4a04-a004-000000000004', 'Arroz Blanco', 1000.0, 0.95, 'https://i.ibb.co/LztKGkG7/A3.png', 'Grano largo');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4005-5555-4a05-a005-000000000005', 'Café Molido', 250.0, 4.50, 'https://i.ibb.co/gZZCBvYg/A4.png', 'Tueste natural');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4006-6666-4a06-a006-000000000006', 'Detergente', 3000.0, 8.99, 'https://i.ibb.co/B2msPqL4/A5.png', 'Jabón líquido');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4007-7777-4a07-a007-000000000007', 'Aceite Oliva', 690.0, 6.40, 'https://i.ibb.co/KczrctpM/A6.png', 'Virgen extra');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4008-8888-4a08-a008-000000000008', 'Pechuga Pollo', 600.0, 5.20, 'https://i.ibb.co/zh7F0HD6/A7.png', 'Filetes frescos');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4009-9999-4a09-a009-000000000009', 'Pasta Penne', 500.0, 0.85, 'https://i.ibb.co/ym2FnggB/A8.png', 'Trigo duro');

INSERT INTO PRODUCTOS (uuid, nombre, peso, precio, url_imagen, descripcion) 
VALUES ('5f9b4010-0000-4a10-a010-000000000010', 'Yogur Natural', 500.0, 2.10, 'https://i.ibb.co/tMj5nvBr/A9.png', 'Pack de 4');













-- 2. LISTAS (5 entries)
INSERT INTO LISTAS (uuid, nombre, uuid_usuario, fecha, descripcion) 
VALUES ('e1111111-aaaa-4111-b111-000000000001', 'Compra Mensual', 'u-99', '2026-02-02', 'Basicos de despensa');
INSERT INTO LISTAS (uuid, nombre, uuid_usuario, fecha, descripcion) 
VALUES ('e2222222-bbbb-4222-b222-000000000002', 'Cena Italiana', 'u-99', '2026-02-03', 'Para hacer pasta');
INSERT INTO LISTAS (uuid, nombre, uuid_usuario, fecha, descripcion) 
VALUES ('e3333333-cccc-4333-b333-000000000003', 'Limpieza Post-Fiesta', 'u-10', '2026-02-04', 'Urgente');
INSERT INTO LISTAS (uuid, nombre, uuid_usuario, fecha, descripcion) 
VALUES ('e4444444-dddd-4444-b444-000000000004', 'Desayuno Fit', 'u-22', '2026-02-05', 'Saludable');
INSERT INTO LISTAS (uuid, nombre, uuid_usuario, fecha, descripcion) 
VALUES ('e5555555-eeee-4555-b555-000000000005', 'Lista de Antojos', 'u-22', '2026-02-06', 'Sin apuro');

-- 3. LISTA_PRODUCTO (Connections)

-- List: Compra Mensual
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e1111111-aaaa-4111-b111-000000000001', '5f9b4004-4444-4a04-a004-000000000004', 'u-99', 2);
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e1111111-aaaa-4111-b111-000000000001', '5f9b4002-2222-4a02-a002-000000000002', 'u-99', 6);
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e1111111-aaaa-4111-b111-000000000001', '5f9b4001-1111-4a01-a001-000000000001', 'u-99', 1);

-- List: Cena Italiana
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e2222222-bbbb-4222-b222-000000000002', '5f9b4009-9999-4a09-a009-000000000009', 'u-99', 3);
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e2222222-bbbb-4222-b222-000000000002', '5f9b4007-7777-4a07-a007-000000000007', 'u-99', 1);

-- List: Limpieza Post-Fiesta
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e3333333-cccc-4333-b333-000000000003', '5f9b4006-6666-4a06-a006-000000000006', 'u-10', 1);

-- List: Desayuno Fit
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e4444444-dddd-4444-b444-000000000004', '5f9b4010-0000-4a10-a010-000000000010', 'u-22', 2);
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e4444444-dddd-4444-b444-000000000004', '5f9b4005-5555-4a05-a005-000000000005', 'u-22', 1);
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e4444444-dddd-4444-b444-000000000004', '5f9b4003-3333-4a03-a003-000000000003', 'u-22', 1);
INSERT INTO LISTA_PRODUCTO (uuid_lista, uuid_producto, uuid_usuario, cantidad) 
VALUES ('e4444444-dddd-4444-b444-000000000004', '5f9b4001-1111-4a01-a001-000000000001', 'u-22', 2);

-- List: Lista de Antojos is intentionally left empty.