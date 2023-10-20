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



