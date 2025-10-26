import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupPlantHistoryTypes() {
  try {
    console.log('🚀 Setting up Plant History Types...');

    // Criar tipo "Notes" (já existe, mas vamos garantir)
    const notesType = await prisma.plantHistoryType.upsert({
      where: { id: 'type1' },
      update: {},
      create: {
        id: 'type1',
        name: 'notes',
        displayName: 'Notes',
        description: 'General notes about plant care',
        fields: '[]',
        isActive: true,
      },
    });

    console.log(`✅ Notes type created/updated: ${notesType.id}`);

    // Criar tipo "Water"
    const waterType = await prisma.plantHistoryType.upsert({
      where: { id: 'type2' },
      update: {},
      create: {
        id: 'type2',
        name: 'water',
        displayName: 'Water',
        description: 'Watering record with quantity and volume',
        fields: JSON.stringify([
          {
            name: 'quantity',
            label: 'Quantity',
            type: 'number',
            required: true
          },
          {
            name: 'volumeUnit',
            label: 'Volume Unit',
            type: 'select',
            options: ['L', 'ml', 'gal', 'qt'],
            required: true
          }
        ]),
        isActive: true,
      },
    });

    console.log(`✅ Water type created/updated: ${waterType.id}`);

    // Criar tipo "Pruning"
    const pruningType = await prisma.plantHistoryType.upsert({
      where: { id: 'type3' },
      update: {
        fields: JSON.stringify([
          {
            name: 'pruningType',
            label: 'Pruning Type',
            type: 'select',
            options: ['Topping', 'FIM', 'LST', 'Defoliation', 'Lollipopping', 'Super Cropping'],
            required: true
          }
        ]),
      },
      create: {
        id: 'type3',
        name: 'pruning',
        displayName: 'Pruning',
        description: 'Plant pruning and training techniques',
        fields: JSON.stringify([
          {
            name: 'pruningType',
            label: 'Pruning Type',
            type: 'select',
            options: ['Topping', 'FIM', 'LST', 'Defoliation', 'Lollipopping', 'Super Cropping'],
            required: true
          }
        ]),
        isActive: true,
      },
    });

    console.log(`✅ Pruning type created/updated: ${pruningType.id}`);

    // Listar todos os tipos criados
    const allTypes = await prisma.plantHistoryType.findMany();
    console.log('\n📋 All Plant History Types:');
    allTypes.forEach(type => {
      console.log(`  - ${type.displayName} (${type.name}): ${type.description}`);
    });

  } catch (error) {
    console.error('❌ Error setting up plant history types:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupPlantHistoryTypes();
