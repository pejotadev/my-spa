import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  console.log('🌱 Seeding categories...');

  const categories = [
    {
      name: 'Therapy',
      description: 'Mental health and therapy services',
    },
    {
      name: 'Fitness',
      description: 'Physical fitness and exercise services',
    },
    {
      name: 'Education',
      description: 'Educational and tutoring services',
    },
    {
      name: 'Technology',
      description: 'IT and technology services',
    },
    {
      name: 'Beauty',
      description: 'Beauty and wellness services',
    },
    {
      name: 'Consulting',
      description: 'Business and professional consulting',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('✅ Categories seeded successfully!');
}

async function main() {
  try {
    await seedCategories();
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
