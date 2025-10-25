import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsIn } from 'class-validator';

const PLANT_STAGES = ['germination', 'clone_seedling', 'vegetative', 'flowering'];

@InputType()
export class UpdatePlantStageDto {
  @Field()
  @IsString()
  @IsIn(PLANT_STAGES)
  currentStage: string;
}
