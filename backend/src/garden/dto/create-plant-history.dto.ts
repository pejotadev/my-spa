import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsIn } from 'class-validator';

const PLANT_STAGES = ['germination', 'clone_seedling', 'vegetative', 'flowering'];

@InputType()
export class CreatePlantHistoryDto {
  @Field()
  @IsString()
  @IsIn(PLANT_STAGES)
  stage: string;

  @Field()
  @IsString()
  typeId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  data?: string; // JSON string containing additional data
}
