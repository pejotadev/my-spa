import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsIn } from 'class-validator';

const PLANT_STAGES = ['germination', 'clone_seedling', 'vegetative', 'flowering'];

@InputType()
export class UpdatePlantHistoryDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(PLANT_STAGES)
  stage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
