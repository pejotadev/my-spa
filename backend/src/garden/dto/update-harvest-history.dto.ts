import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateHarvestHistoryDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  stage?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  typeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  data?: string;
}
