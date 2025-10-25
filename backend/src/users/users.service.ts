import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { User } from '@prisma/client';
import { UserWithoutPassword } from './types/user.types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
    UserRepository.setPrisma(prisma);
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return UserRepository.findAll();
  }

  async findOne(id: string): Promise<UserWithoutPassword | null> {
    return UserRepository.findOne(id);
  }

  async findByRole(role: string): Promise<UserWithoutPassword[]> {
    return UserRepository.findByRole(role);
  }

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    nylasGrantId?: string;
    createdBy?: string;
  }): Promise<UserWithoutPassword> {
    return UserRepository.create(data);
  }

  async update(id: string, data: Partial<User>): Promise<UserWithoutPassword> {
    return UserRepository.update(id, data);
  }

  async remove(id: string): Promise<UserWithoutPassword> {
    return UserRepository.remove(id);
  }
}
