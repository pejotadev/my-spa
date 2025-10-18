import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthPayload } from './entities/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../auth/graphql-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';
import * as bcrypt from 'bcryptjs';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => AuthPayload)
  @Public()
  async login(@Args('loginDto') loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Mutation(() => User)
  @Public()
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
    @Context() context: any,
  ) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // For now, set createdBy to the admin user ID
    const createdBy = 'cmgwjyn15000094tw5itdy53s';
    
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      createdBy,
    });
  }

  @Query(() => [User], { name: 'users' })
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'customers' })
  @Public()
  findCustomers() {
    return this.usersService.findByRole('CUSTOMER');
  }

  @Query(() => [User], { name: 'serviceProviders' })
  @Public()
  findServiceProviders() {
    return this.usersService.findByRole('SERVICE_PROVIDER');
  }

  @Query(() => User, { name: 'user' })
  @Public()
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @Public()
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => User)
  @Public()
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GraphqlJwtGuard)
  getProfile(@Context() context: any) {
    // Return the user from the JWT token
    const userId = context.req.user.sub;
    return this.usersService.findOne(userId);
  }
}
