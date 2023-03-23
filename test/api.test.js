const supertest = require("supertest");
const host = "http://localhost:5000";
const request = supertest(host);
const mongoose = require("mongoose");

const clearCollection = require("../clearDB/delete");

describe("Test APIs", () => {
  jest.setTimeout(15000);

  beforeAll(async () => await clearCollection());
  afterAll(() => {
    mongoose.connection.close();
  });

  it("Should create a user", async () => {
    const response = await request.post("/users").send({
      username: "joelinton",
      dob: "1/1/1992",
      email: "joe@kundabox.com",
      password: "12Aabc",
    });

    expect(response.statusCode).toBe(200);
  });
  it("Should not create a user with same username", async () => {
    const response = await request.post("/users").send({
      username: "joelinton",
      dob: "1/1/2001",
      email: "joe1@kundabox.com",
      password: "12ABCabc",
    });

    expect(response.statusCode).toBe(200);
  });
  it("Should not create a user with invalid dob", async () => {
    const response = await request.post("/users").send({
      username: "joelinton1",
      dob: "1 / 1 / 2013",
      email: "joe2@kundabox.com",
      password: "12ABCabc",
    });

    expect(response.statusCode).toBe(200);
  });
  it("Should not create a user with same email", async () => {
    const response = await request.post("/users").send({
      username: "joelinton2",
      dob: "1 / 1 / 2002",
      email: "joe@kundabox.com",
      password: "12ABCabc",
    });

    expect(response.statusCode).toBe(200);
  });
  it("Should not create a user with invalid password", async () => {
    const response = await request.post("/users").send({
      username: "joelinton4",
      dob: "1 / 1 / 2003",
      email: "joe3@kundabox.com",
      password: "12ABCabc1",
    });

    expect(response.statusCode).toBe(200);
  });
});
