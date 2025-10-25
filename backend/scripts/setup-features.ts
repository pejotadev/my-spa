import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupBookServiceFeature() {
  try {
    console.log('🚀 Setting up BOOK_SERVICE feature...');

    // Criar a feature Book Service
    const bookServiceFeature = await prisma.feature.upsert({
      where: { name: 'BOOK_SERVICE' },
      update: {},
      create: {
        name: 'BOOK_SERVICE',
        description: 'Enable booking service for users',
        score: 100, // Score mínimo para habilitar automaticamente
        isActive: true,
      },
    });

    console.log(`✅ Feature BOOK_SERVICE created/updated: ${bookServiceFeature.id}`);

    // Encontrar o usuário ocaradorune@hotmail.com
    const user = await prisma.user.findUnique({
      where: { email: 'ocaradorune@hotmail.com' },
    });

    if (user) {
      console.log(`👤 Found user: ${user.email} (ID: ${user.id})`);

      // Habilitar a feature para o usuário específico
      const userFeature = await prisma.userFeature.upsert({
        where: {
          userId_featureId: {
            userId: user.id,
            featureId: bookServiceFeature.id,
          },
        },
        update: { isEnabled: true },
        create: {
          userId: user.id,
          featureId: bookServiceFeature.id,
          isEnabled: true,
        },
      });

      console.log(`✅ Feature BOOK_SERVICE enabled for ${user.email}`);
      console.log(`📊 UserFeature created: ${userFeature.id}`);

      // Atualizar o score do usuário para garantir que ele tenha acesso
      await prisma.user.update({
        where: { id: user.id },
        data: { score: 150 }, // Score maior que o necessário (100)
      });

      console.log(`📈 User score updated to 150`);
    } else {
      console.log('❌ User ocaradorune@hotmail.com not found');
    }

    // Listar todas as features criadas
    const allFeatures = await prisma.feature.findMany();
    console.log('\n📋 All features:');
    allFeatures.forEach(feature => {
      console.log(`  - ${feature.name}: ${feature.description} (score: ${feature.score})`);
    });

  } catch (error) {
    console.error('❌ Error setting up features:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupBookServiceFeature();
