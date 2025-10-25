import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(['ADMIN', 'CUSTOMER', 'SERVICE_PROVIDER'])
  role?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nylasGrantId?: string;
}
