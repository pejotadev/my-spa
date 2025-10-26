import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupHarvestHistoryTypes() {
  console.log('🌾 Setting up Harvest History Types...');

  const harvestHistoryTypes = [
    {
      id: 'harvest_type1',
      name: 'notes',
      displayName: 'Notes',
      description: 'General notes for harvest history',
      fields: JSON.stringify({
        type: 'object',
        properties: {
          notes: {
            type: 'string',
            title: 'Notes',
            description: 'General notes about this harvest stage'
          }
        }
      }),
      isActive: true
    },
    {
      id: 'harvest_type2',
      name: 'weight_on_harvest',
      displayName: 'Weight on Harvest',
      description: 'Record weight measurements during harvest stages',
      fields: JSON.stringify({
        type: 'object',
        properties: {
          weight: {
            type: 'number',
            title: 'Weight (grams)',
            description: 'Weight measurement in grams',
            minimum: 0
          },
          notes: {
            type: 'string',
            title: 'Notes',
            description: 'Additional notes about the weight measurement'
          }
        },
        required: ['weight']
      }),
      isActive: true
    }
  ];

  for (const type of harvestHistoryTypes) {
    try {
      await prisma.harvestHistoryType.upsert({
        where: { id: type.id },
        update: type,
        create: type,
      });
      console.log(`✅ Created/Updated harvest history type: ${type.displayName}`);
    } catch (error) {
      console.error(`❌ Error creating harvest history type ${type.name}:`, error);
    }
  }

  console.log('🎉 Harvest History Types setup completed!');
}

async function main() {
  try {
    await setupHarvestHistoryTypes();
  } catch (error) {
    console.error('Error setting up harvest history types:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
