import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PlantHistoryType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  fields: string; // JSON string containing field schema

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
