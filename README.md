# **HUGO APP FRAMEWORKS EMPRESARIALES**

## **Descripción:**

En este proyecto, he desarrollado una aplicación web completa que permite a los usuarios buscar restaurantes, ver detalles de restaurantes, gestionar pedidos y visualizar el estado de sus pedidos. La aplicación se basa en una arquitectura dividida entre cliente y servidor, donde el frontend se ha implementado utilizando Angular y el backend se ha desarrollado con Node.js y Express. La base de datos elegida para este proyecto es MySql, lo que me permite manejar relaciones complejas entre los datos.


## **Características:**

**Autenticación de Usuarios:**

Implementé un sistema de autenticación utilizando tokens JWT, lo que permite a los usuarios registrarse, iniciar sesión y acceder a funcionalidades protegidas.

**Búsqueda de Restaurantes:**

Los usuarios pueden buscar restaurantes por nombre o tipo de cocina. Esto se implementa mediante una API que filtra los restaurantes según los criterios de búsqueda.

**Gestión de Pedidos:**

Los usuarios pueden crear pedidos, añadir ítems al pedido y finalizar el pedido. Cada pedido registra detalles como ítems del menú, cantidad, precio total, dirección de entrega y método de pago.


**Visualización del Estado del Pedido:**

Una vez finalizado un pedido, los usuarios pueden ver el estado actual de su pedido, incluyendo los ítems pedidos y el precio total.


## **Tecnologías Utilizadas:**

**Lenguajes de programación:** JavaScript, TypeScript

**Frontend:** Angular

**Backend:** Node.js, Express

**Base de Datos:** MySQL

**Autenticación:** JWT (JSON Web Tokens)

**Arquitectura:** La aplicación sigue una arquitectura modular y orientada a servicios, lo que facilita la escalabilidad y robustez. El backend expone una serie de APIs RESTful que el frontend consume para realizar operaciones CRUD y otras acciones específicas.

## **CRUD y APIs**
**Usuarios:**

**Crear Usuario (Registro):** POST /api/usuarios

**Iniciar Sesión:** POST /api/usuarios/login

**Restaurantes:**

**Buscar Restaurantes:** GET /api/restaurantes/buscar

**Detalles del Restaurante:** GET /api/restaurantes/:restauranteId

**Menú del Restaurante:** GET /api/restaurantes/:restauranteId/menu

**Pedidos:**

**Crear Pedido:** POST /api/pedidos

**Agregar Ítem al Pedido:** POST /api/pedidos/detalle

**Ver Estado del Pedido:** GET /api/pedidos/:pedidoId

## **Cómo Empezar**

Para ejecutar este proyecto localmente, necesitas tener Node.js y SQL Server instalados. Primero, clona el repositorio desde GitHub y luego sigue estos pasos:

**Configurar la Base de Datos:**
Crea una base de datos en SQL Server y ejecuta los scripts SQL proporcionados para configurar las tablas y relaciones.

**Backend:**
Navega al directorio del backend e instala las dependencias con npm install. Configura el archivo .env con tus credenciales de la base de datos y otras configuraciones necesarias. Ejecuta node server.js para iniciar el servidor.

**Frontend:**
Navega al directorio del frontend e instala las dependencias con npm install. Ejecuta ng serve para iniciar la aplicación Angular.
