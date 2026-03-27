import {
  Estudiante,
  ResumenEstudiante,
  filtrarPorCurso,
  calcularPromedio,
  generarResumenes,
  ordenarPorPromedio,
  promedioGeneral,
} from "./ejercicio1-estudiantes";

const estudiantes: Estudiante[] = [
  { id: 1, nombre: "Ana",    apellido: "López",    notas: [8, 9, 7],    curso: "3A" },
  { id: 2, nombre: "Bruno",  apellido: "Martínez", notas: [5, 6, 4],    curso: "3B" },
  { id: 3, nombre: "Carla",  apellido: "Gómez",    notas: [10, 10, 9],  curso: "3A" },
  { id: 4, nombre: "Diego",  apellido: "Sosa",     notas: [3, 4, 5],    curso: "3B" },
  { id: 5, nombre: "Elena",  apellido: "Ruiz",     notas: [6, 7, 6],    curso: "3A" },
];

describe("Ejercicio 1 – Gestión de Estudiantes", () => {

  describe("1a. filtrarPorCurso", () => {
    it("retorna los estudiantes del curso indicado", () => {
      const resultado = filtrarPorCurso(estudiantes, "3A");
      expect(resultado).toHaveLength(3);
      expect(resultado.map(e => e.nombre)).toEqual(["Ana", "Carla", "Elena"]);
    });

    it("retorna array vacío si nadie pertenece al curso", () => {
      expect(filtrarPorCurso(estudiantes, "4C")).toEqual([]);
    });

    it("no muta el array original", () => {
      filtrarPorCurso(estudiantes, "3A");
      expect(estudiantes).toHaveLength(5);
    });
  });

  describe("1b. calcularPromedio", () => {
    it("calcula el promedio correctamente", () => {
      expect(calcularPromedio(estudiantes[0])).toBe(8);    // (8+9+7)/3
      expect(calcularPromedio(estudiantes[2])).toBeCloseTo(9.67, 1); // (10+10+9)/3
    });

    it("redondea a 2 decimales", () => {
      const e: Estudiante = { id: 99, nombre: "X", apellido: "Y", notas: [7, 8, 9, 10], curso: "1A" };
      expect(calcularPromedio(e)).toBe(8.5);
    });

    it("funciona con una sola nota", () => {
      const e: Estudiante = { id: 99, nombre: "X", apellido: "Y", notas: [5], curso: "1A" };
      expect(calcularPromedio(e)).toBe(5);
    });
  });

  describe("1c. generarResumenes", () => {
    it("genera el nombre completo correctamente", () => {
      const resumenes = generarResumenes([estudiantes[0]]);
      expect(resumenes[0].nombreCompleto).toBe("Ana López");
    });

    it("marca como aprobado si promedio >= 6", () => {
      const resumenes = generarResumenes(estudiantes);
      expect(resumenes[0].aprobado).toBe(true);  // Ana prom=8
      expect(resumenes[3].aprobado).toBe(false); // Diego prom=4
    });

    it("retorna el mismo largo que el array original", () => {
      expect(generarResumenes(estudiantes)).toHaveLength(5);
    });

    it("retorna array vacío si el input está vacío", () => {
      expect(generarResumenes([])).toEqual([]);
    });
  });

  describe("1d. ordenarPorPromedio", () => {
    it("ordena de mayor a menor promedio", () => {
      const ordenados = ordenarPorPromedio(estudiantes);
      const promedios = ordenados.map(e =>
        e.notas.reduce((a, b) => a + b, 0) / e.notas.length
      );
      for (let i = 0; i < promedios.length - 1; i++) {
        expect(promedios[i]).toBeGreaterThanOrEqual(promedios[i + 1]);
      }
    });

    it("el primero es Carla (promedio más alto)", () => {
      expect(ordenarPorPromedio(estudiantes)[0].nombre).toBe("Carla");
    });

    it("no muta el array original", () => {
      const copia = [...estudiantes];
      ordenarPorPromedio(estudiantes);
      expect(estudiantes[0].nombre).toBe(copia[0].nombre);
    });
  });

  describe("1e. promedioGeneral", () => {
    it("calcula el promedio de todos los estudiantes", () => {
      // Ana=8, Bruno=5, Carla≈9.67, Diego=4, Elena≈6.33 → promedio ≈ 6.6
      expect(promedioGeneral(estudiantes)).toBeCloseTo(6.6, 1);
    });

    it("retorna 0 si el array está vacío", () => {
      expect(promedioGeneral([])).toBe(0);
    });
  });
});
