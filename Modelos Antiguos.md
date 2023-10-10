### Primeros Modelos de la Base de Datos para el Prisma
model Note {
  id        Int       @id @default(autoincrement())
  title     String?   @db.VarChar(255)
  content   String?   @db.Text
  createdAt DateTime? @default(now()) @db.DateTime(0)
  updatedAt DateTime? @db.DateTime(0)
}

model Clientes {
  id                 Int       @id @default(autoincrement())
  nombre             String?   @db.VarChar(255)
  direccion          String?   @db.VarChar(255)
  telefono           String?   @db.VarChar(15)
  correo_electronico String?   @db.VarChar(100)
  fecha_registro     DateTime? @db.Date
  historial_compras  String?   @db.Text
}

model Facturas {
  id             Int       @id @default(autoincrement())
  venta_id       Int?
  numero_factura String?   @db.VarChar(20)
  fecha_emision  DateTime? @db.Date
  subtotal       Decimal?  @db.Decimal(10, 2)
  impuestos      Decimal?  @db.Decimal(10, 2)
  total          Decimal?  @db.Decimal(10, 2)
  descripcion    String?   @db.Text
}

model MateriasPrimas {
  id                Int       @id @default(autoincrement())
  nombre            String?   @db.VarChar(255)
  cantidad_inicial  Decimal?  @db.Decimal(10, 2)
  proveedor_id      Int?
  fecha_recepcion   DateTime? @db.Date
  codigo_unidad     String?   @db.VarChar(10)
  precio_unitario   Decimal?  @db.Decimal(10, 2)
  fecha_vencimiento DateTime? @db.Date
  ubicacion_almacen String?   @db.VarChar(100)
  descripcion       String?   @db.Text
}

model Pedidos {
  id              Int       @id @default(autoincrement())
  cliente_id      Int?
  fecha_pedido    DateTime? @db.Date
  fecha_entrega   DateTime? @db.Date
  estado_pedido   String?   @db.VarChar(50)
  detalles_pedido String?   @db.Text
}

model Permisos {
  id          Int     @id @default(autoincrement())
  modulo      String? @db.VarChar(100)
  rol_id      Int?
  descripcion String? @db.Text
}

model ProductosTerminados {
  id                 Int       @id @default(autoincrement())
  nombre             String?   @db.VarChar(255)
  tipo_dulce         String?   @db.VarChar(100)
  cantidad_producida Int?
  fecha_produccion   DateTime? @db.Date
  precio_venta       Decimal?  @db.Decimal(10, 2)
  descripcion        String?   @db.Text
}

model Proveedores {
  id                 Int     @id @default(autoincrement())
  nombre             String? @db.VarChar(255)
  direccion          String? @db.VarChar(255)
  telefono           String? @db.VarChar(15)
  correo_electronico String? @db.VarChar(100)
  sitio_web          String? @db.VarChar(255)
}

model Roles {
  id          Int     @id @default(autoincrement())
  nombre_rol  String? @db.VarChar(50)
  descripcion String? @db.Text
}

model SalidasMateriasPrimas {
  id                 Int       @id @default(autoincrement())
  materia_prima_id   Int?
  cantidad           Decimal?  @db.Decimal(10, 2)
  fecha_salida       DateTime? @db.Date
  destino            String?   @db.VarChar(100)
  responsable_salida String?   @db.VarChar(255)
  descripcion        String?   @db.Text
}

model TransaccionesFinancieras {
  id                Int       @id @default(autoincrement())
  tipo              String?   @db.VarChar(20)
  monto             Decimal?  @db.Decimal(10, 2)
  fecha_transaccion DateTime? @db.DateTime(0)
  descripcion       String?   @db.Text
}

model Usuarios {
  id                 Int     @id @default(autoincrement())
  nombre_usuario     String? @db.VarChar(50)
  contrasena         String? @db.VarChar(255)
  nombre_completo    String? @db.VarChar(255)
  correo_electronico String? @db.VarChar(100)
  rol_id             Int?
}

model Ventas {
  id            Int       @id @default(autoincrement())
  cliente_id    Int?
  monto_total   Decimal?  @db.Decimal(10, 2)
  fecha_venta   DateTime? @db.Date
  metodo_pago   String?   @db.VarChar(100)
  estado_pedido String?   @db.VarChar(50)
  descripcion   String?   @db.Text
}

model VentaIdSequence {
  id Int @id @default(autoincrement())
}




### SQL de MySql

CREATE TABLE Note (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME
);

CREATE TABLE Clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(15),
  correo_electronico VARCHAR(100),
  fecha_registro DATE,
  historial_compras TEXT
);

CREATE TABLE Facturas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  numero_factura VARCHAR(20),
  fecha_emision DATE,
  subtotal DECIMAL(10, 2),
  impuestos DECIMAL(10, 2),
  total DECIMAL(10, 2),
  descripcion TEXT
);

CREATE TABLE MateriasPrimas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  cantidad_inicial DECIMAL(10, 2),
  proveedor_id INT,
  fecha_recepcion DATE,
  codigo_unidad VARCHAR(10),
  precio_unitario DECIMAL(10, 2),
  fecha_vencimiento DATE,
  ubicacion_almacen VARCHAR(100),
  descripcion TEXT
);

CREATE TABLE Pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  fecha_pedido DATE,
  fecha_entrega DATE,
  estado_pedido VARCHAR(50),
  detalles_pedido TEXT
);

CREATE TABLE Permisos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  modulo VARCHAR(100),
  rol_id INT,
  descripcion TEXT
);

CREATE TABLE ProductosTerminados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  tipo_dulce VARCHAR(100),
  cantidad_producida INT,
  fecha_produccion DATE,
  precio_venta DECIMAL(10, 2),
  descripcion TEXT
);

CREATE TABLE Proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(15),
  correo_electronico VARCHAR(100),
  sitio_web VARCHAR(255)
);

CREATE TABLE Roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_rol VARCHAR(50),
  descripcion TEXT
);

CREATE TABLE SalidasMateriasPrimas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  materia_prima_id INT,
  cantidad DECIMAL(10, 2),
  fecha_salida DATE,
  destino VARCHAR(100),
  responsable_salida VARCHAR(255),
  descripcion TEXT
);

CREATE TABLE TransaccionesFinancieras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(20),
  monto DECIMAL(10, 2),
  fecha_transaccion DATETIME,
  descripcion TEXT
);

CREATE TABLE Usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(50),
  contrasena VARCHAR(255),
  nombre_completo VARCHAR(255),
  correo_electronico VARCHAR(100),
  rol_id INT
);

CREATE TABLE Ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  monto_total DECIMAL(10, 2),
  fecha_venta DATE,
  metodo_pago VARCHAR(100),
  estado_pedido VARCHAR(50),
  descripcion TEXT
);
