# Modificacion de la tabla Productos Terminados

ALTER TABLE ProductosTerminados
ADD codigo_productT VARCHAR(255);


# Modificiaciones a la Tabla Pedidos se agregaron campos 

ALTER TABLE Pedidos
ADD COLUMN tipo_pago VARCHAR(50),
ADD COLUMN direccion_envio TEXT,
ADD COLUMN notas TEXT,
ADD COLUMN codigo_venta VARCHAR(255);


# Modificación de la tabla ventas para poder usar el trigger
ALTER TABLE Ventas
ADD codigo_materia VARCHAR(255);

# Modificación de la tabla Pedidos 

ALTER TABLE Pedidos
ADD codigo_pedido VARCHAR(255);

## Creacion de un trigger para la generación de un codigo unico para asigarselo al campo de codigo_pedido de la tabla pedidos

DELIMITER //

CREATE FUNCTION GenerarCodigoUnico() RETURNS VARCHAR(255)
BEGIN
  DECLARE codigo VARCHAR(255);
  SET codigo = CONCAT('VP', LPAD(FLOOR(RAND() * 10000), 4, '0'));
  -- Verificar si el código generado ya existe en la tabla
  WHILE EXISTS (SELECT 1 FROM Pedidos WHERE codigo_pedido = codigo) DO
    SET codigo = CONCAT('VP', LPAD(FLOOR(RAND() * 10000), 4, '0'));
  END WHILE;
  RETURN codigo;
END;
//

DELIMITER ;

## Asignación de trigger al campo de la tabla pedidos. Para que al momento de una inserción se le asigne un codigo único al campo

DELIMITER //

CREATE TRIGGER AsignarCodigoUnico
BEFORE INSERT ON Pedidos
FOR EACH ROW
BEGIN
  SET NEW.codigo_pedido = GenerarCodigoUnico();
END;
//

DELIMITER ;


### Trigger para modificar la fecha en la base de datos 

DELIMITER //

-- Trigger para establecer la fecha de venta automáticamente al insertar una nueva venta
CREATE TRIGGER setFechaVentaOnInsert
BEFORE INSERT ON Ventas
FOR EACH ROW
BEGIN
    SET NEW.fecha_venta = NOW(); -- Establece la fecha de venta como la fecha y hora actual
END;
//

DELIMITER ;


## Estos son los Triggers que se usaron en la base de datos para el manejo de datos.

###  Ttigger para Manejar descuento, actualizacion y eliminacion de registro de la materia prima
DELIMITER //
CREATE TRIGGER updateMateriasPrimas
AFTER INSERT ON SalidasMateriasPrimas
FOR EACH ROW
BEGIN
    -- Actualizar la cantidad_inicial en MateriasPrimas después de una inserción
    UPDATE MateriasPrimas
    SET cantidad_inicial = cantidad_inicial - NEW.cantidad
    WHERE codigo_unidad = NEW.codigo_materia_prima;
END;
//

CREATE TRIGGER updateMateriasPrimasOnUpdate
AFTER UPDATE ON SalidasMateriasPrimas
FOR EACH ROW
BEGIN
    -- Actualizar la cantidad_inicial en MateriasPrimas después de una actualización
    UPDATE MateriasPrimas
    SET cantidad_inicial = cantidad_inicial - (NEW.cantidad - OLD.cantidad)
    WHERE codigo_unidad = NEW.codigo_materia_prima;
END;
//

CREATE TRIGGER updateMateriasPrimasOnDelete
AFTER DELETE ON SalidasMateriasPrimas
FOR EACH ROW
BEGIN
    -- Restaurar la cantidad_inicial en MateriasPrimas después de una eliminación
    UPDATE MateriasPrimas
    SET cantidad_inicial = cantidad_inicial + OLD.cantidad
    WHERE codigo_unidad = OLD.codigo_materia_prima;
END;
//
DELIMITER ;




## Trigger para enlazar ventas con MateriasPrimas para llevar el control del stock y lo vendido

DELIMITER //

-- Trigger para actualizar la tabla MateriasPrimas después de una inserción en Ventas
CREATE TRIGGER updateMateriasPrimasOnInsertVentas
AFTER INSERT ON Ventas
FOR EACH ROW
BEGIN
    -- Verificar si el código de materia en Ventas coincide con algún código en MateriasPrimas
    DECLARE materia_id INT;
    SELECT id INTO materia_id FROM MateriasPrimas WHERE codigo_unidad = NEW.codigo_materia;

    -- Si se encuentra un registro en MateriasPrimas, resta el monto_total de Ventas a cantidad_inicial en MateriasPrimas
    IF materia_id IS NOT NULL THEN
        UPDATE MateriasPrimas
        SET cantidad_inicial = cantidad_inicial - NEW.monto_total
        WHERE id = materia_id;
    END IF;
