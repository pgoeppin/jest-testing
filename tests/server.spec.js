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
    it("Eliminando un producto que no existe que devuelva 404", async () => {
      const jwt = "token";
      const idCafeAEliminar = 5;
      const response = await request(server)
        .delete(`/cafes/${idCafeAEliminar}`)
        .set("Authorization", jwt)
        .send();
      const status = response.statusCode;
      expect(status).toBe(404)
    });
  });
});
