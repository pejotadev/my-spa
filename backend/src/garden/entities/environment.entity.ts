import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Environment {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  isIndoor: boolean;

  @Field(() => Float)
  width: number;

  @Field(() => Float)
  height: number;

  @Field(() => Float, { nullable: true })
  depth?: number;

  @Field(() => ID)
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
