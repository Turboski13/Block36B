// Clear and repopulate the database.

const db = require("../db");
const { faker } = require("@faker-js/faker");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function seed() {
  console.log("Seeding the database.");
  try {
    // Clear the database.
    /* await db.query("DROP TABLE IF EXISTS student, instructor;"); */
    await prisma.student.deleteMany();
    await prisma.instructor.deleteMany();


    // Recreate the tables
    /* await db.query(`
      CREATE TABLE instructor (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
      CREATE TABLE student (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cohort TEXT NOT NULL,
        instructorId INTEGER NOT NULL REFERENCES instructor(id) ON DELETE CASCADE
      );
    `); */

    // Add 5 instructors.
    await Promise.all(
      [...Array(5)].map(() =>
        prisma.instructor.create({
          data: {
            username: faker.internet.userName(),
            password: faker.internet.password()
          },
        }) )
    );

    // Add 4 students for each instructor.
    await Promise.all(
      [...Array(20)].map((_, i) =>
        prisma.student.create({
          data: {
            name: faker.person.fullName(),
            cohort: faker.number.int({ min: 2000, max: 3000 }),
            instructorId: instructors[i % 5].id, // Relate students to instructors
          },
        })
      )
    );
    
    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
