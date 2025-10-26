import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class HarvestPlantDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  plantId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  environmentId: string;
}
