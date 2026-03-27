/**
 * EJERCICIO 1: Gestión de Estudiantes
 * =====================================
 * Practica: interfaces, arrays, filter, map, reduce, sort
 *
 * Completa cada función usando los tipos definidos.
 * NO modifiques las interfaces ni las firmas de las funciones.
 */

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  notas: number[]; // notas del 1 al 10
  curso: string;
}

export interface ResumenEstudiante {
  nombreCompleto: string;
  promedio: number;
  aprobado: boolean; // promedio >= 6
}

// ─── FUNCIONES A COMPLETAR ────────────────────────────────────────────────────

/**
 * 1a. Dado un array de estudiantes, retorna solo los que pertenecen a un curso dado.
 *
 * Ejemplo:
 *   filtrarPorCurso(estudiantes, "3A") => [todos los de 3A]
 */
export function filtrarPorCurso(estudiantes: Estudiante[], curso: string): Estudiante[] {
  return estudiantes.filter(e => e.curso === curso);
}

/**
 * 1b. Calcula el promedio de notas de un estudiante.
 *     Redondea a 2 decimales.
 *
 * Ejemplo:
 *   calcularPromedio({ notas: [8, 6, 10] }) => 8
 */
export function calcularPromedio(estudiante: Estudiante): number {
  let promedio: number =  estudiante.notas.reduce((n1, n2) => n1 + n2) / estudiante.notas.length;
  let promedioRedondeado: number = parseFloat(promedio.toFixed(2));
  return promedioRedondeado;
}

/**
 * 1c. Convierte un array de Estudiante[] en ResumenEstudiante[].
 *     Usa calcularPromedio internamente.
 *
 * Ejemplo:
 *   generarResumenes([{ nombre: "Ana", apellido: "López", notas: [7, 8] }])
 *   => [{ nombreCompleto: "Ana López", promedio: 7.5, aprobado: true }]
 */
export function generarResumenes(estudiantes: Estudiante[]): ResumenEstudiante[] {
  const resumenes: ResumenEstudiante[] = estudiantes.map(estudiante => {

    const promedioEstudiante = calcularPromedio(estudiante);
    
    return {
      nombreCompleto: estudiante.nombre + " " + estudiante.apellido,
      promedio: promedioEstudiante,
      aprobado: promedioEstudiante >= 6
    }
  });

  return resumenes;
}

/**
 * 1d. Retorna los estudiantes ordenados por promedio de mayor a menor.
 *
 * Ejemplo:
 *   ordenarPorPromedio([ana(prom=6), bob(prom=9)]) => [bob, ana]
 */
export function ordenarPorPromedio(estudiantes: Estudiante[]): Estudiante[] {
  return estudiantes.sort((e1, e2) => calcularPromedio(e2) - calcularPromedio(e1));
}

/**
 * 1e. Retorna el promedio general de todos los estudiantes del array.
 *     Si el array está vacío, retorna 0.
 */
export function promedioGeneral(estudiantes: Estudiante[]): number {
  if (estudiantes.length === 0) return 0;
  const promedioGeneral = estudiantes.map(e => calcularPromedio(e)).reduce((p1, p2) => p1 + p2, 0) / estudiantes.length;
  return promedioGeneral;
}