END;
//

-- Trigger para actualizar la tabla MateriasPrimas después de una actualización en Ventas
CREATE TRIGGER updateMateriasPrimasOnUpdateVentas
AFTER UPDATE ON Ventas
FOR EACH ROW
BEGIN
    -- Verificar si el código de materia en Ventas coincide con algún código en MateriasPrimas
    DECLARE materia_id INT;
    SELECT id INTO materia_id FROM MateriasPrimas WHERE codigo_unidad = NEW.codigo_materia;

    -- Si se encuentra un registro en MateriasPrimas, ajusta la cantidad_inicial en MateriasPrimas de acuerdo con la diferencia
    IF materia_id IS NOT NULL THEN
        UPDATE MateriasPrimas
        SET cantidad_inicial = cantidad_inicial - (NEW.monto_total - OLD.monto_total)
        WHERE id = materia_id;
    END IF;
END;
//

-- Trigger para actualizar la tabla MateriasPrimas después de una eliminación en Ventas
CREATE TRIGGER updateMateriasPrimasOnDeleteVentas
AFTER DELETE ON Ventas
FOR EACH ROW
BEGIN
    -- Verificar si el código de materia en Ventas coincide con algún código en MateriasPrimas
    DECLARE materia_id INT;
    SELECT id INTO materia_id FROM MateriasPrimas WHERE codigo_unidad = OLD.codigo_materia;

    -- Si se encuentra un registro en MateriasPrimas, restaura el valor en cantidad_inicial en MateriasPrimas
    IF materia_id IS NOT NULL THEN
        UPDATE MateriasPrimas
        SET cantidad_inicial = cantidad_inicial + OLD.monto_total
        WHERE id = materia_id;
    END IF;
END;
//

DELIMITER ;



# Triggers para poner manejar la parte financiera con con el apartado de materias primas

DELIMITER //

-- Trigger para actualizar la cuenta en CuentasBancarias cuando se modifica una fila en MateriasPrimas
CREATE TRIGGER actualizarCuenta
BEFORE UPDATE ON MateriasPrimas
FOR EACH ROW
BEGIN
  DECLARE saldo_retirado Decimal(10, 2);
  
  -- Calcula el saldo retirado
  SET saldo_retirado = OLD.cantidad_inicial * OLD.precio_unitario;

  -- Actualiza la cuenta en CuentasBancarias
  UPDATE CuentasBancarias
  SET saldo_actual = saldo_actual - saldo_retirado
  WHERE numero_cuenta = NEW.cuenta;
END;
//

-- Trigger para agregar una nueva fila en CuentasBancarias cuando se inserta una nueva fila en MateriasPrimas
CREATE TRIGGER insertarCuenta
AFTER INSERT ON MateriasPrimas
FOR EACH ROW
BEGIN
  -- Calcula el saldo a agregar
  DECLARE saldo_agregar Decimal(10, 2);
  SET saldo_agregar = NEW.cantidad_inicial * NEW.precio_unitario;

  -- Verifica si ya existe una cuenta en CuentasBancarias para la cuenta en MateriasPrimas
  IF (SELECT COUNT(*) FROM CuentasBancarias WHERE numero_cuenta = NEW.cuenta) = 0 THEN
    -- Si no existe, agrega una nueva cuenta
    INSERT INTO CuentasBancarias (numero_cuenta, saldo_actual)
    VALUES (NEW.cuenta, saldo_agregar);
  ELSE
    -- Si existe, actualiza el saldo
    UPDATE CuentasBancarias
    SET saldo_actual = saldo_actual + saldo_agregar
    WHERE numero_cuenta = NEW.cuenta;
  END IF;
END;
//

DELIMITER ;

## Triger para meter al campo de retiros el saldo debitado de la cuenta 

DELIMITER //

-- Trigger para actualizar la cuenta en CuentasBancarias y registrar retiros
CREATE TRIGGER actualizarCuentaYRetiros
BEFORE UPDATE ON MateriasPrimas
FOR EACH ROW
BEGIN
  DECLARE saldo_retirado Decimal(10, 2);
  
  -- Calcula el saldo retirado
  SET saldo_retirado = OLD.cantidad_inicial * OLD.precio_unitario;

  -- Actualiza el cuenta en CuentasBancarias
  UPDATE CuentasBancarias
  SET saldo_actual = saldo_actual - saldo_retirado,
      retiros = retiros + saldo_retirado
  WHERE numero_cuenta = NEW.cuenta;
