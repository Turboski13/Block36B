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


    /* await prisma.raw('DROP TABLE student');
    await prisma.raw('DROP TABLE instructor'); */



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
            name: faker.internet.userName(),
            password: faker.internet.password(),
            token: faker.company.catchPhrase()
          },
        }) )
    ); 

  
    // Add 4 students for each instructor.
 await Promise.all(
      [...Array(20)].map((_, i) =>
        prisma.student.create({
          data: {
            name: faker.person.fullName(),
            cohort: '2405',
            password: faker.internet.password(),
            
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
