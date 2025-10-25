import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsIn } from 'class-validator';

const PLANT_STAGES = ['germinacao', 'muda_clone', 'vegetativa', 'florativa'];

@InputType()
export class CreatePlantHistoryDto {
  @Field()
  @IsString()
  @IsIn(PLANT_STAGES)
  stage: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
