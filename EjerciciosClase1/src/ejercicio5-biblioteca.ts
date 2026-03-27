/**
 * EJERCICIO 5: Biblioteca
 * ========================
 * Practica: interfaces anidadas, arrays, flatMap, every, some, reduce, groupBy
 *
 * Completa cada función usando los tipos definidos.
 * NO modifiques las interfaces ni las firmas de las funciones.
 */

export interface Autor {
  nombre: string;
  apellido: string;
  nacionalidad: string;
}

export interface Libro {
  isbn: string;
  titulo: string;
  autor: Autor;
  anio: number;
  generos: string[];
  disponible: boolean;
}

export interface EstadisticasBiblioteca {
  totalLibros: number;
  librosDisponibles: number;
  generos: string[];         // lista de géneros únicos, ordenados alfabéticamente
  autorMasLibros: string;    // "Apellido, Nombre" del autor con más libros
}

// ─── FUNCIONES A COMPLETAR ────────────────────────────────────────────────────

/**
 * 5a. Retorna los libros disponibles de un género específico.
 *     La comparación de géneros NO distingue mayúsculas/minúsculas.
 */
export function buscarPorGenero(libros: Libro[], genero: string): Libro[] {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 5b. Retorna todos los libros de un autor (por apellido, case insensitive).
 */
export function buscarPorAutor(libros: Libro[], apellido: string): Libro[] {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 5c. Retorna los libros publicados entre dos años (inclusive).
 *     Ordena el resultado por año de publicación ascendente.
 */
export function buscarPorRangoAnio(
  libros: Libro[],
  desde: number,
  hasta: number
): Libro[] {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 5d. Retorna una lista de géneros únicos presentes en el catálogo,
 *     ordenados alfabéticamente.
 *
 * Pista: usa flatMap para extraer todos los géneros y luego elimina duplicados.
 */
export function generosUnicos(libros: Libro[]): string[] {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 5e. Genera las estadísticas completas de la biblioteca.
 *     Usa las funciones anteriores donde sea posible.
 */
export function obtenerEstadisticas(libros: Libro[]): EstadisticasBiblioteca {
  // TODO: implementar
  throw new Error("No implementado");
}
