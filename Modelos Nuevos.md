# Estos son los modelos nuevos que se han creado para el proyecto de la Base de Datos 

### Nuevos campos agg para la tabla ventas 

ALTER TABLE Ventas
ADD codigo VARCHAR(255) NULL,
ADD numero_de_cuenta VARCHAR(255) NULL,
ADD cantidad VARCHAR(255) NULL;

### Se agrego nuevo campo a la tabla materia para poder registrar el consumo de saldo de materias primas 

ALTER TABLE MateriasPrimas
ADD cuenta VARCHAR(255);

## Todos los modelo generados de Prisma de la base de datos.

model Note {
  id        Int       @id @unique(map: "id_UNIQUE") @default(autoincrement())
  title     String?   @db.VarChar(255)
  content   String?   @db.Text
  createdAt DateTime? @db.DateTime(0)
  updatedAt DateTime? @db.DateTime(0)
}

model Clientes {
  id                 Int       @id @unique(map: "id_UNIQUE") @default(autoincrement())
  nombre             String?   @db.VarChar(255)
  direccion          String?   @db.VarChar(255)
  telefono           String?   @db.VarChar(15)
  correo_electronico String?   @db.VarChar(100)
  fecha_registro     DateTime? @db.Date
  historial_compras  String?   @db.Text
  Pedidos            Pedidos[]
  Ventas             Ventas[]
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
  Ventas         Ventas?   @relation(fields: [venta_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_Facturas_Ventas")

  @@index([venta_id], map: "fk_Facturas_Ventas_idx")
}

model MateriasPrimas {
  id                    Int                     @id @unique(map: "id_UNIQUE") @default(autoincrement())
  nombre                String?                 @db.VarChar(255)
  cantidad_inicial      Decimal?                @db.Decimal(10, 2)
  proveedor_id          Int?
  fecha_recepcion       DateTime?               @db.Date
  codigo_unidad         String?                 @db.VarChar(10)
  precio_unitario       Decimal?                @db.Decimal(10, 2)
  fecha_vencimiento     DateTime?               @db.Date
  ubicacion_almacen     String?                 @db.VarChar(100)
  descripcion           String?                 @db.Text
  Proveedores           Proveedores?            @relation(fields: [proveedor_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_MateriasPrimas_Proveedores")
  SalidasMateriasPrimas SalidasMateriasPrimas[]

  @@index([proveedor_id], map: "fk_MateriasPrimas_Proveedores_idx")
}

model Pedidos {
  id              Int       @id @default(autoincrement())
  cliente_id      Int?
  fecha_pedido    DateTime? @db.Date
  fecha_entrega   DateTime? @db.Date
  estado_pedido   String?   @db.VarChar(50)
  detalles_pedido String?   @db.Text
  Clientes        Clientes? @relation(fields: [cliente_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_Pedidos_Clientes")

  @@index([cliente_id], map: "fk_Pedidos_Clientes_idx")
}

model Permisos {
  id          Int     @id @default(autoincrement())
  modulo      String? @db.VarChar(100)
  rol_id      Int?
  descripcion String? @db.Text
  Roles       Roles?  @relation(fields: [rol_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_Permisos_Roles")

  @@index([rol_id], map: "fk_Permisos_Roles_idx")
}

model ProductosTerminados {
  id                 Int       @id @unique(map: "id_UNIQUE") @default(autoincrement())
  nombre             String?   @db.VarChar(255)
  tipo_dulce         String?   @db.VarChar(100)
  cantidad_producida Int?
  fecha_produccion   DateTime? @db.Date
  precio_venta       Decimal?  @db.Decimal(10, 2)
  descripcion        String?   @db.Text
}

model Proveedores {
  id                 Int              @id @unique(map: "id_UNIQUE") @default(autoincrement())
  nombre             String?          @db.VarChar(255)
  direccion          String?          @db.VarChar(255)
  telefono           String?          @db.VarChar(15)
  correo_electronico String?          @db.VarChar(100)
  sitio_web          String?          @db.VarChar(255)
  MateriasPrimas     MateriasPrimas[]
}

model Roles {
  id          Int        @id @unique(map: "id_UNIQUE") @default(autoincrement())
  nombre_rol  String?    @db.VarChar(50)
  descripcion String?    @db.Text
  Permisos    Permisos[]
  Usuarios    Usuarios[]
}

model SalidasMateriasPrimas {
  id                 Int             @id @default(autoincrement())
  materia_prima_id   Int?
  cantidad           Decimal?        @db.Decimal(10, 2)
  fecha_salida       DateTime?       @db.Date
  destino            String?         @db.VarChar(100)
  responsable_salida String?         @db.VarChar(255)
  descripcion        String?         @db.Text
  MateriasPrimas     MateriasPrimas? @relation(fields: [materia_prima_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_SalidasMateriasPrimas_MateriasPrimas")

  @@index([materia_prima_id], map: "fk_SalidasMateriasPrimas_MateriasPrimas_idx")
}

model TransaccionesFinancieras {
  id                Int       @id @unique(map: "id_UNIQUE") @default(autoincrement())
  tipo              String?   @db.VarChar(20)
  monto             Decimal?  @db.Decimal(10, 2)
  fecha_transaccion DateTime? @db.DateTime(0)
  descripcion       String?   @db.Text
}

model Usuarios {
  id                 Int     @id @unique(map: "id_UNIQUE") @default(autoincrement())
  nombre_usuario     String? @db.VarChar(50)
  contrasena         String? @db.VarChar(255)
  nombre_completo    String? @db.VarChar(255)
  correo_electronico String? @db.VarChar(100)
  rol_id             Int?
  Roles              Roles?  @relation(fields: [rol_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_Usuarios_Roles")

  @@index([rol_id], map: "fk_Usuarios_Roles_idx")
}

model Ventas {
  id            Int        @id @default(autoincrement())
  cliente_id    Int?
  monto_total   Decimal?   @db.Decimal(10, 2)
  fecha_venta   DateTime?  @db.Date
  metodo_pago   String?    @db.VarChar(100)
  estado_pedido String?    @db.VarChar(50)
  descripcion   String?    @db.Text
  Facturas      Facturas[]
  Clientes      Clientes?  @relation(fields: [cliente_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_Ventas_Clientes")

  @@index([cliente_id], map: "fk_Ventas_Clientes_idx")
}



## Estos son los comando Sql de MySql para la creacion de las tablas en la base de datos para que sean relacional 


-- Modelo Note
CREATE TABLE Note (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  createdAt DATETIME,
  updatedAt DATETIME,
  UNIQUE INDEX id_UNIQUE (id ASC)
);

-- Modelo Clientes
CREATE TABLE Clientes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(15),
  correo_electronico VARCHAR(100),
  fecha_registro DATE,
  historial_compras TEXT,
  UNIQUE INDEX id_UNIQUE (id ASC)
);

-- Modelo Facturas
CREATE TABLE Facturas (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  numero_factura VARCHAR(20),
  fecha_emision DATE,
  subtotal DECIMAL(10, 2),
  impuestos DECIMAL(10, 2),
  total DECIMAL(10, 2),
  descripcion TEXT,
  INDEX fk_Facturas_Ventas_idx (venta_id ASC),
  CONSTRAINT fk_Facturas_Ventas
    FOREIGN KEY (venta_id)
    REFERENCES Ventas (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Modelo MateriasPrimas
CREATE TABLE MateriasPrimas (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  cantidad_inicial DECIMAL(10, 2),
  proveedor_id INT,
  fecha_recepcion DATE,
  codigo_unidad VARCHAR(10),
  precio_unitario DECIMAL(10, 2),
  fecha_vencimiento DATE,
  ubicacion_almacen VARCHAR(100),
  descripcion TEXT,
  UNIQUE INDEX id_UNIQUE (id ASC),
  INDEX fk_MateriasPrimas_Proveedores_idx (proveedor_id ASC),
  CONSTRAINT fk_MateriasPrimas_Proveedores
    FOREIGN KEY (proveedor_id)
    REFERENCES Proveedores (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Modelo Pedidos
CREATE TABLE Pedidos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  fecha_pedido DATE,
  fecha_entrega DATE,
  estado_pedido VARCHAR(50),
  detalles_pedido TEXT,
  INDEX fk_Pedidos_Clientes_idx (cliente_id ASC),
  CONSTRAINT fk_Pedidos_Clientes
    FOREIGN KEY (cliente_id)
    REFERENCES Clientes (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Modelo Permisos
CREATE TABLE Permisos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  modulo VARCHAR(100),
  rol_id INT,
  descripcion TEXT,
  INDEX fk_Permisos_Roles_idx (rol_id ASC),
  CONSTRAINT fk_Permisos_Roles
    FOREIGN KEY (rol_id)
    REFERENCES Roles (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Modelo ProductosTerminados
CREATE TABLE ProductosTerminados (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  tipo_dulce VARCHAR(100),
  cantidad_producida INT,
  fecha_produccion DATE,
  precio_venta DECIMAL(10, 2),
  descripcion TEXT,
  UNIQUE INDEX id_UNIQUE (id ASC)
);

-- Modelo Proveedores
CREATE TABLE Proveedores (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(15),
  correo_electronico VARCHAR(100),
  sitio_web VARCHAR(255),
  UNIQUE INDEX id_UNIQUE (id ASC)
);

-- Modelo Roles
CREATE TABLE Roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre_rol VARCHAR(50),
  descripcion TEXT,
  UNIQUE INDEX id_UNIQUE (id ASC)
);

-- Modelo SalidasMateriasPrimas
CREATE TABLE SalidasMateriasPrimas (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  materia_prima_id INT,
  cantidad DECIMAL(10, 2),
  fecha_salida DATE,
  destino VARCHAR(100),
  responsable_salida VARCHAR(255),
  descripcion TEXT,
  INDEX fk_SalidasMateriasPrimas_MateriasPrimas_idx (materia_prima_id ASC),
  CONSTRAINT fk_SalidasMateriasPrimas_MateriasPrimas
    FOREIGN KEY (materia_prima_id)
    REFERENCES MateriasPrimas (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Modelo TransaccionesFinancieras
CREATE TABLE TransaccionesFinancieras (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(20),
  monto DECIMAL(10, 2),
  fecha_transaccion DATETIME,
  descripcion TEXT,
  UNIQUE INDEX id_UNIQUE (id ASC)
);

-- Modelo Usuarios
CREATE TABLE Usuarios (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(50),
  contrasena VARCHAR(255),
  nombre_completo VARCHAR(255),
  correo_electronico VARCHAR(100),
  rol_id INT,
  UNIQUE INDEX id_UNIQUE (id ASC),
  INDEX fk_Usuarios_Roles_idx (rol_id ASC),
  CONSTRAINT fk_Usuarios_Roles
    FOREIGN KEY (rol_id)
    REFERENCES Roles (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Modelo Ventas
CREATE TABLE Ventas (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  monto_total DECIMAL(10, 2),
  fecha_venta DATE,
  metodo_pago VARCHAR(100),
  estado_pedido VARCHAR(50),
  descripcion TEXT,
  INDEX fk_Ventas_Clientes_idx (cliente_id ASC),
  CONSTRAINT fk_Ventas_Clientes
    FOREIGN KEY (cliente_id)
    REFERENCES Clientes (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);



## Este es el orden en que debe ejecutarse los comando para que no haya errores de llaves foraneas

Tablas principales sin dependencias:

Comienza creando las tablas que no tienen dependencias con otras tablas, es decir, las tablas que no tienen claves foráneas hacia otras tablas. En tu caso, podrías comenzar con las tablas Roles, ProductosTerminados, Proveedores, Usuarios, TransaccionesFinancieras, Note, y Clientes.

Tablas intermedias con dependencias:

Luego, crea las tablas que dependen de las tablas creadas en el paso anterior y que tienen claves foráneas hacia esas tablas. En tu caso, esto incluiría las tablas Facturas, MateriasPrimas, Pedidos, Permisos, SalidasMateriasPrimas, y Ventas.

Tablas finales con dependencias:

Finalmente, crea las tablas que dependen de las tablas creadas en los pasos anteriores y que tienen claves foráneas hacia esas tablas. En tu caso, esto incluiría la tabla Ventas, que depende de Clientes y Facturas.

