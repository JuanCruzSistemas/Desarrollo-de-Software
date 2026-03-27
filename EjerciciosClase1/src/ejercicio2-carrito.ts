/**
 * EJERCICIO 2: Carrito de Compras
 * ================================
 * Practica: interfaces, arrays, find, filter, map, reduce
 *
 * Completa cada función usando los tipos definidos.
 * NO modifiques las interfaces ni las firmas de las funciones.
 */

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export interface Carrito {
  items: ItemCarrito[];
}

// ─── FUNCIONES A COMPLETAR ────────────────────────────────────────────────────

/**
 * 2a. Agrega un producto al carrito.
 *     - Si el producto ya existe, incrementa su cantidad.
 *     - Si no existe, lo agrega con la cantidad indicada.
 *     - Retorna un NUEVO carrito (no mutes el original).
 */
export function agregarProducto(carrito: Carrito, producto: Producto, cantidad: number): Carrito {
  const carritoNuevo: Carrito = {
    items: []
  };

  carrito.items.forEach(item => carritoNuevo.items.push({ ...item }));

  if (carrito.items.some(item => item.producto === producto)) {
    let indice = carrito.items.map(item => item.producto).indexOf(producto);
    carritoNuevo.items[indice].cantidad += cantidad;
  } else {
    const itemNuevo: ItemCarrito = {
      producto,
      cantidad
    };
    carritoNuevo.items.push(itemNuevo);
  }

  return carritoNuevo;
}

/**
 * 2b. Elimina completamente un producto del carrito por su id.
 *     Retorna un NUEVO carrito.
 */
export function eliminarProducto(carrito: Carrito, productoId: number): Carrito {
  const carritoNuevo: Carrito = {
    items: carrito.items.filter(item => item.producto.id !== productoId)
  };
  
  return carritoNuevo;
}

/**
 * 2c. Calcula el total del carrito (suma de precio * cantidad de cada item).
 *     Retorna el valor redondeado a 2 decimales.
 */
export function calcularTotal(carrito: Carrito): number {
  const totalCarrito: number = parseFloat(carrito.items.map(item => item.producto.precio * item.cantidad)
                                                      .reduce((a, b) => a + b, 0)
                                                      .toFixed(2));
  return totalCarrito;
}

/**
 * 2d. Retorna los nombres de los productos del carrito, en orden alfabético.
 *
 * Ejemplo:
 *   nombresOrdenados(carrito) => ["Banana", "Leche", "Pan"]
 */
export function nombresOrdenados(carrito: Carrito): string[] {
  return carrito.items.map(item => item.producto.nombre)
                      .sort((n1, n2) => n1.localeCompare(n2));
}

/**
 * 2e. Filtra los items del carrito cuyo producto pertenece a la categoría dada.
 *     Retorna un NUEVO carrito solo con esos items.
 */
export function filtrarPorCategoria(carrito: Carrito, categoria: string): Carrito {
  const nuevoCarrito: Carrito = {
    items: carrito.items.filter(item => item.producto.categoria === categoria)
  };
  return nuevoCarrito;
}
