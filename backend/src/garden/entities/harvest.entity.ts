import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Plant } from './plant.entity';

@ObjectType()
export class Harvest {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  plantId: string;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  harvestDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}
