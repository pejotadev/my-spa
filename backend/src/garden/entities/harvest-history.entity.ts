import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Harvest } from './harvest.entity';
import { HarvestHistoryType } from './harvest-history-type.entity';

@ObjectType()
export class HarvestHistory {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  harvestId: string;

  @Field()
  stage: string;

  @Field(() => ID)
  typeId: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  data?: string;

  @Field()
  createdAt: Date;

  @Field(() => Harvest, { nullable: true })
  harvest?: Harvest;

  @Field(() => HarvestHistoryType, { nullable: true })
  type?: HarvestHistoryType;
}
