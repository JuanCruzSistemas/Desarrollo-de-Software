import {
  Contacto,
  buscar,
  filtrarPorEtiqueta,
  ordenarPorApellido,
  formatearNombre,
  validarEmail,
} from "./ejercicio4-contactos";

const contactos: Contacto[] = [
  {
    id: 1, nombre: "María",    apellido: "García",    telefono: "011-1234567",
    email: "maria@gmail.com",   etiquetas: ["amigo", "familia"],
  },
  {
    id: 2, nombre: "Carlos",   apellido: "Martínez",  telefono: "011-7654321",
    email: "carlos@trabajo.com", etiquetas: ["trabajo"],
  },
  {
    id: 3, nombre: "Marco",    apellido: "García",    telefono: "011-1112222",
    email: "marco@gmail.com",   etiquetas: ["amigo"],
  },
  {
    id: 4, nombre: "Laura",    apellido: "Rodríguez", telefono: "011-3334444",
    email: "laura@empresa.com",  etiquetas: ["trabajo", "amigo"],
  },
  {
    id: 5, nombre: "Martina",  apellido: "López",     telefono: "011-5556666",
    email: "martina@mail.com",  etiquetas: ["familia"],
  },
];

describe("Ejercicio 4 – Agenda de Contactos", () => {

  describe("4a. buscar", () => {
    it("encuentra por nombre (case insensitive)", () => {
      const resultado = buscar(contactos, "mar");
      const nombres = resultado.map(c => c.nombre);
      expect(nombres).toContain("María");
      expect(nombres).toContain("Marco");
      expect(nombres).toContain("Martina");
    });

    it("encuentra por apellido", () => {
      const resultado = buscar(contactos, "García");
      expect(resultado).toHaveLength(2);
    });

    it("retorna array vacío si no hay coincidencias", () => {
      expect(buscar(contactos, "zzz")).toEqual([]);
    });

    it("no distingue mayúsculas/minúsculas", () => {
      expect(buscar(contactos, "CARLOS")).toHaveLength(1);
      expect(buscar(contactos, "carlos")).toHaveLength(1);
    });
  });

  describe("4b. filtrarPorEtiqueta", () => {
    it("filtra por etiqueta correctamente", () => {
      const resultado = filtrarPorEtiqueta(contactos, "trabajo");
      expect(resultado).toHaveLength(2);
      expect(resultado.map(c => c.nombre).sort()).toEqual(["Carlos", "Laura"]);
    });

    it("retorna array vacío si nadie tiene la etiqueta", () => {
      expect(filtrarPorEtiqueta(contactos, "vecino")).toEqual([]);
    });
  });

  describe("4c. ordenarPorApellido", () => {
    it("ordena por apellido alfabéticamente", () => {
      const resultado = ordenarPorApellido(contactos);
      const apellidos = resultado.map(c => c.apellido);
      // García, García, López, Martínez, Rodríguez
      expect(apellidos[0]).toBe("García");
      expect(apellidos[apellidos.length - 1]).toBe("Rodríguez");
    });

    it("en caso de empate de apellido, ordena por nombre", () => {
      const resultado = ordenarPorApellido(contactos);
      const garcias = resultado.filter(c => c.apellido === "García");
      expect(garcias[0].nombre).toBe("Marco");   // M antes que M... no, "Marco" < "María" alfabéticamente
      expect(garcias[1].nombre).toBe("María");
    });

    it("no muta el array original", () => {
      ordenarPorApellido(contactos);
      expect(contactos[0].apellido).toBe("García");
    });
  });

  describe("4d. formatearNombre", () => {
    it("formatea correctamente", () => {
      expect(formatearNombre(contactos[0])).toBe("GARCÍA, María");
      expect(formatearNombre(contactos[1])).toBe("MARTÍNEZ, Carlos");
    });
  });

  describe("4e. validarEmail", () => {
    it("acepta emails válidos", () => {
      expect(validarEmail("usuario@ejemplo.com")).toBe(true);
      expect(validarEmail("a@b.co")).toBe(true);
    });

    it("rechaza emails sin @", () => {
      expect(validarEmail("usuarioejemplo.com")).toBe(false);
    });

    it("rechaza emails sin punto después del @", () => {
      expect(validarEmail("usuario@ejemplo")).toBe(false);
    });

    it("rechaza strings vacíos", () => {
      expect(validarEmail("")).toBe(false);
    });
  });
});
