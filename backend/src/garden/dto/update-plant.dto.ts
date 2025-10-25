import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdatePlantDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  geneticsId?: string;
}
