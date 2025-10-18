import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GraphqlJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }

    // Get the GraphQL context
    const gqlContext = context.getArgByIndex(2);
    const request = gqlContext?.req;
    
    console.log('GraphQL Context:', gqlContext);
    console.log('Request:', request);
    console.log('Headers:', request?.headers);
    
    if (!request || !request.headers) {
      console.log('No request or headers found');
      throw new UnauthorizedException();
    }
    
    const token = this.extractTokenFromHeader(request);
    console.log('Extracted token:', token);
    
    if (!token) {
      console.log('No token found');
      throw new UnauthorizedException();
    }
    
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET') || 'your-super-secret-jwt-key-change-this-in-production',
      });
      console.log('JWT payload:', payload);
      request.user = payload;
    } catch (error) {
      console.log('JWT verification failed:', error);
      throw new UnauthorizedException();
    }
    
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    if (!request || !request.headers || !request.headers.authorization) {
      return undefined;
    }
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
