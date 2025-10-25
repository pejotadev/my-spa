import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateEnvironmentDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsBoolean()
  isIndoor: boolean;

  @Field(() => Float)
  @IsNumber()
  @Min(0.1)
  width: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0.1)
  height: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  depth?: number;
}
