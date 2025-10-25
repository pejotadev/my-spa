import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreatePlantDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ID)
  @IsUUID()
  geneticsId: string;
}
