// Re-export generated types
export type { User, AuthPayload, LoginDto, CreateUserDto } from '../generated/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
}
