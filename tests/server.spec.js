const request = require("supertest");
const server = require("../index");
const { faker } = require("@faker-js/faker");

describe("Operaciones CRUD de cafes", () => {
  describe("GET /cafes", () => {
    it("Obteniendo un 200", async () => {
      const response = await request(server).get("/cafes").send();
      const status = response.statusCode;
      expect(status).toBe(200);
    });
    it("Debiese obtener un array", async () => {
      const response = await request(server).get("/cafes").send();
      expect(response.body).toBeInstanceOf(Array);
    });
    it("El array no esta vacio", async () => {
      const response = await request(server).get("/cafes").send();
      expect(response.body.length).not.toEqual(0);
    });
    it("El array solo debe contener objetos", async () => {
      const response = await request(server).get("/cafes").send();
      response.body.map((element) => expect(element).toBeInstanceOf(Object));
    });
  });
  describe("DELETE /cafes/:id", () => {
    it("Eliminando un cafe que no exista el id y que devuelva 404", async () => {
      const jwt = "token";
      const idCafeAEliminar = 5;
      const response = await request(server)
        .delete(`/cafes/${idCafeAEliminar}`)
        .set("Authorization", jwt)
        .send();
      const status = response.statusCode;
      expect(status).toBe(404);
    });
    it("Eliminar un cafe sin autorizacion(token)", async () => {
      const idCafeAEliminar = 4;
      const response = await request(server)
        .delete(`/cafes/${idCafeAEliminar}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(400);
    });
  });
  describe("POST /cafes", () => {
    it("Al crear un nuevo cafe que devuelva un codigo 201", async () => {
      const nuevoCafe = {
        id: Math.floor(Math.random() * 999),
        nombre: faker.helpers.arrayElement([
          "Macchiato",
          "Frappuchino",
          "Mocachino",
        ]),
      };
      const response = await request(server).post("/cafes").send(nuevoCafe);
      const status = response.statusCode;
      expect(status).toBe(201);
    });
  });
  describe("PUT /cafes/:id", () => {
    it("Id cafe en parametros distinto a id cafe en el payload devuelve un codigo 400", async () => {
      const idCafeAModificar = 2;
      const cafeAModificar = {
        id: 1,
        nombre: faker.helpers.arrayElement([
          "Macchiato",
          "Frappuchino",
          "Mocachino",
        ]),
      };
      const response = await request(server)
        .put(`/cafes/${idCafeAModificar}`)
        .send(cafeAModificar);
      const status = response.statusCode;
      expect(status).toBe(400);
    });
  });
});
