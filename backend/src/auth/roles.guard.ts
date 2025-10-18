import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    
    // For GraphQL, get user from the GraphQL context
    const gqlContext = context.getArgByIndex(2);
    const user = gqlContext?.req?.user;
    
    if (!user) {
      return false;
    }
    
    return requiredRoles.some((role) => user.role === role);
  }
}
