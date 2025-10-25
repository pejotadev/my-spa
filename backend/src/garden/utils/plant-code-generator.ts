import { PrismaService } from '../../prisma/prisma.service';

export class PlantCodeGenerator {
  private static prisma: PrismaService;

  static setPrisma(prisma: PrismaService) {
    PlantCodeGenerator.prisma = prisma;
  }

  /**
   * Gera um código único para uma planta
   * Formato: Letra + 3 dígitos (ex: A001, B002, Z999)
   * Quando chegar em Z999, volta para A001
   */
  static async generateUniqueCode(): Promise<string> {
    // Buscar o último código usado
    const lastPlant = await PlantCodeGenerator.prisma.plant.findFirst({
      orderBy: { code: 'desc' },
      select: { code: true }
    });

    if (!lastPlant) {
      // Primeira planta, começar com A001
      return 'A001';
    }

    const lastCode = lastPlant.code;
    const letter = lastCode[0];
    const number = parseInt(lastCode.slice(1));

    // Se chegou em Z999, voltar para A001
    if (letter === 'Z' && number === 999) {
      return 'A001';
    }

    // Se chegou em 999, incrementar a letra
    if (number === 999) {
      const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
      return `${nextLetter}001`;
    }

    // Incrementar o número
    const nextNumber = (number + 1).toString().padStart(3, '0');
    return `${letter}${nextNumber}`;
  }

  /**
   * Valida se um código já existe
   */
  static async isCodeUnique(code: string): Promise<boolean> {
    const existingPlant = await PlantCodeGenerator.prisma.plant.findUnique({
      where: { code },
      select: { id: true }
    });

    return !existingPlant;
  }
}
