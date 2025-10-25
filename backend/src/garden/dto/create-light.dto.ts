import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, Min, IsIn } from 'class-validator';

const LIGHT_TYPES = ['LED', 'CFL', 'HPS', 'Metal Halide', 'LEC', 'T5', 'Sun'];

@InputType()
export class CreateLightDto {
  @Field()
  @IsString()
  @IsIn(LIGHT_TYPES)
  type: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  watts?: number;
}
