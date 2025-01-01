import database from "infra/database";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const responseNext = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(responseNext.status).toBe(200);

  const responseNextBody = await responseNext.json();

  expect(Array.isArray(responseNextBody)).toBe(true);
  expect(responseNextBody.length).toBe(0);
});