END;
//

DELIMITER ;


## Triger para manejar el apartado financiero y el apartado de ventas 

DELIMITER //

-- Trigger para insertar ventas y actualizar la cuenta
CREATE TRIGGER actualizarCuentaVenta
AFTER INSERT ON Ventas
FOR EACH ROW
BEGIN
  -- Obtiene el monto total de la venta
  DECLARE monto_venta Decimal(10, 2);
  SET monto_venta = NEW.monto_total;

  -- Actualiza la cuenta en CuentasBancarias si coincide con el número de cuenta de la venta
  UPDATE CuentasBancarias
  SET depositos = depositos + CONCAT(IF(depositos IS NOT NULL, ', ', ''), monto_venta),
      saldo_actual = saldo_actual + monto_venta
  WHERE numero_cuenta = NEW.numero_de_cuenta;
END;
//

DELIMITER ;

### Triger para la actualización de la venta de la cuenta de la venta de la cuenta Bancaria.

DELIMITER //

-- Trigger para manejar actualizaciones en las ventas y la cuenta
CREATE TRIGGER actualizarCuentaVenta
BEFORE UPDATE ON Ventas
FOR EACH ROW
BEGIN
  -- Obtiene el monto total original y el nuevo monto total
  DECLARE monto_original Decimal(10, 2);
  DECLARE monto_nuevo Decimal(10, 2);
  SET monto_original = OLD.monto_total;
  SET monto_nuevo = NEW.monto_total;

  -- Calcula la diferencia entre el monto original y el nuevo monto
  DECLARE diferencia_monto Decimal(10, 2);
  SET diferencia_monto = monto_nuevo - monto_original;

  -- Actualiza la cuenta en CuentasBancarias si coincide con el número de cuenta de la venta
  UPDATE CuentasBancarias
  SET depositos = IF(depositos IS NOT NULL, REPLACE(depositos, monto_original, monto_nuevo), depositos),
      saldo_actual = saldo_actual + diferencia_monto
  WHERE numero_cuenta = NEW.numero_de_cuenta;
END;
//

DELIMITER ;


### Triger para manejar la venta de material 

DELIMITER //

-- Trigger para actualizar cantidad_producida en ProductosTerminados
CREATE TRIGGER preActualizarCantidadProducida
BEFORE INSERT ON Ventas
FOR EACH ROW
BEGIN
  -- Verifica si el código coincide en Ventas y ProductosTerminados
  IF (EXISTS (SELECT 1 FROM ProductosTerminados WHERE codigo = NEW.codigo)) THEN
    -- Obtiene la cantidad de la venta
    SET @cantidad_venta = NEW.cantidad;

    -- Resta la cantidad de la venta a cantidad_producida en ProductosTerminados
    UPDATE ProductosTerminados
    SET cantidad_producida = cantidad_producida - @cantidad_venta
    WHERE codigo = NEW.codigo;
  END IF;
END;
//

DELIMITER ;


### Triger para manejar el descuento de productosTerminados en el area de ventas.

DELIMITER //

-- Trigger para manejar actualizaciones en Ventas y ProductosTerminados
CREATE TRIGGER actualizarCantidadProducida
BEFORE UPDATE ON Ventas
FOR EACH ROW
BEGIN
  -- Obtiene el número de cuenta original
  SET @codigo_original = (SELECT codigo FROM Ventas WHERE id = NEW.id);

  -- Obtiene la cantidad original y la nueva cantidad
  SET @cantidad_original = (SELECT cantidad FROM Ventas WHERE id = NEW.id);
  SET @cantidad_nueva = NEW.cantidad;

  -- Calcula la diferencia entre la cantidad original y la nueva cantidad
  SET @diferencia_cantidad = @cantidad_nueva - @cantidad_original;

  -- Actualiza cantidad_producida en ProductosTerminados si el código coincide
  IF (EXISTS (SELECT 1 FROM ProductosTerminados WHERE codigo = @codigo_original)) THEN
    UPDATE ProductosTerminados
    SET cantidad_producida = cantidad_producida - @diferencia_cantidad
    WHERE codigo = @codigo_original;
  END IF;
  
  -- Actualiza la cantidad en Ventas
  UPDATE Ventas
  SET cantidad = @cantidad_nueva
  WHERE id = NEW.id;
END;
//

DELIMITER ;







