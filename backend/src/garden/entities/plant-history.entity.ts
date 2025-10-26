import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PlantHistoryType } from './plant-history-type.entity';

@ObjectType()
export class PlantHistory {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  plantId: string;

  @Field()
  stage: string;

  @Field(() => ID)
  typeId: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  data?: string; // JSON string containing additional data

  @Field()
  createdAt: Date;

  @Field(() => PlantHistoryType, { nullable: true })
  type?: PlantHistoryType;
}
