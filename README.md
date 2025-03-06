# Documentación del Modelo de Dominio E-commerce

## Estructura del Proyecto

Este proyecto implementa un diseño dirigido por el dominio (DDD) y arquitectura hexagonal para un sistema de comercio electrónico. Los componentes principales están organizados en la siguiente estructura:

```
src/
├── ecomerce/
│   ├── application/
│   │   ├── service/      # Servicios de aplicación
│   │   └── usercase/     # Casos de uso
│   ├── domain/
│   │   ├── carrito/      # Dominio del carrito de compras
│   │   ├── events/       # Eventos del dominio
│   │   ├── favoritos/    # Gestión de favoritos
│   │   ├── productos/    # Dominio de productos
│   │   ├── shared/       # Componentes compartidos
│   │   ├── user/         # Dominio de usuarios
│   │   └── value-objects/# Objetos de valor
│   └── infrastucture/
│       ├── controllers/  # Controladores
│       ├── persistence/  # Persistencia de datos
│       └── repositories/ # Implementación de repositorios
└── express/
    ├── domain/          # Dominio específico de Express
    └── infrastucture/   # Configuración de Express
```

## Capas de la Arquitectura

### 1. Capa de Dominio (domain/)
- **Productos**: Gestión de productos y catálogo
- **Carrito**: Lógica del carrito de compras
- **Favoritos**: Gestión de productos favoritos
- **Usuarios**: Gestión de usuarios y autenticación
- **Eventos**: Sistema de eventos del dominio
- **Objetos de Valor**: Implementaciones inmutables

### 2. Capa de Aplicación (application/)
- **Servicios**: Implementación de la lógica de negocio
- **Casos de Uso**: Orquestación de operaciones del dominio

### 3. Capa de Infraestructura (infrastucture/)
- **Controladores**: Manejo de peticiones HTTP
- **Persistencia**: Implementación del almacenamiento
- **Repositorios**: Implementación de interfaces del dominio

## Patrones de Diseño Utilizados

1. **Arquitectura Hexagonal**
   - Separación clara entre dominio y detalles técnicos
   - Inversión de dependencias
   - Puertos y adaptadores

2. **Patrón Repositorio**
   - Abstracción del almacenamiento de datos
   - Interfaces en el dominio
   - Implementaciones en infraestructura

3. **Patrón Servicio de Aplicación**
   - Orquestación de operaciones del dominio
   - Manejo de transacciones
   - Coordinación entre diferentes agregados

4. **Eventos de Dominio**
   - Comunicación entre agregados
   - Desacoplamiento de componentes
   - Consistencia eventual

## Componentes Principales

### Productos
- Gestión del catálogo
- Categorización
- Precios y stock
- Productos digitales y físicos

### Carrito de Compras
- Agregar/remover productos
- Cálculo de totales
- Gestión de cantidades

### Usuarios
- Registro y autenticación
- Perfiles de usuario
- Historial de compras

### Favoritos
- Guardar productos favoritos
- Listas personalizadas
- Notificaciones

## Eventos del Dominio

- **ProductoCreatedEvent**: Creación de productos
- **ProductoUpdatedEvent**: Actualización de productos
- **UserCreatedEvent**: Registro de usuarios
- **CarritoModifiedEvent**: Cambios en el carrito

## Ejemplos de Uso

### Crear un Usuario
```typescript
const usuario = new Usuario({
  id: "user-123",
  email: "usuario@ejemplo.com",
  nombre: "Usuario Ejemplo"
});
```

### Agregar Producto al Carrito
```typescript
const carrito = new Carrito(userId);
await carrito.agregarProducto({
  productoId: "prod-123",
  cantidad: 2
});
```
