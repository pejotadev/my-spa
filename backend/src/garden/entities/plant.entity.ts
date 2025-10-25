import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Genetics } from './genetics.entity';

@ObjectType()
export class Plant {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  geneticsId: string;

  @Field(() => ID)
  environmentId: string;

  @Field({ nullable: true })
  currentStage?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Genetics, { nullable: true })
  genetics?: Genetics;
}
