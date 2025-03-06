# Documentación del Modelo de Dominio E-commerce

## Estructura del Proyecto

Este proyecto implementa un diseño dirigido por el dominio (DDD) para un sistema de comercio electrónico. Los componentes principales están organizados en la siguiente estructura:

```
src/
└── ecomerce/
    └── domain/
        └── productos/
            ├── AbstractProducto.ts       # Clase base abstracta de productos
            ├── Producto.ts               # Implementación de producto estándar
            ├── ProductoDigital.ts        # Implementación de producto digital
            ├── ProductoNull.ts           # Implementación del patrón Objeto Nulo
            ├── ProductoFactory.ts        # Implementación del patrón Fábrica
            └── DomainProductos.ts        # Interfaces y DTOs del dominio
```

## Patrones de Diseño Utilizados

1. **Patrón Método Plantilla** (AbstractProducto.ts)
   - Define la estructura de las operaciones de productos
   - Permite a las subclases sobrescribir pasos específicos
   - Ejemplo: métodos `reducirStock()` y `aumentarStock()`

2. **Patrón Fábrica** (ProductoFactory.ts)
   - Crea diferentes tipos de productos
   - Encapsula la lógica de creación de productos
   - Facilita la extensibilidad para nuevos tipos de productos

3. **Patrón Constructor** (Producto.ts, ProductoDigital.ts)
   - Proporciona una interfaz fluida para la creación de productos
   - Separa la construcción de la representación
   - Hace más legible la creación de objetos complejos

4. **Patrón Objeto Nulo** (ProductoNull.ts)
   - Proporciona comportamiento seguro por defecto
   - Elimina verificaciones de nulos
   - Implementa el patrón Singleton para eficiencia

5. **Patrón Visitante** (Todas las clases de productos)
   - Permite agregar operaciones sin modificar las clases
   - Separa los algoritmos de la estructura del objeto
   - Habilita el despacho doble

## Comunicación entre Clases

### AbstractProducto
- Clase base para todos los tipos de productos
- Define atributos y comportamientos comunes
- Se comunica con el sistema de eventos a través de ProductoEventEmitter
- Implementa validaciones básicas y manejo de stock

### Producto (Producto Estándar)
- Hereda de AbstractProducto
- Agrega funcionalidades para productos físicos
- Se comunica con ProductoEventEmitter para eventos de dominio
- Maneja descuentos y productos destacados

### ProductoDigital
- Hereda de AbstractProducto
- Especializado en productos digitales
- Maneja escenarios de stock ilimitado
- Se comunica con el sistema de eventos para descargas

### ProductoNull
- Implementa comportamiento seguro por defecto
- No se comunica con otros componentes
- Retorna valores seguros y lanza errores apropiados

### ProductoFactory
- Crea instancias de productos
- Se comunica con todas las clases de productos
- Utiliza los constructores de cada tipo de producto

## Eventos del Dominio

- **ProductoCreatedEvent**: Cuando se crea un nuevo producto
- **ProductoUpdatedEvent**: Cuando cambian los atributos
- **ProductoStockChangedEvent**: Para modificaciones de stock

## Ejemplos de Uso

### Crear un Producto Estándar
```typescript
const producto = Producto.builder()
  .withNombre("Laptop")
  .withDescripcion("Laptop de alto rendimiento")
  .withPrecio(Money.fromValue(999.99))
  .withStock(10)
  .withCategoria("electrónica")
  .build();
```

### Crear un Producto Digital
```typescript
const productoDigital = ProductoDigital.builder()
  .withNombre("E-book")
  .withDescripcion("Libro digital")
  .withPrecio(Money.fromValue(19.99))
  .withStockIlimitado()
  .withFormato(FormatoDigital.PDF)
  .build();
```

### Usar la Fábrica
```typescript
const producto = ProductoFactory.crearProducto(
  TipoProducto.ESTANDAR,
  {
    nombre: "Laptop",
    descripcion: "Laptop de alto rendimiento",
    precio: 999.99,
    stock: 10,
    categoriaId: "electrónica"
  }
);
```

## Mejores Prácticas Implementadas

1. **Inmutabilidad**
   - Propiedades de solo lectura cuando es posible
   - Copias defensivas de fechas y arrays

2. **Validación**
   - Validación de entrada en constructores
   - Validación de reglas de negocio en métodos
   - Mensajes de error apropiados

3. **Manejo de Eventos**
   - Eventos de dominio para cambios de estado
   - Emisión consistente de eventos
   - Supresión de eventos cuando es necesario
