import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class AddCategoryToProviderDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;
}
