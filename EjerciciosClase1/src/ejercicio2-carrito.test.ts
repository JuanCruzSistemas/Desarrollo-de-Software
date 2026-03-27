import {
  Producto,
  Carrito,
  agregarProducto,
  eliminarProducto,
  calcularTotal,
  nombresOrdenados,
  filtrarPorCategoria,
} from "./ejercicio2-carrito";

const leche:  Producto = { id: 1, nombre: "Leche",  precio: 1.20, categoria: "lácteos" };
const pan:    Producto = { id: 2, nombre: "Pan",    precio: 0.80, categoria: "panadería" };
const queso:  Producto = { id: 3, nombre: "Queso",  precio: 3.50, categoria: "lácteos" };
const manzana: Producto = { id: 4, nombre: "Manzana", precio: 0.60, categoria: "frutas" };

const carritoVacio: Carrito = { items: [] };

const carritoBase: Carrito = {
  items: [
    { producto: leche,   cantidad: 2 },
    { producto: pan,     cantidad: 3 },
    { producto: queso,   cantidad: 1 },
  ],
};

describe("Ejercicio 2 – Carrito de Compras", () => {

  describe("2a. agregarProducto", () => {
    it("agrega un producto nuevo al carrito vacío", () => {
      const resultado = agregarProducto(carritoVacio, leche, 2);
      expect(resultado.items).toHaveLength(1);
      expect(resultado.items[0].cantidad).toBe(2);
      expect(resultado.items[0].producto.id).toBe(leche.id);
    });

    it("incrementa la cantidad si el producto ya existe", () => {
      const resultado = agregarProducto(carritoBase, leche, 3);
      const item = resultado.items.find(i => i.producto.id === leche.id);
      expect(item?.cantidad).toBe(5); // 2 + 3
    });

    it("no muta el carrito original", () => {
      agregarProducto(carritoBase, manzana, 1);
      expect(carritoBase.items).toHaveLength(3);
    });
  });

  describe("2b. eliminarProducto", () => {
    it("elimina el producto con el id indicado", () => {
      const resultado = eliminarProducto(carritoBase, pan.id);
      expect(resultado.items).toHaveLength(2);
      expect(resultado.items.find(i => i.producto.id === pan.id)).toBeUndefined();
    });

    it("retorna el carrito igual si el id no existe", () => {
      const resultado = eliminarProducto(carritoBase, 999);
      expect(resultado.items).toHaveLength(3);
    });

    it("no muta el carrito original", () => {
      eliminarProducto(carritoBase, leche.id);
      expect(carritoBase.items).toHaveLength(3);
    });
  });

  describe("2c. calcularTotal", () => {
    it("calcula el total correctamente", () => {
      // leche: 1.20*2=2.40, pan: 0.80*3=2.40, queso: 3.50*1=3.50 => 8.30
      expect(calcularTotal(carritoBase)).toBe(8.30);
    });

    it("retorna 0 para carrito vacío", () => {
      expect(calcularTotal(carritoVacio)).toBe(0);
    });
  });

  describe("2d. nombresOrdenados", () => {
    it("retorna los nombres en orden alfabético", () => {
      expect(nombresOrdenados(carritoBase)).toEqual(["Leche", "Pan", "Queso"]);
    });

    it("retorna array vacío si el carrito está vacío", () => {
      expect(nombresOrdenados(carritoVacio)).toEqual([]);
    });
  });

  describe("2e. filtrarPorCategoria", () => {
    it("retorna solo los items de la categoría indicada", () => {
      const resultado = filtrarPorCategoria(carritoBase, "lácteos");
      expect(resultado.items).toHaveLength(2);
      expect(resultado.items.map(i => i.producto.nombre).sort()).toEqual(["Leche", "Queso"]);
    });

    it("retorna carrito vacío si ningún item coincide", () => {
      const resultado = filtrarPorCategoria(carritoBase, "frutas");
      expect(resultado.items).toHaveLength(0);
    });

    it("no muta el carrito original", () => {
      filtrarPorCategoria(carritoBase, "lácteos");
      expect(carritoBase.items).toHaveLength(3);
    });
  });
});
