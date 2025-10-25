import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateEnvironmentDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isIndoor?: boolean;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  width?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  height?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  depth?: number;
}
