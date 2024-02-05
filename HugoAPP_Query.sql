USE master;
GO

CREATE DATABASE HugoAppFrameworksEmpresariales;
GO

USE HugoAppFrameworksEmpresariales;
GO

--CREACIÓN DE LAS TABLAS A UTILIZAR:
--Tabla de restaurantes
CREATE TABLE Restaurantes (
    RestauranteID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100),
    Direccion NVARCHAR(255),
    Telefono INT,
    TipoCocina NVARCHAR(50)
);

--Tabla de menus para restaurantes
CREATE TABLE Menus (
    MenuID INT PRIMARY KEY IDENTITY(1,1),
    RestauranteID INT,
    NombrePlato NVARCHAR(100),
    Descripcion NVARCHAR(255),
    Precio DECIMAL(10, 2),
    Tipo NVARCHAR(50), -- Ejemplo: 'Platillo', 'Bebida', 'Acompañamiento'
    FOREIGN KEY (RestauranteID) REFERENCES Restaurantes(RestauranteID)
);

--Tabla de usuario
CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(100),
    Contrasena NVARCHAR(100)
);

--Tabla de pedidos
CREATE TABLE Pedidos (
    PedidoID INT PRIMARY KEY IDENTITY(1,1),
    UsuarioID INT,
    FechaPedido DATETIME,
    Estado NVARCHAR(50) DEFAULT('Preparando'), -- Ejemplo: 'Preparando', 'En camino', 'Entregado'
    Total DECIMAL(10, 2),
    DireccionEntrega NVARCHAR(255),
    MetodoPago NVARCHAR(50), -- Ejemplo: 'Efectivo', 'Tarjeta'
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

--Tabla de detalles del pedido
CREATE TABLE DetallePedidos (
    DetalleID INT PRIMARY KEY IDENTITY(1,1),
    PedidoID INT,
    MenuID INT,
    Cantidad INT,
    Precio DECIMAL(10, 2),
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    FOREIGN KEY (MenuID) REFERENCES Menus(MenuID)
);

--POBLAR TABLAS PARA PODER MOSTRAR EN EL SISTEMA
INSERT INTO Restaurantes (Nombre, Direccion, Telefono, TipoCocina) VALUES 
('Pizza Hut', 'Calle 123, Ciudad', '5551234', 'Comida Rápida'),
('McDonalds', 'Avenida 456, Ciudad', '5555678', 'Comida Rápida'),
('Burger King', 'Bulevar 789, Ciudad', '5559012', 'Comida Rápida'),
('Hooters', 'Calle 1011, Ciudad', '5553456', 'Comida Rápida'),
('Tortas de LIPS', 'Calle 1213, Ciudad', '5557890', 'Mexicana'),
('Taco Bell', 'Avenida 1415, Ciudad', '5551122', 'Mexicana'),
('Tipicos Margot', 'Calle 1617, Ciudad', '5553344', 'Salvadoreña'),
('China Wok', 'Avenida 1819, Ciudad', '5555566', 'China'),
('Olives Garden', 'Bulevar 2021, Ciudad', '5557788', 'Italiana'),
('Las Brumas', 'Calle 2223, Ciudad', '5559900', 'Caro');

--POBLAR LA TABLA DE MENUS, PARA ESO USARÉ UN CICLO WHILE QUE POR ORDEN DE ID POBLE CADA RESTAURANTE CON LOS MISMOS MENÚS GENERICOS
DECLARE @i INT = 1;
WHILE @i <= 10
BEGIN
    -- Insertar 3 Platillos para cada Restaurante
    INSERT INTO Menus (RestauranteID, NombrePlato, Descripcion, Precio, Tipo) VALUES 
    (@i, 'Platillo 1', 'Descripción del Platillo 1', 10.00, 'Platillo'),
    (@i, 'Platillo 2', 'Descripción del Platillo 2', 12.00, 'Platillo'),
    (@i, 'Platillo 3', 'Descripción del Platillo 3', 15.00, 'Platillo');

    -- Insertar 2 Bebidas para cada Restaurante
    INSERT INTO Menus (RestauranteID, NombrePlato, Descripcion, Precio, Tipo) VALUES 
    (@i, 'Bebida 1', 'Descripción de la Bebida 1', 2.00, 'Bebida'),
    (@i, 'Bebida 2', 'Descripción de la Bebida 2', 3.00, 'Bebida');

    -- Insertar 3 Acompañamientos para cada Restaurante
    INSERT INTO Menus (RestauranteID, NombrePlato, Descripcion, Precio, Tipo) VALUES 
    (@i, 'Acompañamiento 1', 'Descripción del Acompañamiento 1', 5.00, 'Acompañamiento'),
    (@i, 'Acompañamiento 2', 'Descripción del Acompañamiento 2', 4.50, 'Acompañamiento'),
    (@i, 'Acompañamiento 3', 'Descripción del Acompañamiento 3', 6.00, 'Acompañamiento');

    SET @i = @i + 1;
END

--POBLAR LA TABLA DE USUARIO, EL UNICO USUARIO QUE USARE PARA EL EJEMPLO:
INSERT INTO Usuarios (Email, Contrasena) VALUES
('MarioOscar', 'aspnet12'),
('EmilianoTorres', 'Minecraft');

--AHORA SOLO POR FINES DE PRUEBA Y VER QUE FUNCIONE, PONDRE UN PEDIDO DE MANERA MANUAL.
-- Inserta un usuario para el ejemplo
DECLARE @UsuarioID INT;
SELECT @UsuarioID = UsuarioID FROM Usuarios WHERE Email = 'EmilianoTorres';

-- Inserta un pedido para el usuario
INSERT INTO Pedidos (UsuarioID, FechaPedido, Estado, Total, DireccionEntrega, MetodoPago)
VALUES (@UsuarioID, GETDATE(), 'Entregado', 0.00, 'Cojutepeque, Cuscatlan', 'Efectivo');

-- Guarda el ID del pedido insertado
DECLARE @PedidoID INT = SCOPE_IDENTITY();

-- Inserta los detalles del pedido
-- Suponiendo que ya se han insertado los menús para el RestauranteID 1
INSERT INTO DetallePedidos (PedidoID, MenuID, Cantidad, Precio)
SELECT TOP 1 @PedidoID, MenuID, 2, Precio FROM Menus WHERE RestauranteID = 1 AND Tipo = 'Platillo'
UNION ALL
SELECT TOP 1 @PedidoID, MenuID, 3, Precio FROM Menus WHERE RestauranteID = 1 AND Tipo = 'Bebida'
UNION ALL
SELECT TOP 2 @PedidoID, MenuID, 1, Precio FROM Menus WHERE RestauranteID = 1 AND Tipo = 'Acompañamiento';

-- Actualiza el total del pedido con la sumatoria de los detalles
UPDATE Pedidos
SET Total = (SELECT SUM(Precio * Cantidad) FROM DetallePedidos WHERE PedidoID = @PedidoID)
WHERE PedidoID = @PedidoID;

-- Verifica los datos insertados
SELECT * FROM Pedidos WHERE PedidoID = @PedidoID;
SELECT * FROM DetallePedidos WHERE PedidoID = @PedidoID;

--Ver las tablas pobladas:
SELECT * FROM Restaurantes;
SELECT * FROM Menus;ww
SELECT * FROM Usuarios;
SELECT * FROM Pedidos;
SELECT * FROM DetallePedidos;

-- Consulta para obtener los detalles del pedido de un Usuario en especifico
SELECT 
    p.PedidoID,
    p.UsuarioID,
    p.FechaPedido,
    p.Estado,
    p.DireccionEntrega,
    p.MetodoPago,
    r.Nombre AS NombreRestaurante,
    r.Direccion AS DireccionRestaurante,
    m.NombrePlato,
    dp.Cantidad,
    dp.Precio,
	p.Total
FROM 
    Pedidos p
INNER JOIN 
    DetallePedidos dp ON p.PedidoID = dp.PedidoID
INNER JOIN 
    Menus m ON dp.MenuID = m.MenuID
INNER JOIN 
    Restaurantes r ON m.RestauranteID = r.RestauranteID
WHERE 
    p.UsuarioID = 4;