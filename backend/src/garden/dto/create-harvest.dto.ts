import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateHarvestDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  plantId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  environmentId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
