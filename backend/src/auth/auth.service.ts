import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../users/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    UserRepository.setPrisma(prisma);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await UserRepository.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        createdBy: user.createdBy,
      },
    };
  }

  async register(email: string, password: string, firstName: string, lastName: string, role: string, createdBy?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await UserRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role as any,
      createdBy,
    });

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return UserRepository.findById(id);
  }
}
