import { ObjectType, Field, ID } from '@nestjs/graphql';
import { HarvestHistory } from './harvest-history.entity';

@ObjectType()
export class HarvestHistoryType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  fields: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [HarvestHistory], { nullable: true })
  histories?: HarvestHistory[];
}
