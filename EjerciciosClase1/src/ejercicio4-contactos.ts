/**
 * EJERCICIO 4: Agenda de Contactos
 * ==================================
 * Practica: interfaces, arrays, strings, find, filter, sort, some
 *
 * Completa cada función usando los tipos definidos.
 * NO modifiques las interfaces ni las firmas de las funciones.
 */

export interface Contacto {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;   // formato: "XXX-XXXXXXX"
  email: string;
  etiquetas: string[]; // ej: ["amigo", "trabajo", "familia"]
}

// ─── FUNCIONES A COMPLETAR ────────────────────────────────────────────────────

/**
 * 4a. Busca contactos cuyo nombre O apellido contengan el texto buscado.
 *     La búsqueda NO distingue mayúsculas/minúsculas.
 *
 * Ejemplo:
 *   buscar(contactos, "mar") => [María García, Marco Rodríguez, ...]
 */
export function buscar(contactos: Contacto[], texto: string): Contacto[] {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 4b. Retorna todos los contactos que tengan la etiqueta indicada.
 *
 * Ejemplo:
 *   filtrarPorEtiqueta(contactos, "trabajo") => [todos con etiqueta "trabajo"]
 */
export function filtrarPorEtiqueta(
  contactos: Contacto[],
  etiqueta: string
): Contacto[] {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 4c. Retorna los contactos ordenados alfabéticamente por apellido,
 *     y en caso de empate, por nombre.
 */
export function ordenarPorApellido(contactos: Contacto[]): Contacto[] {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 4d. Formatea el nombre completo de un contacto como "APELLIDO, Nombre".
 *
 * Ejemplo:
 *   formatearNombre({ nombre: "María", apellido: "García" })
 *   => "GARCÍA, María"
 */
export function formatearNombre(contacto: Contacto): string {
  // TODO: implementar
  throw new Error("No implementado");
}

/**
 * 4e. Valida si un email tiene formato válido básico: contiene "@" y un "." después del "@".
 *     Retorna true si es válido, false si no.
 *
 * Ejemplo:
 *   validarEmail("usuario@ejemplo.com") => true
 *   validarEmail("usuarioejemplo.com")  => false
 *   validarEmail("usuario@ejemplo")     => false
 */
export function validarEmail(email: string): boolean {
  // TODO: implementar
  throw new Error("No implementado");
}
