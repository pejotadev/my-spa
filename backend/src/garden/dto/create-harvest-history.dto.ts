import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateHarvestHistoryDto {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  harvestId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  stage: string;

  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  typeId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  data?: string;
}
