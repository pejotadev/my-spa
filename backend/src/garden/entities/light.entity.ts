import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Light {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field(() => Float, { nullable: true })
  watts?: number;

  @Field(() => ID)
  environmentId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
