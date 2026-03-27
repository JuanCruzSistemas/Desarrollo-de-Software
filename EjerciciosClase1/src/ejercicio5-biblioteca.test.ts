import {
  Libro,
  buscarPorGenero,
  buscarPorAutor,
  buscarPorRangoAnio,
  generosUnicos,
  obtenerEstadisticas,
} from "./ejercicio5-biblioteca";

const libros: Libro[] = [
  {
    isbn: "978-1",
    titulo: "Cien Años de Soledad",
    autor: { nombre: "Gabriel", apellido: "García Márquez", nacionalidad: "Colombiana" },
    anio: 1967,
    generos: ["realismo mágico", "novela"],
    disponible: true,
  },
  {
    isbn: "978-2",
    titulo: "El Aleph",
    autor: { nombre: "Jorge Luis", apellido: "Borges", nacionalidad: "Argentina" },
    anio: 1949,
    generos: ["cuento", "fantástico"],
    disponible: false,
  },
  {
    isbn: "978-3",
    titulo: "Ficciones",
    autor: { nombre: "Jorge Luis", apellido: "Borges", nacionalidad: "Argentina" },
    anio: 1944,
    generos: ["cuento", "fantástico"],
    disponible: true,
  },
  {
    isbn: "978-4",
    titulo: "La Casa de los Espíritus",
    autor: { nombre: "Isabel", apellido: "Allende", nacionalidad: "Chilena" },
    anio: 1982,
    generos: ["realismo mágico", "novela"],
    disponible: true,
  },
  {
    isbn: "978-5",
    titulo: "El Túnel",
    autor: { nombre: "Ernesto", apellido: "Sábato", nacionalidad: "Argentina" },
    anio: 1948,
    generos: ["novela", "existencialismo"],
    disponible: false,
  },
];

describe("Ejercicio 5 – Biblioteca", () => {

  describe("5a. buscarPorGenero", () => {
    it("retorna solo libros del género indicado y disponibles", () => {
      const resultado = buscarPorGenero(libros, "novela");
      expect(resultado.every(l => l.disponible)).toBe(true);
      expect(resultado.every(l => l.generos.map(g => g.toLowerCase()).includes("novela"))).toBe(true);
    });

    it("no distingue mayúsculas en el género", () => {
      expect(buscarPorGenero(libros, "NOVELA")).toHaveLength(
        buscarPorGenero(libros, "novela").length
      );
    });

    it("retorna array vacío si no hay coincidencias disponibles", () => {
      expect(buscarPorGenero(libros, "thriller")).toEqual([]);
    });
  });

  describe("5b. buscarPorAutor", () => {
    it("retorna todos los libros del autor (por apellido)", () => {
      const resultado = buscarPorAutor(libros, "Borges");
      expect(resultado).toHaveLength(2);
    });

    it("búsqueda case insensitive", () => {
      expect(buscarPorAutor(libros, "borges")).toHaveLength(2);
      expect(buscarPorAutor(libros, "BORGES")).toHaveLength(2);
    });

    it("retorna array vacío si no existe el autor", () => {
      expect(buscarPorAutor(libros, "Cervantes")).toEqual([]);
    });
  });

  describe("5c. buscarPorRangoAnio", () => {
    it("retorna libros dentro del rango (inclusive)", () => {
      const resultado = buscarPorRangoAnio(libros, 1944, 1949);
      expect(resultado).toHaveLength(3);
    });

    it("ordena por año ascendente", () => {
      const resultado = buscarPorRangoAnio(libros, 1944, 1967);
      for (let i = 0; i < resultado.length - 1; i++) {
        expect(resultado[i].anio).toBeLessThanOrEqual(resultado[i + 1].anio);
      }
    });

    it("retorna array vacío si el rango no coincide", () => {
      expect(buscarPorRangoAnio(libros, 2000, 2010)).toEqual([]);
    });
  });

  describe("5d. generosUnicos", () => {
    it("retorna géneros únicos", () => {
      const resultado = generosUnicos(libros);
      const sinDuplicados = new Set(resultado);
      expect(resultado.length).toBe(sinDuplicados.size);
    });

    it("los géneros están ordenados alfabéticamente", () => {
      const resultado = generosUnicos(libros);
      const ordenados = [...resultado].sort();
      expect(resultado).toEqual(ordenados);
    });

    it("incluye todos los géneros presentes", () => {
      const resultado = generosUnicos(libros);
      expect(resultado).toContain("novela");
      expect(resultado).toContain("cuento");
      expect(resultado).toContain("fantástico");
      expect(resultado).toContain("realismo mágico");
      expect(resultado).toContain("existencialismo");
    });
  });

  describe("5e. obtenerEstadisticas", () => {
    it("cuenta el total de libros", () => {
      expect(obtenerEstadisticas(libros).totalLibros).toBe(5);
    });

    it("cuenta los libros disponibles", () => {
      expect(obtenerEstadisticas(libros).librosDisponibles).toBe(3);
    });

    it("incluye los géneros únicos ordenados", () => {
      const { generos } = obtenerEstadisticas(libros);
      expect(generos).toContain("novela");
      expect(generos).toEqual([...generos].sort());
    });

    it("identifica al autor con más libros", () => {
      // Borges tiene 2 libros, es el que más tiene
      expect(obtenerEstadisticas(libros).autorMasLibros).toBe("Borges, Jorge Luis");
    });
  });
});
