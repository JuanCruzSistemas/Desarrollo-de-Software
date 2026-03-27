import {
  PalabraFrecuencia,
  tokenizar,
  contarFrecuencias,
  esPalindromo,
  capitalizar,
  analizarTexto,
} from "./ejercicio3-texto";

describe("Ejercicio 3 – Análisis de Texto", () => {

  describe("3a. tokenizar", () => {
    it("convierte a minúsculas y separa por espacios", () => {
      expect(tokenizar("Hola Mundo")).toEqual(["hola", "mundo"]);
    });

    it("elimina signos de puntuación", () => {
      expect(tokenizar("Hola, mundo!")).toEqual(["hola", "mundo"]);
      expect(tokenizar("¿Cómo estás?")).toEqual(["¿cómo", "estás"]); // solo los listados
    });

    it("elimina espacios extra / palabras vacías", () => {
      const resultado = tokenizar("  uno  dos  ");
      expect(resultado).toEqual(["uno", "dos"]);
    });

    it("retorna array vacío para texto vacío", () => {
      expect(tokenizar("")).toEqual([]);
    });
  });

  describe("3b. contarFrecuencias", () => {
    it("cuenta correctamente las repeticiones", () => {
      const resultado = contarFrecuencias(["el", "gato", "el", "gato", "el"]);
      expect(resultado[0]).toEqual({ palabra: "el", frecuencia: 3 });
      expect(resultado[1]).toEqual({ palabra: "gato", frecuencia: 2 });
    });

    it("ordena de mayor a menor frecuencia", () => {
      const resultado = contarFrecuencias(["b", "a", "a", "c", "c", "c"]);
      expect(resultado[0].palabra).toBe("c");
      expect(resultado[0].frecuencia).toBe(3);
    });

    it("retorna array vacío si el input está vacío", () => {
      expect(contarFrecuencias([])).toEqual([]);
    });
  });

  describe("3c. esPalindromo", () => {
    it("detecta palíndromos ignorando espacios", () => {
      expect(esPalindromo("Anita lava la tina")).toBe(true);
      expect(esPalindromo("reconocer")).toBe(true);
    });

    it("retorna false si no es palíndromo", () => {
      expect(esPalindromo("Hola mundo")).toBe(false);
    });

    it("ignora mayúsculas", () => {
      expect(esPalindromo("ANA")).toBe(true);
      expect(esPalindromo("Ana")).toBe(true);
    });

    it("una sola letra es palíndromo", () => {
      expect(esPalindromo("a")).toBe(true);
    });
  });

  describe("3d. capitalizar", () => {
    it("capitaliza cada palabra", () => {
      expect(capitalizar("hola mundo")).toBe("Hola Mundo");
    });

    it("convierte el resto a minúsculas", () => {
      expect(capitalizar("hola MUNDO")).toBe("Hola Mundo");
    });

    it("funciona con una sola palabra", () => {
      expect(capitalizar("typescript")).toBe("Typescript");
    });

    it("retorna string vacío si el input está vacío", () => {
      expect(capitalizar("")).toBe("");
    });
  });

  describe("3e. analizarTexto", () => {
    const texto = "el sol brilla y el cielo es azul y el mar es azul";

    it("cuenta el total de palabras", () => {
      expect(analizarTexto(texto).totalPalabras).toBe(13);
    });

    it("cuenta caracteres sin espacios", () => {
      // "elsolbrillayelcieloesazulyelmares azul" sin espacios
      const sinEspacios = texto.replace(/ /g, "").length;
      expect(analizarTexto(texto).totalCaracteres).toBe(sinEspacios);
    });

    it("incluye las 3 palabras más frecuentes", () => {
      const { palabrasMasFrequentes } = analizarTexto(texto);
      expect(palabrasMasFrequentes.length).toBeLessThanOrEqual(3);
      expect(palabrasMasFrequentes[0].palabra).toBe("el");
      expect(palabrasMasFrequentes[0].frecuencia).toBe(3);
    });

    it("detecta si el texto completo es palíndromo", () => {
      expect(analizarTexto("Anita lava la tina").esPalindromo).toBe(true);
      expect(analizarTexto(texto).esPalindromo).toBe(false);
    });
  });
});
