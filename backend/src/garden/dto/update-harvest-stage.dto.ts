import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsIn } from 'class-validator';

const HARVEST_STAGES = ['drying', 'trimming', 'curing', 'storage'];

@InputType()
export class UpdateHarvestStageDto {
  @Field()
  @IsString()
  @IsIn(HARVEST_STAGES)
  stage: string;
}
