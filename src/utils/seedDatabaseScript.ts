import { seedDatabase } from './seedDatabase';

async function main() {
  try {
    await seedDatabase();
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();