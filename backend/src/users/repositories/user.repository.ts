import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserWithoutPassword } from '../types/user.types';

export class UserRepository {
  private static prisma: PrismaService;

  static setPrisma(prisma: PrismaService) {
    UserRepository.prisma = prisma;
  }

  static async findAll(): Promise<UserWithoutPassword[]> {
    return UserRepository.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        nylasGrantId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
      },
    });
  }

  static async findOne(id: string): Promise<UserWithoutPassword | null> {
    return UserRepository.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        nylasGrantId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
      },
    });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return UserRepository.prisma.user.findUnique({
      where: { email },
    });
  }

  static async findByRole(role: string): Promise<UserWithoutPassword[]> {
    return UserRepository.prisma.user.findMany({
      where: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        nylasGrantId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
      },
    });
  }

  static async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    nylasGrantId?: string;
    createdBy?: string;
  }): Promise<UserWithoutPassword> {
    const user = await UserRepository.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        nylasGrantId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
      },
    });
    return user;
  }

  static async update(id: string, data: Partial<User>): Promise<UserWithoutPassword> {
    const user = await UserRepository.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        nylasGrantId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
      },
    });
    return user;
  }

  static async remove(id: string): Promise<UserWithoutPassword> {
    const user = await UserRepository.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        nylasGrantId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
      },
    });
    return user;
  }

  static async findById(id: string): Promise<User | null> {
    return UserRepository.prisma.user.findUnique({
      where: { id },
    });
  }
}
