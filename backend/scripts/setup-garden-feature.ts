import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupGardenFeature() {
  try {
    console.log('🚀 Setting up GARDEN feature...');

    // Criar a feature Garden
    const gardenFeature = await prisma.feature.upsert({
      where: { name: 'GARDEN' },
      update: {},
      create: {
        name: 'GARDEN',
        description: 'Enable garden environment management for customers',
        score: 50, // Score mínimo para habilitar automaticamente
        isActive: true,
      },
    });

    console.log(`✅ Feature GARDEN created/updated: ${gardenFeature.id}`);

    // Encontrar usuários com role CUSTOMER
    const customers = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
    });

    console.log(`👥 Found ${customers.length} customers`);

    // Habilitar a feature para todos os customers
    for (const customer of customers) {
      const userFeature = await prisma.userFeature.upsert({
        where: {
          userId_featureId: {
            userId: customer.id,
            featureId: gardenFeature.id,
          },
        },
        update: { isEnabled: true },
        create: {
          userId: customer.id,
          featureId: gardenFeature.id,
          isEnabled: true,
        },
      });

      console.log(`✅ Feature GARDEN enabled for ${customer.email}`);
    }

    // Listar todas as features criadas
    const allFeatures = await prisma.feature.findMany();
    console.log('\n📋 All features:');
    allFeatures.forEach(feature => {
      console.log(`  - ${feature.name}: ${feature.description} (score: ${feature.score})`);
    });

  } catch (error) {
    console.error('❌ Error setting up garden feature:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupGardenFeature();
