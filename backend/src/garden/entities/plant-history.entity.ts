import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PlantHistory {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  plantId: string;

  @Field()
  stage: string;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  createdAt: Date;
}
