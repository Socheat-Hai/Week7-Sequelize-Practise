const sequelize = require('./database');
const Author = require('../models/Author');
const Book = require('../models/Book');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    // Create 3 authors
    const ronan = await Author.create({ name: 'Ronan The Best', birthYear: 1990 });
    const kimAng = await Author.create({ name: 'Kim Ang', birthYear: 1995 });
    const hokTim = await Author.create({ name: 'Hok Tim', birthYear: 2015 });

    // Create at least 2 books per author 
    await ronan.createBook({ title: 'Sequelize Masterclass', publicationYear: 2020, pages: 350 });
    await ronan.createBook({ title: 'JavaScript Realities', publicationYear: 2023, pages: 280 });

    await kimAng.createBook({ title: 'Designing Clean APIs', publicationYear: 2021, pages: 410 });
    await kimAng.createBook({ title: 'Database Scalability', publicationYear: 2025, pages: 520 });

    await hokTim.createBook({ title: 'Coding Playground', publicationYear: 2024, pages: 120 });
    await hokTim.createBook({ title: 'The ABCs of Loops', publicationYear: 2026, pages: 95 });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seed();