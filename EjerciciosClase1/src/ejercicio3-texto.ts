/**
 * EJERCICIO 3: Análisis de Texto
 * ================================
 * Practica: strings, split, join, map, filter, reduce, sort
 *
 * Completa cada función usando los tipos definidos.
 * NO modifiques las interfaces ni las firmas de las funciones.
 */

export interface PalabraFrecuencia {
  palabra: string;
  frecuencia: number;
}

export interface AnalisisTexto {
  totalPalabras: number;
  totalCaracteres: number; // sin contar espacios
  palabrasMasFrequentes: PalabraFrecuencia[]; // top 3
  esPalindromo: boolean; // toda la frase ignorando espacios y mayúsculas
}

// ─── FUNCIONES A COMPLETAR ────────────────────────────────────────────────────

/**
 * 3a. Convierte un texto a un array de palabras en minúsculas, sin espacios vacíos.
 *     Elimina signos de puntuación: . , ! ? ; :
 *
 * Ejemplo:
 *   tokenizar("Hola, mundo!") => ["hola", "mundo"]
 */
export function tokenizar(texto: string): string[] {
  const expresionRegular: RegExp = /[\s.,:;!?]+/;
  const tokens: string[] = texto.split(expresionRegular).filter(t => t !== "").map(t => t.toLowerCase());
  return tokens;
}

/**
 * 3b. Cuenta cuántas veces aparece cada palabra en el array.
 *     Retorna un array de PalabraFrecuencia ordenado de mayor a menor frecuencia.
 *
 * Ejemplo:
 *   contarFrecuencias(["el", "gato", "el"]) =>
 *   [{ palabra: "el", frecuencia: 2 }, { palabra: "gato", frecuencia: 1 }]
 */
export function contarFrecuencias(palabras: string[]): PalabraFrecuencia[] {
  const map: Record<string, number> = {};

  for (const palabra of palabras) {
    map[palabra] = (map[palabra] ?? 0) + 1;
  }

  const frecuencias: PalabraFrecuencia[] = Object.entries(map).map(palabraFrecuencia => {
    const [palabra, frecuencia] = palabraFrecuencia;
    return { palabra, frecuencia };
  });

  return frecuencias.sort((f1, f2) => f2.frecuencia - f1.frecuencia);
  
  // const frecuencias: PalabraFrecuencia[] = [];
  // const yaRevisadas: string[] = [];

  // for (const palabraActual of palabras) {
  //   if (yaRevisadas.includes(palabraActual)) {
  //     continue;
  //   }

  //   let contador = 0;
  //   for (const palabraComparar of palabras) {
  //     if (palabraActual === palabraComparar) {
  //       contador++;
  //     }
  //   }

  //   frecuencias.push({
  //     palabra: palabraActual,
  //     frecuencia: contador
  //   });

  //   yaRevisadas.push(palabraActual);
  // }

  // return frecuencias.sort((f1, f2) => f2.frecuencia - f1.frecuencia);
}

/**
 * 3c. Determina si una cadena es palíndromo.
 *     Ignora espacios y diferencias de mayúsculas/minúsculas.
 *
 * Ejemplo:
 *   esPalindromo("Anita lava la tina") => true
 *   esPalindromo("Hola")               => false
 */
export function esPalindromo(texto: string): boolean {
  const noABC: RegExp = /[^a-z]/g;
  const limpiar = (cadena: string) => cadena.toLowerCase().replace(noABC, "");
  const reverse = (cadena: string) => cadena.split("").reverse().join("");

  const textoLimpio = limpiar(texto);
  return textoLimpio === reverse(textoLimpio);
}

/**
 * 3d. Capitaliza cada palabra del texto (primera letra mayúscula, resto minúscula).
 *
 * Ejemplo:
 *   capitalizar("hola MUNDO") => "Hola Mundo"
 */
export function capitalizar(texto: string): string {
  const letraCapital = (cadena: string) => cadena[0].toUpperCase() + cadena.slice(1).toLowerCase();

  const palabras = tokenizar(texto).map(palabra => letraCapital(palabra));
  return palabras.join(" ");
}

/**
 * 3e. Genera un AnalisisTexto completo a partir de un texto.
 *     Usa las funciones anteriores internamente.
 */
export function analizarTexto(texto: string): AnalisisTexto {
  const tokens = tokenizar(texto);

  const analisisTexto: AnalisisTexto = {
    totalPalabras: tokens.length,
    totalCaracteres: tokens.join("").length,
    palabrasMasFrequentes: contarFrecuencias(tokens).slice(0, 2),
    esPalindromo: esPalindromo(texto)
  };

  return analisisTexto;
}
