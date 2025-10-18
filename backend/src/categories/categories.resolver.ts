import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { ServiceProviderCategory } from './entities/service-provider-category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AddCategoryToProviderDto } from './dto/add-category-to-provider.dto';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../auth/graphql-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category], { name: 'categories' })
  @Public()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  @Public()
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Query(() => [Category], { name: 'myCategories' })
  @UseGuards(GraphqlJwtGuard, RolesGuard)
  @Roles('SERVICE_PROVIDER')
  getMyCategories(@Context() context: any) {
    return this.categoriesService.getCategoriesByProvider(context.req.user.sub);
  }

  @Query(() => [ServiceProviderCategory], { name: 'myCategoryRelations' })
  @UseGuards(GraphqlJwtGuard, RolesGuard)
  @Roles('SERVICE_PROVIDER')
  getMyCategoryRelations(@Context() context: any) {
    return this.categoriesService.getServiceProviderCategories(context.req.user.sub);
  }

  @Mutation(() => Category)
  @UseGuards(GraphqlJwtGuard, RolesGuard)
  @Roles('ADMIN')
  createCategory(@Args('createCategoryDto') createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Mutation(() => ServiceProviderCategory)
  @UseGuards(GraphqlJwtGuard, RolesGuard)
  @Roles('SERVICE_PROVIDER')
  addCategoryToMe(
    @Args('addCategoryDto') addCategoryDto: AddCategoryToProviderDto,
    @Context() context: any,
  ) {
    return this.categoriesService.addCategoryToProvider(
      context.req.user.sub,
      addCategoryDto,
    );
  }

  @Mutation(() => ServiceProviderCategory)
  @UseGuards(GraphqlJwtGuard, RolesGuard)
  @Roles('SERVICE_PROVIDER')
  removeCategoryFromMe(
    @Args('categoryId', { type: () => String }) categoryId: string,
    @Context() context: any,
  ) {
    return this.categoriesService.removeCategoryFromProvider(
      context.req.user.sub,
      categoryId,
    );
  }
}
