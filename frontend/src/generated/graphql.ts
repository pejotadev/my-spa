import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddCategoryToProviderDto = {
  categoryName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  access_token: Scalars['String']['output'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateEnvironmentDto = {
  depth?: InputMaybe<Scalars['Float']['input']>;
  height: Scalars['Float']['input'];
  isIndoor: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  width: Scalars['Float']['input'];
};

export type CreateGeneticsDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateLightDto = {
  type: Scalars['String']['input'];
  watts?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePlantDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  geneticsId: Scalars['ID']['input'];
};

export type CreatePlantHistoryDto = {
  notes?: InputMaybe<Scalars['String']['input']>;
  stage: Scalars['String']['input'];
};

export type CreateUserDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  nylasGrantId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Environment = {
  __typename?: 'Environment';
  createdAt: Scalars['DateTime']['output'];
  depth?: Maybe<Scalars['Float']['output']>;
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  isIndoor: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  width: Scalars['Float']['output'];
};

export type Genetics = {
  __typename?: 'Genetics';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Light = {
  __typename?: 'Light';
  createdAt: Scalars['DateTime']['output'];
  environmentId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  watts?: Maybe<Scalars['Float']['output']>;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategoryToMe: ServiceProviderCategory;
  cancelBooking: Scalars['String']['output'];
  confirmBooking: Scalars['String']['output'];
  createBooking: Scalars['String']['output'];
  createCategory: Category;
  createConfiguration: Scalars['String']['output'];
  createEnvironment: Environment;
  createGenetics: Genetics;
  createLight: Light;
  createPlant: Plant;
  createPlantHistory: PlantHistory;
  createUser: User;
  deleteBooking: Scalars['Boolean']['output'];
  deleteConfiguration: Scalars['Boolean']['output'];
  deleteEnvironment: Environment;
  deleteGenetics: Genetics;
  deleteLight: Light;
  deletePlant: Plant;
  deletePlantHistory: Scalars['Boolean']['output'];
  login: AuthPayload;
  removeCategoryFromMe: ServiceProviderCategory;
  removeUser: User;
  updateBooking: Scalars['String']['output'];
  updateConfiguration: Scalars['String']['output'];
  updateEnvironment: Environment;
  updateGenetics: Genetics;
  updateLight: Light;
  updatePlant: Plant;
  updatePlantHistory: PlantHistory;
  updatePlantStage: Plant;
  updateUser: User;
};


export type MutationAddCategoryToMeArgs = {
  addCategoryDto: AddCategoryToProviderDto;
};


export type MutationCancelBookingArgs = {
  bookingId: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
};


export type MutationConfirmBookingArgs = {
  bookingId: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
};


export type MutationCreateBookingArgs = {
  configurationId: Scalars['String']['input'];
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  serviceProviderEmail: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  createCategoryDto: CreateCategoryDto;
};


export type MutationCreateConfigurationArgs = {
  configurationData: Scalars['String']['input'];
};


export type MutationCreateEnvironmentArgs = {
  input: CreateEnvironmentDto;
};


export type MutationCreateGeneticsArgs = {
  input: CreateGeneticsDto;
};


export type MutationCreateLightArgs = {
  environmentId: Scalars['ID']['input'];
  input: CreateLightDto;
};


export type MutationCreatePlantArgs = {
  environmentId: Scalars['ID']['input'];
  input: CreatePlantDto;
};


export type MutationCreatePlantHistoryArgs = {
  environmentId: Scalars['ID']['input'];
  input: CreatePlantHistoryDto;
  plantId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  createUserDto: CreateUserDto;
};


export type MutationDeleteBookingArgs = {
  bookingId: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
};


export type MutationDeleteConfigurationArgs = {
  configurationId: Scalars['String']['input'];
};


export type MutationDeleteEnvironmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGeneticsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLightArgs = {
  environmentId: Scalars['ID']['input'];
  lightId: Scalars['ID']['input'];
};


export type MutationDeletePlantArgs = {
  environmentId: Scalars['ID']['input'];
  plantId: Scalars['ID']['input'];
};


export type MutationDeletePlantHistoryArgs = {
  environmentId: Scalars['ID']['input'];
  historyId: Scalars['ID']['input'];
  plantId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  loginDto: LoginDto;
};


export type MutationRemoveCategoryFromMeArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateBookingArgs = {
  bookingData: Scalars['String']['input'];
  bookingId: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
};


export type MutationUpdateConfigurationArgs = {
  configurationData: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
};


export type MutationUpdateEnvironmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEnvironmentDto;
};


export type MutationUpdateGeneticsArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGeneticsDto;
};


export type MutationUpdateLightArgs = {
  environmentId: Scalars['ID']['input'];
  input: UpdateLightDto;
  lightId: Scalars['ID']['input'];
};


export type MutationUpdatePlantArgs = {
  environmentId: Scalars['ID']['input'];
  input: UpdatePlantDto;
  plantId: Scalars['ID']['input'];
};


export type MutationUpdatePlantHistoryArgs = {
  environmentId: Scalars['ID']['input'];
  historyId: Scalars['ID']['input'];
  input: UpdatePlantHistoryDto;
  plantId: Scalars['ID']['input'];
};


export type MutationUpdatePlantStageArgs = {
  environmentId: Scalars['ID']['input'];
  input: UpdatePlantStageDto;
  plantId: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserDto: UpdateUserDto;
};

export type Plant = {
  __typename?: 'Plant';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentStage?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environmentId: Scalars['ID']['output'];
  genetics?: Maybe<Genetics>;
  geneticsId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PlantHistory = {
  __typename?: 'PlantHistory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  plantId: Scalars['ID']['output'];
  stage: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  customers: Array<User>;
  getAllGenetics: Array<Genetics>;
  getAvailability: Scalars['String']['output'];
  getBooking: Scalars['String']['output'];
  getConfiguration: Scalars['String']['output'];
  getEnvironment: Environment;
  getGeneticsById: Genetics;
  getLightsByEnvironment: Array<Light>;
  getMyBookings: Scalars['String']['output'];
  getMyConfigurations: Scalars['String']['output'];
  getMyEnvironments: Array<Environment>;
  getPlantById: Plant;
  getPlantHistory: Array<PlantHistory>;
  getPlantsByEnvironment: Array<Plant>;
  getProviderConfigurations: Scalars['String']['output'];
  getServiceProvidersByCategory: Scalars['String']['output'];
  isFeatureEnabled: Scalars['Boolean']['output'];
  me: User;
  myCategories: Array<Category>;
  myCategoryRelations: Array<ServiceProviderCategory>;
  serviceProviders: Array<User>;
  testFeature: Scalars['String']['output'];
  user: User;
  users: Array<User>;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAvailabilityArgs = {
  configurationId: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  serviceProviderEmail: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type QueryGetBookingArgs = {
  bookingId: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
};


export type QueryGetConfigurationArgs = {
  configurationId: Scalars['String']['input'];
};


export type QueryGetEnvironmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGeneticsByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLightsByEnvironmentArgs = {
  environmentId: Scalars['ID']['input'];
};


export type QueryGetMyBookingsArgs = {
  configurationId: Scalars['String']['input'];
  limit?: Scalars['Float']['input'];
  pageToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPlantByIdArgs = {
  environmentId: Scalars['ID']['input'];
  plantId: Scalars['ID']['input'];
};


export type QueryGetPlantHistoryArgs = {
  environmentId: Scalars['ID']['input'];
  plantId: Scalars['ID']['input'];
};


export type QueryGetPlantsByEnvironmentArgs = {
  environmentId: Scalars['ID']['input'];
};


export type QueryGetProviderConfigurationsArgs = {
  providerEmail: Scalars['String']['input'];
};


export type QueryGetServiceProvidersByCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryIsFeatureEnabledArgs = {
  featureName: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type ServiceProviderCategory = {
  __typename?: 'ServiceProviderCategory';
  category: Category;
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  serviceProvider: User;
  serviceProviderId: Scalars['String']['output'];
};

export type UpdateEnvironmentDto = {
  depth?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  isIndoor?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateGeneticsDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLightDto = {
  type?: InputMaybe<Scalars['String']['input']>;
  watts?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePlantDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  geneticsId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePlantHistoryDto = {
  notes?: InputMaybe<Scalars['String']['input']>;
  stage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlantStageDto = {
  currentStage: Scalars['String']['input'];
};

export type UpdateUserDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  nylasGrantId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  nylasGrantId?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null }> };

export type GetServiceProvidersByCategoryQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type GetServiceProvidersByCategoryQuery = { __typename?: 'Query', getServiceProvidersByCategory: string };

export type GetProviderConfigurationsQueryVariables = Exact<{
  providerEmail: Scalars['String']['input'];
}>;


export type GetProviderConfigurationsQuery = { __typename?: 'Query', getProviderConfigurations: string };

export type GetCustomerAvailabilityQueryVariables = Exact<{
  configurationId: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  serviceProviderEmail: Scalars['String']['input'];
}>;


export type GetCustomerAvailabilityQuery = { __typename?: 'Query', getAvailability: string };

export type CreateBookingMutationVariables = Exact<{
  configurationId: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  serviceProviderEmail: Scalars['String']['input'];
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: string };

export type GetMyConfigurationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyConfigurationsQuery = { __typename?: 'Query', getMyConfigurations: string };

export type GetMyBookingsQueryVariables = Exact<{
  configurationId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  pageToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyBookingsQuery = { __typename?: 'Query', getMyBookings: string };

export type GetAvailabilityQueryVariables = Exact<{
  configurationId: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  serviceProviderEmail: Scalars['String']['input'];
}>;


export type GetAvailabilityQuery = { __typename?: 'Query', getAvailability: string };

export type CreateConfigurationMutationVariables = Exact<{
  configurationData: Scalars['String']['input'];
}>;


export type CreateConfigurationMutation = { __typename?: 'Mutation', createConfiguration: string };

export type UpdateConfigurationMutationVariables = Exact<{
  configurationId: Scalars['String']['input'];
  configurationData: Scalars['String']['input'];
}>;


export type UpdateConfigurationMutation = { __typename?: 'Mutation', updateConfiguration: string };

export type ConfirmBookingMutationVariables = Exact<{
  bookingId: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
}>;


export type ConfirmBookingMutation = { __typename?: 'Mutation', confirmBooking: string };

export type CancelBookingMutationVariables = Exact<{
  bookingId: Scalars['String']['input'];
  configurationId: Scalars['String']['input'];
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', cancelBooking: string };

export type DeleteConfigurationMutationVariables = Exact<{
  configurationId: Scalars['String']['input'];
}>;


export type DeleteConfigurationMutation = { __typename?: 'Mutation', deleteConfiguration: boolean };

export type CheckFeatureQueryVariables = Exact<{
  featureName: Scalars['String']['input'];
}>;


export type CheckFeatureQuery = { __typename?: 'Query', isFeatureEnabled: boolean };

export type GetMyCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCategoriesQuery = { __typename?: 'Query', myCategories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, createdAt: any }> };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null }> };

export type AddCategoryToMeMutationVariables = Exact<{
  addCategoryDto: AddCategoryToProviderDto;
}>;


export type AddCategoryToMeMutation = { __typename?: 'Mutation', addCategoryToMe: { __typename?: 'ServiceProviderCategory', id: string, createdAt: any, category: { __typename?: 'Category', id: string, name: string, description?: string | null } } };

export type RemoveCategoryFromMeMutationVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type RemoveCategoryFromMeMutation = { __typename?: 'Mutation', removeCategoryFromMe: { __typename?: 'ServiceProviderCategory', id: string, category: { __typename?: 'Category', id: string, name: string, description?: string | null } } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string, createdAt: any, updatedAt: any }> };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string, createdAt: any, updatedAt: any }> };

export type GetServiceProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServiceProvidersQuery = { __typename?: 'Query', serviceProviders: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string, createdAt: any, updatedAt: any }> };

export type CreateUserMutationVariables = Exact<{
  createUserDto: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string, createdAt: any } };

export type LoginMutationVariables = Exact<{
  loginDto: LoginDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', access_token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string, createdAt: any, updatedAt: any } } };

export type GetEnvironmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEnvironmentQuery = { __typename?: 'Query', getEnvironment: { __typename?: 'Environment', id: string, name: string, isIndoor: boolean, width: number, height: number, depth?: number | null, createdAt: any, updatedAt: any } };

export type UpdateEnvironmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateEnvironmentDto;
}>;


export type UpdateEnvironmentMutation = { __typename?: 'Mutation', updateEnvironment: { __typename?: 'Environment', id: string, name: string, isIndoor: boolean, width: number, height: number, depth?: number | null, updatedAt: any } };

export type GetMyEnvironmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyEnvironmentsQuery = { __typename?: 'Query', getMyEnvironments: Array<{ __typename?: 'Environment', id: string, name: string, isIndoor: boolean, width: number, height: number, depth?: number | null, createdAt: any, updatedAt: any }> };

export type CreateEnvironmentMutationVariables = Exact<{
  input: CreateEnvironmentDto;
}>;


export type CreateEnvironmentMutation = { __typename?: 'Mutation', createEnvironment: { __typename?: 'Environment', id: string, name: string, isIndoor: boolean, width: number, height: number, depth?: number | null, createdAt: any } };

export type DeleteEnvironmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEnvironmentMutation = { __typename?: 'Mutation', deleteEnvironment: { __typename?: 'Environment', id: string, name: string } };

export type GetLightsByEnvironmentQueryVariables = Exact<{
  environmentId: Scalars['ID']['input'];
}>;


export type GetLightsByEnvironmentQuery = { __typename?: 'Query', getLightsByEnvironment: Array<{ __typename?: 'Light', id: string, type: string, watts?: number | null, createdAt: any, updatedAt: any }> };

export type CreateLightMutationVariables = Exact<{
  environmentId: Scalars['ID']['input'];
  input: CreateLightDto;
}>;


export type CreateLightMutation = { __typename?: 'Mutation', createLight: { __typename?: 'Light', id: string, type: string, watts?: number | null, createdAt: any } };

export type UpdateLightMutationVariables = Exact<{
  lightId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
  input: UpdateLightDto;
}>;


export type UpdateLightMutation = { __typename?: 'Mutation', updateLight: { __typename?: 'Light', id: string, type: string, watts?: number | null, updatedAt: any } };

export type DeleteLightMutationVariables = Exact<{
  lightId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
}>;


export type DeleteLightMutation = { __typename?: 'Mutation', deleteLight: { __typename?: 'Light', id: string, type: string } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string, createdAt: any, updatedAt: any } };

export type UpdatePlantStageMutationVariables = Exact<{
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
  input: UpdatePlantStageDto;
}>;


export type UpdatePlantStageMutation = { __typename?: 'Mutation', updatePlantStage: { __typename?: 'Plant', id: string, code: string, currentStage?: string | null } };

export type UpdatePlantHistoryMutationVariables = Exact<{
  historyId: Scalars['ID']['input'];
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
  input: UpdatePlantHistoryDto;
}>;


export type UpdatePlantHistoryMutation = { __typename?: 'Mutation', updatePlantHistory: { __typename?: 'PlantHistory', id: string, stage: string, notes?: string | null, createdAt: any } };

export type DeletePlantHistoryMutationVariables = Exact<{
  historyId: Scalars['ID']['input'];
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
}>;


export type DeletePlantHistoryMutation = { __typename?: 'Mutation', deletePlantHistory: boolean };

export type GetPlantsByEnvironmentQueryVariables = Exact<{
  environmentId: Scalars['ID']['input'];
}>;


export type GetPlantsByEnvironmentQuery = { __typename?: 'Query', getPlantsByEnvironment: Array<{ __typename?: 'Plant', id: string, code: string, description?: string | null, geneticsId: string, environmentId: string, createdAt: any, updatedAt: any, genetics?: { __typename?: 'Genetics', id: string, name: string, description?: string | null } | null }> };

export type GetPlantByIdQueryVariables = Exact<{
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
}>;


export type GetPlantByIdQuery = { __typename?: 'Query', getPlantById: { __typename?: 'Plant', id: string, code: string, description?: string | null, geneticsId: string, environmentId: string, createdAt: any, updatedAt: any, genetics?: { __typename?: 'Genetics', id: string, name: string, description?: string | null } | null } };

export type CreatePlantMutationVariables = Exact<{
  environmentId: Scalars['ID']['input'];
  input: CreatePlantDto;
}>;


export type CreatePlantMutation = { __typename?: 'Mutation', createPlant: { __typename?: 'Plant', id: string, code: string, description?: string | null, geneticsId: string, environmentId: string, createdAt: any, genetics?: { __typename?: 'Genetics', id: string, name: string, description?: string | null } | null } };

export type UpdatePlantMutationVariables = Exact<{
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
  input: UpdatePlantDto;
}>;


export type UpdatePlantMutation = { __typename?: 'Mutation', updatePlant: { __typename?: 'Plant', id: string, code: string, description?: string | null, geneticsId: string, environmentId: string, updatedAt: any, genetics?: { __typename?: 'Genetics', id: string, name: string, description?: string | null } | null } };

export type DeletePlantMutationVariables = Exact<{
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
}>;


export type DeletePlantMutation = { __typename?: 'Mutation', deletePlant: { __typename?: 'Plant', id: string } };

export type GetAllGeneticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGeneticsQuery = { __typename?: 'Query', getAllGenetics: Array<{ __typename?: 'Genetics', id: string, name: string, description?: string | null, createdAt: any, updatedAt: any }> };

export type CreateGeneticsMutationVariables = Exact<{
  input: CreateGeneticsDto;
}>;


export type CreateGeneticsMutation = { __typename?: 'Mutation', createGenetics: { __typename?: 'Genetics', id: string, name: string, description?: string | null, createdAt: any } };

export type GetPlantHistoryQueryVariables = Exact<{
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
}>;


export type GetPlantHistoryQuery = { __typename?: 'Query', getPlantHistory: Array<{ __typename?: 'PlantHistory', id: string, plantId: string, stage: string, notes?: string | null, createdAt: any }> };

export type CreatePlantHistoryMutationVariables = Exact<{
  plantId: Scalars['ID']['input'];
  environmentId: Scalars['ID']['input'];
  input: CreatePlantHistoryDto;
}>;


export type CreatePlantHistoryMutation = { __typename?: 'Mutation', createPlantHistory: { __typename?: 'PlantHistory', id: string, plantId: string, stage: string, notes?: string | null, createdAt: any } };


export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    name
    description
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export function refetchGetCategoriesQuery(variables?: GetCategoriesQueryVariables) {
      return { query: GetCategoriesDocument, variables: variables }
    }
export const GetServiceProvidersByCategoryDocument = gql`
    query GetServiceProvidersByCategory($categoryId: String!) {
  getServiceProvidersByCategory(categoryId: $categoryId)
}
    `;

/**
 * __useGetServiceProvidersByCategoryQuery__
 *
 * To run a query within a React component, call `useGetServiceProvidersByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceProvidersByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceProvidersByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetServiceProvidersByCategoryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetServiceProvidersByCategoryQuery, GetServiceProvidersByCategoryQueryVariables> & ({ variables: GetServiceProvidersByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetServiceProvidersByCategoryQuery, GetServiceProvidersByCategoryQueryVariables>(GetServiceProvidersByCategoryDocument, options);
      }
export function useGetServiceProvidersByCategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServiceProvidersByCategoryQuery, GetServiceProvidersByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetServiceProvidersByCategoryQuery, GetServiceProvidersByCategoryQueryVariables>(GetServiceProvidersByCategoryDocument, options);
        }
export function useGetServiceProvidersByCategorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetServiceProvidersByCategoryQuery, GetServiceProvidersByCategoryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetServiceProvidersByCategoryQuery, GetServiceProvidersByCategoryQueryVariables>(GetServiceProvidersByCategoryDocument, options);
        }
export type GetServiceProvidersByCategoryQueryHookResult = ReturnType<typeof useGetServiceProvidersByCategoryQuery>;
export type GetServiceProvidersByCategoryLazyQueryHookResult = ReturnType<typeof useGetServiceProvidersByCategoryLazyQuery>;
export type GetServiceProvidersByCategorySuspenseQueryHookResult = ReturnType<typeof useGetServiceProvidersByCategorySuspenseQuery>;
export type GetServiceProvidersByCategoryQueryResult = Apollo.QueryResult<GetServiceProvidersByCategoryQuery, GetServiceProvidersByCategoryQueryVariables>;
export function refetchGetServiceProvidersByCategoryQuery(variables: GetServiceProvidersByCategoryQueryVariables) {
      return { query: GetServiceProvidersByCategoryDocument, variables: variables }
    }
export const GetProviderConfigurationsDocument = gql`
    query GetProviderConfigurations($providerEmail: String!) {
  getProviderConfigurations(providerEmail: $providerEmail)
}
    `;

/**
 * __useGetProviderConfigurationsQuery__
 *
 * To run a query within a React component, call `useGetProviderConfigurationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProviderConfigurationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProviderConfigurationsQuery({
 *   variables: {
 *      providerEmail: // value for 'providerEmail'
 *   },
 * });
 */
export function useGetProviderConfigurationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetProviderConfigurationsQuery, GetProviderConfigurationsQueryVariables> & ({ variables: GetProviderConfigurationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetProviderConfigurationsQuery, GetProviderConfigurationsQueryVariables>(GetProviderConfigurationsDocument, options);
      }
export function useGetProviderConfigurationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProviderConfigurationsQuery, GetProviderConfigurationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetProviderConfigurationsQuery, GetProviderConfigurationsQueryVariables>(GetProviderConfigurationsDocument, options);
        }
export function useGetProviderConfigurationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetProviderConfigurationsQuery, GetProviderConfigurationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetProviderConfigurationsQuery, GetProviderConfigurationsQueryVariables>(GetProviderConfigurationsDocument, options);
        }
export type GetProviderConfigurationsQueryHookResult = ReturnType<typeof useGetProviderConfigurationsQuery>;
export type GetProviderConfigurationsLazyQueryHookResult = ReturnType<typeof useGetProviderConfigurationsLazyQuery>;
export type GetProviderConfigurationsSuspenseQueryHookResult = ReturnType<typeof useGetProviderConfigurationsSuspenseQuery>;
export type GetProviderConfigurationsQueryResult = Apollo.QueryResult<GetProviderConfigurationsQuery, GetProviderConfigurationsQueryVariables>;
export function refetchGetProviderConfigurationsQuery(variables: GetProviderConfigurationsQueryVariables) {
      return { query: GetProviderConfigurationsDocument, variables: variables }
    }
export const GetCustomerAvailabilityDocument = gql`
    query GetCustomerAvailability($configurationId: String!, $startTime: String!, $endTime: String!, $serviceProviderEmail: String!) {
  getAvailability(
    configurationId: $configurationId
    startTime: $startTime
    endTime: $endTime
    serviceProviderEmail: $serviceProviderEmail
  )
}
    `;

/**
 * __useGetCustomerAvailabilityQuery__
 *
 * To run a query within a React component, call `useGetCustomerAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerAvailabilityQuery({
 *   variables: {
 *      configurationId: // value for 'configurationId'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      serviceProviderEmail: // value for 'serviceProviderEmail'
 *   },
 * });
 */
export function useGetCustomerAvailabilityQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCustomerAvailabilityQuery, GetCustomerAvailabilityQueryVariables> & ({ variables: GetCustomerAvailabilityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomerAvailabilityQuery, GetCustomerAvailabilityQueryVariables>(GetCustomerAvailabilityDocument, options);
      }
export function useGetCustomerAvailabilityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomerAvailabilityQuery, GetCustomerAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomerAvailabilityQuery, GetCustomerAvailabilityQueryVariables>(GetCustomerAvailabilityDocument, options);
        }
export function useGetCustomerAvailabilitySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomerAvailabilityQuery, GetCustomerAvailabilityQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomerAvailabilityQuery, GetCustomerAvailabilityQueryVariables>(GetCustomerAvailabilityDocument, options);
        }
export type GetCustomerAvailabilityQueryHookResult = ReturnType<typeof useGetCustomerAvailabilityQuery>;
export type GetCustomerAvailabilityLazyQueryHookResult = ReturnType<typeof useGetCustomerAvailabilityLazyQuery>;
export type GetCustomerAvailabilitySuspenseQueryHookResult = ReturnType<typeof useGetCustomerAvailabilitySuspenseQuery>;
export type GetCustomerAvailabilityQueryResult = Apollo.QueryResult<GetCustomerAvailabilityQuery, GetCustomerAvailabilityQueryVariables>;
export function refetchGetCustomerAvailabilityQuery(variables: GetCustomerAvailabilityQueryVariables) {
      return { query: GetCustomerAvailabilityDocument, variables: variables }
    }
export const CreateBookingDocument = gql`
    mutation CreateBooking($configurationId: String!, $startTime: String!, $endTime: String!, $customerEmail: String!, $customerName: String!, $serviceProviderEmail: String!) {
  createBooking(
    configurationId: $configurationId
    startTime: $startTime
    endTime: $endTime
    customerEmail: $customerEmail
    customerName: $customerName
    serviceProviderEmail: $serviceProviderEmail
  )
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      configurationId: // value for 'configurationId'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      customerEmail: // value for 'customerEmail'
 *      customerName: // value for 'customerName'
 *      serviceProviderEmail: // value for 'serviceProviderEmail'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const GetMyConfigurationsDocument = gql`
    query GetMyConfigurations {
  getMyConfigurations
}
    `;

/**
 * __useGetMyConfigurationsQuery__
 *
 * To run a query within a React component, call `useGetMyConfigurationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyConfigurationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyConfigurationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyConfigurationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyConfigurationsQuery, GetMyConfigurationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyConfigurationsQuery, GetMyConfigurationsQueryVariables>(GetMyConfigurationsDocument, options);
      }
export function useGetMyConfigurationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyConfigurationsQuery, GetMyConfigurationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyConfigurationsQuery, GetMyConfigurationsQueryVariables>(GetMyConfigurationsDocument, options);
        }
export function useGetMyConfigurationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyConfigurationsQuery, GetMyConfigurationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyConfigurationsQuery, GetMyConfigurationsQueryVariables>(GetMyConfigurationsDocument, options);
        }
export type GetMyConfigurationsQueryHookResult = ReturnType<typeof useGetMyConfigurationsQuery>;
export type GetMyConfigurationsLazyQueryHookResult = ReturnType<typeof useGetMyConfigurationsLazyQuery>;
export type GetMyConfigurationsSuspenseQueryHookResult = ReturnType<typeof useGetMyConfigurationsSuspenseQuery>;
export type GetMyConfigurationsQueryResult = Apollo.QueryResult<GetMyConfigurationsQuery, GetMyConfigurationsQueryVariables>;
export function refetchGetMyConfigurationsQuery(variables?: GetMyConfigurationsQueryVariables) {
      return { query: GetMyConfigurationsDocument, variables: variables }
    }
export const GetMyBookingsDocument = gql`
    query GetMyBookings($configurationId: String!, $limit: Float, $pageToken: String) {
  getMyBookings(
    configurationId: $configurationId
    limit: $limit
    pageToken: $pageToken
  )
}
    `;

/**
 * __useGetMyBookingsQuery__
 *
 * To run a query within a React component, call `useGetMyBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBookingsQuery({
 *   variables: {
 *      configurationId: // value for 'configurationId'
 *      limit: // value for 'limit'
 *      pageToken: // value for 'pageToken'
 *   },
 * });
 */
export function useGetMyBookingsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetMyBookingsQuery, GetMyBookingsQueryVariables> & ({ variables: GetMyBookingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyBookingsQuery, GetMyBookingsQueryVariables>(GetMyBookingsDocument, options);
      }
export function useGetMyBookingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyBookingsQuery, GetMyBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyBookingsQuery, GetMyBookingsQueryVariables>(GetMyBookingsDocument, options);
        }
export function useGetMyBookingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyBookingsQuery, GetMyBookingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyBookingsQuery, GetMyBookingsQueryVariables>(GetMyBookingsDocument, options);
        }
export type GetMyBookingsQueryHookResult = ReturnType<typeof useGetMyBookingsQuery>;
export type GetMyBookingsLazyQueryHookResult = ReturnType<typeof useGetMyBookingsLazyQuery>;
export type GetMyBookingsSuspenseQueryHookResult = ReturnType<typeof useGetMyBookingsSuspenseQuery>;
export type GetMyBookingsQueryResult = Apollo.QueryResult<GetMyBookingsQuery, GetMyBookingsQueryVariables>;
export function refetchGetMyBookingsQuery(variables: GetMyBookingsQueryVariables) {
      return { query: GetMyBookingsDocument, variables: variables }
    }
export const GetAvailabilityDocument = gql`
    query GetAvailability($configurationId: String!, $startTime: String!, $endTime: String!, $serviceProviderEmail: String!) {
  getAvailability(
    configurationId: $configurationId
    startTime: $startTime
    endTime: $endTime
    serviceProviderEmail: $serviceProviderEmail
  )
}
    `;

/**
 * __useGetAvailabilityQuery__
 *
 * To run a query within a React component, call `useGetAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailabilityQuery({
 *   variables: {
 *      configurationId: // value for 'configurationId'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      serviceProviderEmail: // value for 'serviceProviderEmail'
 *   },
 * });
 */
export function useGetAvailabilityQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetAvailabilityQuery, GetAvailabilityQueryVariables> & ({ variables: GetAvailabilityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAvailabilityQuery, GetAvailabilityQueryVariables>(GetAvailabilityDocument, options);
      }
export function useGetAvailabilityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAvailabilityQuery, GetAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAvailabilityQuery, GetAvailabilityQueryVariables>(GetAvailabilityDocument, options);
        }
export function useGetAvailabilitySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAvailabilityQuery, GetAvailabilityQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAvailabilityQuery, GetAvailabilityQueryVariables>(GetAvailabilityDocument, options);
        }
export type GetAvailabilityQueryHookResult = ReturnType<typeof useGetAvailabilityQuery>;
export type GetAvailabilityLazyQueryHookResult = ReturnType<typeof useGetAvailabilityLazyQuery>;
export type GetAvailabilitySuspenseQueryHookResult = ReturnType<typeof useGetAvailabilitySuspenseQuery>;
export type GetAvailabilityQueryResult = Apollo.QueryResult<GetAvailabilityQuery, GetAvailabilityQueryVariables>;
export function refetchGetAvailabilityQuery(variables: GetAvailabilityQueryVariables) {
      return { query: GetAvailabilityDocument, variables: variables }
    }
export const CreateConfigurationDocument = gql`
    mutation CreateConfiguration($configurationData: String!) {
  createConfiguration(configurationData: $configurationData)
}
    `;
export type CreateConfigurationMutationFn = Apollo.MutationFunction<CreateConfigurationMutation, CreateConfigurationMutationVariables>;

/**
 * __useCreateConfigurationMutation__
 *
 * To run a mutation, you first call `useCreateConfigurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConfigurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConfigurationMutation, { data, loading, error }] = useCreateConfigurationMutation({
 *   variables: {
 *      configurationData: // value for 'configurationData'
 *   },
 * });
 */
export function useCreateConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateConfigurationMutation, CreateConfigurationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateConfigurationMutation, CreateConfigurationMutationVariables>(CreateConfigurationDocument, options);
      }
export type CreateConfigurationMutationHookResult = ReturnType<typeof useCreateConfigurationMutation>;
export type CreateConfigurationMutationResult = Apollo.MutationResult<CreateConfigurationMutation>;
export type CreateConfigurationMutationOptions = Apollo.BaseMutationOptions<CreateConfigurationMutation, CreateConfigurationMutationVariables>;
export const UpdateConfigurationDocument = gql`
    mutation UpdateConfiguration($configurationId: String!, $configurationData: String!) {
  updateConfiguration(
    configurationId: $configurationId
    configurationData: $configurationData
  )
}
    `;
export type UpdateConfigurationMutationFn = Apollo.MutationFunction<UpdateConfigurationMutation, UpdateConfigurationMutationVariables>;

/**
 * __useUpdateConfigurationMutation__
 *
 * To run a mutation, you first call `useUpdateConfigurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConfigurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConfigurationMutation, { data, loading, error }] = useUpdateConfigurationMutation({
 *   variables: {
 *      configurationId: // value for 'configurationId'
 *      configurationData: // value for 'configurationData'
 *   },
 * });
 */
export function useUpdateConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateConfigurationMutation, UpdateConfigurationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateConfigurationMutation, UpdateConfigurationMutationVariables>(UpdateConfigurationDocument, options);
      }
export type UpdateConfigurationMutationHookResult = ReturnType<typeof useUpdateConfigurationMutation>;
export type UpdateConfigurationMutationResult = Apollo.MutationResult<UpdateConfigurationMutation>;
export type UpdateConfigurationMutationOptions = Apollo.BaseMutationOptions<UpdateConfigurationMutation, UpdateConfigurationMutationVariables>;
export const ConfirmBookingDocument = gql`
    mutation ConfirmBooking($bookingId: String!, $configurationId: String!) {
  confirmBooking(bookingId: $bookingId, configurationId: $configurationId)
}
    `;
export type ConfirmBookingMutationFn = Apollo.MutationFunction<ConfirmBookingMutation, ConfirmBookingMutationVariables>;

/**
 * __useConfirmBookingMutation__
 *
 * To run a mutation, you first call `useConfirmBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmBookingMutation, { data, loading, error }] = useConfirmBookingMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *      configurationId: // value for 'configurationId'
 *   },
 * });
 */
export function useConfirmBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConfirmBookingMutation, ConfirmBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ConfirmBookingMutation, ConfirmBookingMutationVariables>(ConfirmBookingDocument, options);
      }
export type ConfirmBookingMutationHookResult = ReturnType<typeof useConfirmBookingMutation>;
export type ConfirmBookingMutationResult = Apollo.MutationResult<ConfirmBookingMutation>;
export type ConfirmBookingMutationOptions = Apollo.BaseMutationOptions<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
export const CancelBookingDocument = gql`
    mutation CancelBooking($bookingId: String!, $configurationId: String!) {
  cancelBooking(bookingId: $bookingId, configurationId: $configurationId)
}
    `;
export type CancelBookingMutationFn = Apollo.MutationFunction<CancelBookingMutation, CancelBookingMutationVariables>;

/**
 * __useCancelBookingMutation__
 *
 * To run a mutation, you first call `useCancelBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBookingMutation, { data, loading, error }] = useCancelBookingMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *      configurationId: // value for 'configurationId'
 *   },
 * });
 */
export function useCancelBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelBookingMutation, CancelBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelBookingMutation, CancelBookingMutationVariables>(CancelBookingDocument, options);
      }
export type CancelBookingMutationHookResult = ReturnType<typeof useCancelBookingMutation>;
export type CancelBookingMutationResult = Apollo.MutationResult<CancelBookingMutation>;
export type CancelBookingMutationOptions = Apollo.BaseMutationOptions<CancelBookingMutation, CancelBookingMutationVariables>;
export const DeleteConfigurationDocument = gql`
    mutation DeleteConfiguration($configurationId: String!) {
  deleteConfiguration(configurationId: $configurationId)
}
    `;
export type DeleteConfigurationMutationFn = Apollo.MutationFunction<DeleteConfigurationMutation, DeleteConfigurationMutationVariables>;

/**
 * __useDeleteConfigurationMutation__
 *
 * To run a mutation, you first call `useDeleteConfigurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteConfigurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteConfigurationMutation, { data, loading, error }] = useDeleteConfigurationMutation({
 *   variables: {
 *      configurationId: // value for 'configurationId'
 *   },
 * });
 */
export function useDeleteConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteConfigurationMutation, DeleteConfigurationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteConfigurationMutation, DeleteConfigurationMutationVariables>(DeleteConfigurationDocument, options);
      }
export type DeleteConfigurationMutationHookResult = ReturnType<typeof useDeleteConfigurationMutation>;
export type DeleteConfigurationMutationResult = Apollo.MutationResult<DeleteConfigurationMutation>;
export type DeleteConfigurationMutationOptions = Apollo.BaseMutationOptions<DeleteConfigurationMutation, DeleteConfigurationMutationVariables>;
export const CheckFeatureDocument = gql`
    query CheckFeature($featureName: String!) {
  isFeatureEnabled(featureName: $featureName)
}
    `;

/**
 * __useCheckFeatureQuery__
 *
 * To run a query within a React component, call `useCheckFeatureQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckFeatureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckFeatureQuery({
 *   variables: {
 *      featureName: // value for 'featureName'
 *   },
 * });
 */
export function useCheckFeatureQuery(baseOptions: ApolloReactHooks.QueryHookOptions<CheckFeatureQuery, CheckFeatureQueryVariables> & ({ variables: CheckFeatureQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CheckFeatureQuery, CheckFeatureQueryVariables>(CheckFeatureDocument, options);
      }
export function useCheckFeatureLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CheckFeatureQuery, CheckFeatureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CheckFeatureQuery, CheckFeatureQueryVariables>(CheckFeatureDocument, options);
        }
export function useCheckFeatureSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CheckFeatureQuery, CheckFeatureQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CheckFeatureQuery, CheckFeatureQueryVariables>(CheckFeatureDocument, options);
        }
export type CheckFeatureQueryHookResult = ReturnType<typeof useCheckFeatureQuery>;
export type CheckFeatureLazyQueryHookResult = ReturnType<typeof useCheckFeatureLazyQuery>;
export type CheckFeatureSuspenseQueryHookResult = ReturnType<typeof useCheckFeatureSuspenseQuery>;
export type CheckFeatureQueryResult = Apollo.QueryResult<CheckFeatureQuery, CheckFeatureQueryVariables>;
export function refetchCheckFeatureQuery(variables: CheckFeatureQueryVariables) {
      return { query: CheckFeatureDocument, variables: variables }
    }
export const GetMyCategoriesDocument = gql`
    query GetMyCategories {
  myCategories {
    id
    name
    description
    createdAt
  }
}
    `;

/**
 * __useGetMyCategoriesQuery__
 *
 * To run a query within a React component, call `useGetMyCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyCategoriesQuery, GetMyCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyCategoriesQuery, GetMyCategoriesQueryVariables>(GetMyCategoriesDocument, options);
      }
export function useGetMyCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyCategoriesQuery, GetMyCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyCategoriesQuery, GetMyCategoriesQueryVariables>(GetMyCategoriesDocument, options);
        }
export function useGetMyCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyCategoriesQuery, GetMyCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyCategoriesQuery, GetMyCategoriesQueryVariables>(GetMyCategoriesDocument, options);
        }
export type GetMyCategoriesQueryHookResult = ReturnType<typeof useGetMyCategoriesQuery>;
export type GetMyCategoriesLazyQueryHookResult = ReturnType<typeof useGetMyCategoriesLazyQuery>;
export type GetMyCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetMyCategoriesSuspenseQuery>;
export type GetMyCategoriesQueryResult = Apollo.QueryResult<GetMyCategoriesQuery, GetMyCategoriesQueryVariables>;
export function refetchGetMyCategoriesQuery(variables?: GetMyCategoriesQueryVariables) {
      return { query: GetMyCategoriesDocument, variables: variables }
    }
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  categories {
    id
    name
    description
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export function refetchGetAllCategoriesQuery(variables?: GetAllCategoriesQueryVariables) {
      return { query: GetAllCategoriesDocument, variables: variables }
    }
export const AddCategoryToMeDocument = gql`
    mutation AddCategoryToMe($addCategoryDto: AddCategoryToProviderDto!) {
  addCategoryToMe(addCategoryDto: $addCategoryDto) {
    id
    category {
      id
      name
      description
    }
    createdAt
  }
}
    `;
export type AddCategoryToMeMutationFn = Apollo.MutationFunction<AddCategoryToMeMutation, AddCategoryToMeMutationVariables>;

/**
 * __useAddCategoryToMeMutation__
 *
 * To run a mutation, you first call `useAddCategoryToMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryToMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryToMeMutation, { data, loading, error }] = useAddCategoryToMeMutation({
 *   variables: {
 *      addCategoryDto: // value for 'addCategoryDto'
 *   },
 * });
 */
export function useAddCategoryToMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCategoryToMeMutation, AddCategoryToMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddCategoryToMeMutation, AddCategoryToMeMutationVariables>(AddCategoryToMeDocument, options);
      }
export type AddCategoryToMeMutationHookResult = ReturnType<typeof useAddCategoryToMeMutation>;
export type AddCategoryToMeMutationResult = Apollo.MutationResult<AddCategoryToMeMutation>;
export type AddCategoryToMeMutationOptions = Apollo.BaseMutationOptions<AddCategoryToMeMutation, AddCategoryToMeMutationVariables>;
export const RemoveCategoryFromMeDocument = gql`
    mutation RemoveCategoryFromMe($categoryId: String!) {
  removeCategoryFromMe(categoryId: $categoryId) {
    id
    category {
      id
      name
      description
    }
  }
}
    `;
export type RemoveCategoryFromMeMutationFn = Apollo.MutationFunction<RemoveCategoryFromMeMutation, RemoveCategoryFromMeMutationVariables>;

/**
 * __useRemoveCategoryFromMeMutation__
 *
 * To run a mutation, you first call `useRemoveCategoryFromMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategoryFromMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCategoryFromMeMutation, { data, loading, error }] = useRemoveCategoryFromMeMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useRemoveCategoryFromMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCategoryFromMeMutation, RemoveCategoryFromMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveCategoryFromMeMutation, RemoveCategoryFromMeMutationVariables>(RemoveCategoryFromMeDocument, options);
      }
export type RemoveCategoryFromMeMutationHookResult = ReturnType<typeof useRemoveCategoryFromMeMutation>;
export type RemoveCategoryFromMeMutationResult = Apollo.MutationResult<RemoveCategoryFromMeMutation>;
export type RemoveCategoryFromMeMutationOptions = Apollo.BaseMutationOptions<RemoveCategoryFromMeMutation, RemoveCategoryFromMeMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
    firstName
    lastName
    role
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
      return { query: GetUsersDocument, variables: variables }
    }
export const GetCustomersDocument = gql`
    query GetCustomers {
  customers {
    id
    email
    firstName
    lastName
    role
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export function useGetCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersSuspenseQueryHookResult = ReturnType<typeof useGetCustomersSuspenseQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export function refetchGetCustomersQuery(variables?: GetCustomersQueryVariables) {
      return { query: GetCustomersDocument, variables: variables }
    }
export const GetServiceProvidersDocument = gql`
    query GetServiceProviders {
  serviceProviders {
    id
    email
    firstName
    lastName
    role
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetServiceProvidersQuery__
 *
 * To run a query within a React component, call `useGetServiceProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServiceProvidersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetServiceProvidersQuery, GetServiceProvidersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetServiceProvidersQuery, GetServiceProvidersQueryVariables>(GetServiceProvidersDocument, options);
      }
export function useGetServiceProvidersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServiceProvidersQuery, GetServiceProvidersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetServiceProvidersQuery, GetServiceProvidersQueryVariables>(GetServiceProvidersDocument, options);
        }
export function useGetServiceProvidersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetServiceProvidersQuery, GetServiceProvidersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetServiceProvidersQuery, GetServiceProvidersQueryVariables>(GetServiceProvidersDocument, options);
        }
export type GetServiceProvidersQueryHookResult = ReturnType<typeof useGetServiceProvidersQuery>;
export type GetServiceProvidersLazyQueryHookResult = ReturnType<typeof useGetServiceProvidersLazyQuery>;
export type GetServiceProvidersSuspenseQueryHookResult = ReturnType<typeof useGetServiceProvidersSuspenseQuery>;
export type GetServiceProvidersQueryResult = Apollo.QueryResult<GetServiceProvidersQuery, GetServiceProvidersQueryVariables>;
export function refetchGetServiceProvidersQuery(variables?: GetServiceProvidersQueryVariables) {
      return { query: GetServiceProvidersDocument, variables: variables }
    }
export const CreateUserDocument = gql`
    mutation CreateUser($createUserDto: CreateUserDto!) {
  createUser(createUserDto: $createUserDto) {
    id
    email
    firstName
    lastName
    role
    createdAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserDto: // value for 'createUserDto'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginDto: LoginDto!) {
  login(loginDto: $loginDto) {
    access_token
    user {
      id
      email
      firstName
      lastName
      role
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginDto: // value for 'loginDto'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetEnvironmentDocument = gql`
    query GetEnvironment($id: ID!) {
  getEnvironment(id: $id) {
    id
    name
    isIndoor
    width
    height
    depth
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetEnvironmentQuery__
 *
 * To run a query within a React component, call `useGetEnvironmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnvironmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnvironmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEnvironmentQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEnvironmentQuery, GetEnvironmentQueryVariables> & ({ variables: GetEnvironmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEnvironmentQuery, GetEnvironmentQueryVariables>(GetEnvironmentDocument, options);
      }
export function useGetEnvironmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEnvironmentQuery, GetEnvironmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEnvironmentQuery, GetEnvironmentQueryVariables>(GetEnvironmentDocument, options);
        }
export function useGetEnvironmentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetEnvironmentQuery, GetEnvironmentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetEnvironmentQuery, GetEnvironmentQueryVariables>(GetEnvironmentDocument, options);
        }
export type GetEnvironmentQueryHookResult = ReturnType<typeof useGetEnvironmentQuery>;
export type GetEnvironmentLazyQueryHookResult = ReturnType<typeof useGetEnvironmentLazyQuery>;
export type GetEnvironmentSuspenseQueryHookResult = ReturnType<typeof useGetEnvironmentSuspenseQuery>;
export type GetEnvironmentQueryResult = Apollo.QueryResult<GetEnvironmentQuery, GetEnvironmentQueryVariables>;
export function refetchGetEnvironmentQuery(variables: GetEnvironmentQueryVariables) {
      return { query: GetEnvironmentDocument, variables: variables }
    }
export const UpdateEnvironmentDocument = gql`
    mutation UpdateEnvironment($id: ID!, $input: UpdateEnvironmentDto!) {
  updateEnvironment(id: $id, input: $input) {
    id
    name
    isIndoor
    width
    height
    depth
    updatedAt
  }
}
    `;
export type UpdateEnvironmentMutationFn = Apollo.MutationFunction<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>;

/**
 * __useUpdateEnvironmentMutation__
 *
 * To run a mutation, you first call `useUpdateEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEnvironmentMutation, { data, loading, error }] = useUpdateEnvironmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEnvironmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>(UpdateEnvironmentDocument, options);
      }
export type UpdateEnvironmentMutationHookResult = ReturnType<typeof useUpdateEnvironmentMutation>;
export type UpdateEnvironmentMutationResult = Apollo.MutationResult<UpdateEnvironmentMutation>;
export type UpdateEnvironmentMutationOptions = Apollo.BaseMutationOptions<UpdateEnvironmentMutation, UpdateEnvironmentMutationVariables>;
export const GetMyEnvironmentsDocument = gql`
    query GetMyEnvironments {
  getMyEnvironments {
    id
    name
    isIndoor
    width
    height
    depth
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMyEnvironmentsQuery__
 *
 * To run a query within a React component, call `useGetMyEnvironmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEnvironmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEnvironmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyEnvironmentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyEnvironmentsQuery, GetMyEnvironmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyEnvironmentsQuery, GetMyEnvironmentsQueryVariables>(GetMyEnvironmentsDocument, options);
      }
export function useGetMyEnvironmentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyEnvironmentsQuery, GetMyEnvironmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyEnvironmentsQuery, GetMyEnvironmentsQueryVariables>(GetMyEnvironmentsDocument, options);
        }
export function useGetMyEnvironmentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyEnvironmentsQuery, GetMyEnvironmentsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyEnvironmentsQuery, GetMyEnvironmentsQueryVariables>(GetMyEnvironmentsDocument, options);
        }
export type GetMyEnvironmentsQueryHookResult = ReturnType<typeof useGetMyEnvironmentsQuery>;
export type GetMyEnvironmentsLazyQueryHookResult = ReturnType<typeof useGetMyEnvironmentsLazyQuery>;
export type GetMyEnvironmentsSuspenseQueryHookResult = ReturnType<typeof useGetMyEnvironmentsSuspenseQuery>;
export type GetMyEnvironmentsQueryResult = Apollo.QueryResult<GetMyEnvironmentsQuery, GetMyEnvironmentsQueryVariables>;
export function refetchGetMyEnvironmentsQuery(variables?: GetMyEnvironmentsQueryVariables) {
      return { query: GetMyEnvironmentsDocument, variables: variables }
    }
export const CreateEnvironmentDocument = gql`
    mutation CreateEnvironment($input: CreateEnvironmentDto!) {
  createEnvironment(input: $input) {
    id
    name
    isIndoor
    width
    height
    depth
    createdAt
  }
}
    `;
export type CreateEnvironmentMutationFn = Apollo.MutationFunction<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>;

/**
 * __useCreateEnvironmentMutation__
 *
 * To run a mutation, you first call `useCreateEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnvironmentMutation, { data, loading, error }] = useCreateEnvironmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEnvironmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>(CreateEnvironmentDocument, options);
      }
export type CreateEnvironmentMutationHookResult = ReturnType<typeof useCreateEnvironmentMutation>;
export type CreateEnvironmentMutationResult = Apollo.MutationResult<CreateEnvironmentMutation>;
export type CreateEnvironmentMutationOptions = Apollo.BaseMutationOptions<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>;
export const DeleteEnvironmentDocument = gql`
    mutation DeleteEnvironment($id: ID!) {
  deleteEnvironment(id: $id) {
    id
    name
  }
}
    `;
export type DeleteEnvironmentMutationFn = Apollo.MutationFunction<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>;

/**
 * __useDeleteEnvironmentMutation__
 *
 * To run a mutation, you first call `useDeleteEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEnvironmentMutation, { data, loading, error }] = useDeleteEnvironmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEnvironmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>(DeleteEnvironmentDocument, options);
      }
export type DeleteEnvironmentMutationHookResult = ReturnType<typeof useDeleteEnvironmentMutation>;
export type DeleteEnvironmentMutationResult = Apollo.MutationResult<DeleteEnvironmentMutation>;
export type DeleteEnvironmentMutationOptions = Apollo.BaseMutationOptions<DeleteEnvironmentMutation, DeleteEnvironmentMutationVariables>;
export const GetLightsByEnvironmentDocument = gql`
    query GetLightsByEnvironment($environmentId: ID!) {
  getLightsByEnvironment(environmentId: $environmentId) {
    id
    type
    watts
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetLightsByEnvironmentQuery__
 *
 * To run a query within a React component, call `useGetLightsByEnvironmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLightsByEnvironmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLightsByEnvironmentQuery({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useGetLightsByEnvironmentQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLightsByEnvironmentQuery, GetLightsByEnvironmentQueryVariables> & ({ variables: GetLightsByEnvironmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLightsByEnvironmentQuery, GetLightsByEnvironmentQueryVariables>(GetLightsByEnvironmentDocument, options);
      }
export function useGetLightsByEnvironmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLightsByEnvironmentQuery, GetLightsByEnvironmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLightsByEnvironmentQuery, GetLightsByEnvironmentQueryVariables>(GetLightsByEnvironmentDocument, options);
        }
export function useGetLightsByEnvironmentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetLightsByEnvironmentQuery, GetLightsByEnvironmentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLightsByEnvironmentQuery, GetLightsByEnvironmentQueryVariables>(GetLightsByEnvironmentDocument, options);
        }
export type GetLightsByEnvironmentQueryHookResult = ReturnType<typeof useGetLightsByEnvironmentQuery>;
export type GetLightsByEnvironmentLazyQueryHookResult = ReturnType<typeof useGetLightsByEnvironmentLazyQuery>;
export type GetLightsByEnvironmentSuspenseQueryHookResult = ReturnType<typeof useGetLightsByEnvironmentSuspenseQuery>;
export type GetLightsByEnvironmentQueryResult = Apollo.QueryResult<GetLightsByEnvironmentQuery, GetLightsByEnvironmentQueryVariables>;
export function refetchGetLightsByEnvironmentQuery(variables: GetLightsByEnvironmentQueryVariables) {
      return { query: GetLightsByEnvironmentDocument, variables: variables }
    }
export const CreateLightDocument = gql`
    mutation CreateLight($environmentId: ID!, $input: CreateLightDto!) {
  createLight(environmentId: $environmentId, input: $input) {
    id
    type
    watts
    createdAt
  }
}
    `;
export type CreateLightMutationFn = Apollo.MutationFunction<CreateLightMutation, CreateLightMutationVariables>;

/**
 * __useCreateLightMutation__
 *
 * To run a mutation, you first call `useCreateLightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLightMutation, { data, loading, error }] = useCreateLightMutation({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLightMutation, CreateLightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateLightMutation, CreateLightMutationVariables>(CreateLightDocument, options);
      }
export type CreateLightMutationHookResult = ReturnType<typeof useCreateLightMutation>;
export type CreateLightMutationResult = Apollo.MutationResult<CreateLightMutation>;
export type CreateLightMutationOptions = Apollo.BaseMutationOptions<CreateLightMutation, CreateLightMutationVariables>;
export const UpdateLightDocument = gql`
    mutation UpdateLight($lightId: ID!, $environmentId: ID!, $input: UpdateLightDto!) {
  updateLight(lightId: $lightId, environmentId: $environmentId, input: $input) {
    id
    type
    watts
    updatedAt
  }
}
    `;
export type UpdateLightMutationFn = Apollo.MutationFunction<UpdateLightMutation, UpdateLightMutationVariables>;

/**
 * __useUpdateLightMutation__
 *
 * To run a mutation, you first call `useUpdateLightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLightMutation, { data, loading, error }] = useUpdateLightMutation({
 *   variables: {
 *      lightId: // value for 'lightId'
 *      environmentId: // value for 'environmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLightMutation, UpdateLightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateLightMutation, UpdateLightMutationVariables>(UpdateLightDocument, options);
      }
export type UpdateLightMutationHookResult = ReturnType<typeof useUpdateLightMutation>;
export type UpdateLightMutationResult = Apollo.MutationResult<UpdateLightMutation>;
export type UpdateLightMutationOptions = Apollo.BaseMutationOptions<UpdateLightMutation, UpdateLightMutationVariables>;
export const DeleteLightDocument = gql`
    mutation DeleteLight($lightId: ID!, $environmentId: ID!) {
  deleteLight(lightId: $lightId, environmentId: $environmentId) {
    id
    type
  }
}
    `;
export type DeleteLightMutationFn = Apollo.MutationFunction<DeleteLightMutation, DeleteLightMutationVariables>;

/**
 * __useDeleteLightMutation__
 *
 * To run a mutation, you first call `useDeleteLightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLightMutation, { data, loading, error }] = useDeleteLightMutation({
 *   variables: {
 *      lightId: // value for 'lightId'
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useDeleteLightMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteLightMutation, DeleteLightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteLightMutation, DeleteLightMutationVariables>(DeleteLightDocument, options);
      }
export type DeleteLightMutationHookResult = ReturnType<typeof useDeleteLightMutation>;
export type DeleteLightMutationResult = Apollo.MutationResult<DeleteLightMutation>;
export type DeleteLightMutationOptions = Apollo.BaseMutationOptions<DeleteLightMutation, DeleteLightMutationVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    id
    email
    firstName
    lastName
    role
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export function refetchGetMeQuery(variables?: GetMeQueryVariables) {
      return { query: GetMeDocument, variables: variables }
    }
export const UpdatePlantStageDocument = gql`
    mutation UpdatePlantStage($plantId: ID!, $environmentId: ID!, $input: UpdatePlantStageDto!) {
  updatePlantStage(
    plantId: $plantId
    environmentId: $environmentId
    input: $input
  ) {
    id
    code
    currentStage
  }
}
    `;
export type UpdatePlantStageMutationFn = Apollo.MutationFunction<UpdatePlantStageMutation, UpdatePlantStageMutationVariables>;

/**
 * __useUpdatePlantStageMutation__
 *
 * To run a mutation, you first call `useUpdatePlantStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlantStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlantStageMutation, { data, loading, error }] = useUpdatePlantStageMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlantStageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePlantStageMutation, UpdatePlantStageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePlantStageMutation, UpdatePlantStageMutationVariables>(UpdatePlantStageDocument, options);
      }
export type UpdatePlantStageMutationHookResult = ReturnType<typeof useUpdatePlantStageMutation>;
export type UpdatePlantStageMutationResult = Apollo.MutationResult<UpdatePlantStageMutation>;
export type UpdatePlantStageMutationOptions = Apollo.BaseMutationOptions<UpdatePlantStageMutation, UpdatePlantStageMutationVariables>;
export const UpdatePlantHistoryDocument = gql`
    mutation UpdatePlantHistory($historyId: ID!, $plantId: ID!, $environmentId: ID!, $input: UpdatePlantHistoryDto!) {
  updatePlantHistory(
    historyId: $historyId
    plantId: $plantId
    environmentId: $environmentId
    input: $input
  ) {
    id
    stage
    notes
    createdAt
  }
}
    `;
export type UpdatePlantHistoryMutationFn = Apollo.MutationFunction<UpdatePlantHistoryMutation, UpdatePlantHistoryMutationVariables>;

/**
 * __useUpdatePlantHistoryMutation__
 *
 * To run a mutation, you first call `useUpdatePlantHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlantHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlantHistoryMutation, { data, loading, error }] = useUpdatePlantHistoryMutation({
 *   variables: {
 *      historyId: // value for 'historyId'
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlantHistoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePlantHistoryMutation, UpdatePlantHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePlantHistoryMutation, UpdatePlantHistoryMutationVariables>(UpdatePlantHistoryDocument, options);
      }
export type UpdatePlantHistoryMutationHookResult = ReturnType<typeof useUpdatePlantHistoryMutation>;
export type UpdatePlantHistoryMutationResult = Apollo.MutationResult<UpdatePlantHistoryMutation>;
export type UpdatePlantHistoryMutationOptions = Apollo.BaseMutationOptions<UpdatePlantHistoryMutation, UpdatePlantHistoryMutationVariables>;
export const DeletePlantHistoryDocument = gql`
    mutation DeletePlantHistory($historyId: ID!, $plantId: ID!, $environmentId: ID!) {
  deletePlantHistory(
    historyId: $historyId
    plantId: $plantId
    environmentId: $environmentId
  )
}
    `;
export type DeletePlantHistoryMutationFn = Apollo.MutationFunction<DeletePlantHistoryMutation, DeletePlantHistoryMutationVariables>;

/**
 * __useDeletePlantHistoryMutation__
 *
 * To run a mutation, you first call `useDeletePlantHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlantHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlantHistoryMutation, { data, loading, error }] = useDeletePlantHistoryMutation({
 *   variables: {
 *      historyId: // value for 'historyId'
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useDeletePlantHistoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePlantHistoryMutation, DeletePlantHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePlantHistoryMutation, DeletePlantHistoryMutationVariables>(DeletePlantHistoryDocument, options);
      }
export type DeletePlantHistoryMutationHookResult = ReturnType<typeof useDeletePlantHistoryMutation>;
export type DeletePlantHistoryMutationResult = Apollo.MutationResult<DeletePlantHistoryMutation>;
export type DeletePlantHistoryMutationOptions = Apollo.BaseMutationOptions<DeletePlantHistoryMutation, DeletePlantHistoryMutationVariables>;
export const GetPlantsByEnvironmentDocument = gql`
    query GetPlantsByEnvironment($environmentId: ID!) {
  getPlantsByEnvironment(environmentId: $environmentId) {
    id
    code
    description
    geneticsId
    environmentId
    createdAt
    updatedAt
    genetics {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useGetPlantsByEnvironmentQuery__
 *
 * To run a query within a React component, call `useGetPlantsByEnvironmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlantsByEnvironmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlantsByEnvironmentQuery({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useGetPlantsByEnvironmentQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPlantsByEnvironmentQuery, GetPlantsByEnvironmentQueryVariables> & ({ variables: GetPlantsByEnvironmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPlantsByEnvironmentQuery, GetPlantsByEnvironmentQueryVariables>(GetPlantsByEnvironmentDocument, options);
      }
export function useGetPlantsByEnvironmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlantsByEnvironmentQuery, GetPlantsByEnvironmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPlantsByEnvironmentQuery, GetPlantsByEnvironmentQueryVariables>(GetPlantsByEnvironmentDocument, options);
        }
export function useGetPlantsByEnvironmentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPlantsByEnvironmentQuery, GetPlantsByEnvironmentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPlantsByEnvironmentQuery, GetPlantsByEnvironmentQueryVariables>(GetPlantsByEnvironmentDocument, options);
        }
export type GetPlantsByEnvironmentQueryHookResult = ReturnType<typeof useGetPlantsByEnvironmentQuery>;
export type GetPlantsByEnvironmentLazyQueryHookResult = ReturnType<typeof useGetPlantsByEnvironmentLazyQuery>;
export type GetPlantsByEnvironmentSuspenseQueryHookResult = ReturnType<typeof useGetPlantsByEnvironmentSuspenseQuery>;
export type GetPlantsByEnvironmentQueryResult = Apollo.QueryResult<GetPlantsByEnvironmentQuery, GetPlantsByEnvironmentQueryVariables>;
export function refetchGetPlantsByEnvironmentQuery(variables: GetPlantsByEnvironmentQueryVariables) {
      return { query: GetPlantsByEnvironmentDocument, variables: variables }
    }
export const GetPlantByIdDocument = gql`
    query GetPlantById($plantId: ID!, $environmentId: ID!) {
  getPlantById(plantId: $plantId, environmentId: $environmentId) {
    id
    code
    description
    geneticsId
    environmentId
    createdAt
    updatedAt
    genetics {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useGetPlantByIdQuery__
 *
 * To run a query within a React component, call `useGetPlantByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlantByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlantByIdQuery({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useGetPlantByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPlantByIdQuery, GetPlantByIdQueryVariables> & ({ variables: GetPlantByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPlantByIdQuery, GetPlantByIdQueryVariables>(GetPlantByIdDocument, options);
      }
export function useGetPlantByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlantByIdQuery, GetPlantByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPlantByIdQuery, GetPlantByIdQueryVariables>(GetPlantByIdDocument, options);
        }
export function useGetPlantByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPlantByIdQuery, GetPlantByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPlantByIdQuery, GetPlantByIdQueryVariables>(GetPlantByIdDocument, options);
        }
export type GetPlantByIdQueryHookResult = ReturnType<typeof useGetPlantByIdQuery>;
export type GetPlantByIdLazyQueryHookResult = ReturnType<typeof useGetPlantByIdLazyQuery>;
export type GetPlantByIdSuspenseQueryHookResult = ReturnType<typeof useGetPlantByIdSuspenseQuery>;
export type GetPlantByIdQueryResult = Apollo.QueryResult<GetPlantByIdQuery, GetPlantByIdQueryVariables>;
export function refetchGetPlantByIdQuery(variables: GetPlantByIdQueryVariables) {
      return { query: GetPlantByIdDocument, variables: variables }
    }
export const CreatePlantDocument = gql`
    mutation CreatePlant($environmentId: ID!, $input: CreatePlantDto!) {
  createPlant(environmentId: $environmentId, input: $input) {
    id
    code
    description
    geneticsId
    environmentId
    createdAt
    genetics {
      id
      name
      description
    }
  }
}
    `;
export type CreatePlantMutationFn = Apollo.MutationFunction<CreatePlantMutation, CreatePlantMutationVariables>;

/**
 * __useCreatePlantMutation__
 *
 * To run a mutation, you first call `useCreatePlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlantMutation, { data, loading, error }] = useCreatePlantMutation({
 *   variables: {
 *      environmentId: // value for 'environmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlantMutation, CreatePlantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePlantMutation, CreatePlantMutationVariables>(CreatePlantDocument, options);
      }
export type CreatePlantMutationHookResult = ReturnType<typeof useCreatePlantMutation>;
export type CreatePlantMutationResult = Apollo.MutationResult<CreatePlantMutation>;
export type CreatePlantMutationOptions = Apollo.BaseMutationOptions<CreatePlantMutation, CreatePlantMutationVariables>;
export const UpdatePlantDocument = gql`
    mutation UpdatePlant($plantId: ID!, $environmentId: ID!, $input: UpdatePlantDto!) {
  updatePlant(plantId: $plantId, environmentId: $environmentId, input: $input) {
    id
    code
    description
    geneticsId
    environmentId
    updatedAt
    genetics {
      id
      name
      description
    }
  }
}
    `;
export type UpdatePlantMutationFn = Apollo.MutationFunction<UpdatePlantMutation, UpdatePlantMutationVariables>;

/**
 * __useUpdatePlantMutation__
 *
 * To run a mutation, you first call `useUpdatePlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlantMutation, { data, loading, error }] = useUpdatePlantMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePlantMutation, UpdatePlantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePlantMutation, UpdatePlantMutationVariables>(UpdatePlantDocument, options);
      }
export type UpdatePlantMutationHookResult = ReturnType<typeof useUpdatePlantMutation>;
export type UpdatePlantMutationResult = Apollo.MutationResult<UpdatePlantMutation>;
export type UpdatePlantMutationOptions = Apollo.BaseMutationOptions<UpdatePlantMutation, UpdatePlantMutationVariables>;
export const DeletePlantDocument = gql`
    mutation DeletePlant($plantId: ID!, $environmentId: ID!) {
  deletePlant(plantId: $plantId, environmentId: $environmentId) {
    id
  }
}
    `;
export type DeletePlantMutationFn = Apollo.MutationFunction<DeletePlantMutation, DeletePlantMutationVariables>;

/**
 * __useDeletePlantMutation__
 *
 * To run a mutation, you first call `useDeletePlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlantMutation, { data, loading, error }] = useDeletePlantMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useDeletePlantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePlantMutation, DeletePlantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePlantMutation, DeletePlantMutationVariables>(DeletePlantDocument, options);
      }
export type DeletePlantMutationHookResult = ReturnType<typeof useDeletePlantMutation>;
export type DeletePlantMutationResult = Apollo.MutationResult<DeletePlantMutation>;
export type DeletePlantMutationOptions = Apollo.BaseMutationOptions<DeletePlantMutation, DeletePlantMutationVariables>;
export const GetAllGeneticsDocument = gql`
    query GetAllGenetics {
  getAllGenetics {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetAllGeneticsQuery__
 *
 * To run a query within a React component, call `useGetAllGeneticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGeneticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGeneticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllGeneticsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllGeneticsQuery, GetAllGeneticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllGeneticsQuery, GetAllGeneticsQueryVariables>(GetAllGeneticsDocument, options);
      }
export function useGetAllGeneticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllGeneticsQuery, GetAllGeneticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllGeneticsQuery, GetAllGeneticsQueryVariables>(GetAllGeneticsDocument, options);
        }
export function useGetAllGeneticsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllGeneticsQuery, GetAllGeneticsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllGeneticsQuery, GetAllGeneticsQueryVariables>(GetAllGeneticsDocument, options);
        }
export type GetAllGeneticsQueryHookResult = ReturnType<typeof useGetAllGeneticsQuery>;
export type GetAllGeneticsLazyQueryHookResult = ReturnType<typeof useGetAllGeneticsLazyQuery>;
export type GetAllGeneticsSuspenseQueryHookResult = ReturnType<typeof useGetAllGeneticsSuspenseQuery>;
export type GetAllGeneticsQueryResult = Apollo.QueryResult<GetAllGeneticsQuery, GetAllGeneticsQueryVariables>;
export function refetchGetAllGeneticsQuery(variables?: GetAllGeneticsQueryVariables) {
      return { query: GetAllGeneticsDocument, variables: variables }
    }
export const CreateGeneticsDocument = gql`
    mutation CreateGenetics($input: CreateGeneticsDto!) {
  createGenetics(input: $input) {
    id
    name
    description
    createdAt
  }
}
    `;
export type CreateGeneticsMutationFn = Apollo.MutationFunction<CreateGeneticsMutation, CreateGeneticsMutationVariables>;

/**
 * __useCreateGeneticsMutation__
 *
 * To run a mutation, you first call `useCreateGeneticsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGeneticsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGeneticsMutation, { data, loading, error }] = useCreateGeneticsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGeneticsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGeneticsMutation, CreateGeneticsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateGeneticsMutation, CreateGeneticsMutationVariables>(CreateGeneticsDocument, options);
      }
export type CreateGeneticsMutationHookResult = ReturnType<typeof useCreateGeneticsMutation>;
export type CreateGeneticsMutationResult = Apollo.MutationResult<CreateGeneticsMutation>;
export type CreateGeneticsMutationOptions = Apollo.BaseMutationOptions<CreateGeneticsMutation, CreateGeneticsMutationVariables>;
export const GetPlantHistoryDocument = gql`
    query GetPlantHistory($plantId: ID!, $environmentId: ID!) {
  getPlantHistory(plantId: $plantId, environmentId: $environmentId) {
    id
    plantId
    stage
    notes
    createdAt
  }
}
    `;

/**
 * __useGetPlantHistoryQuery__
 *
 * To run a query within a React component, call `useGetPlantHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlantHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlantHistoryQuery({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *   },
 * });
 */
export function useGetPlantHistoryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPlantHistoryQuery, GetPlantHistoryQueryVariables> & ({ variables: GetPlantHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPlantHistoryQuery, GetPlantHistoryQueryVariables>(GetPlantHistoryDocument, options);
      }
export function useGetPlantHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlantHistoryQuery, GetPlantHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPlantHistoryQuery, GetPlantHistoryQueryVariables>(GetPlantHistoryDocument, options);
        }
export function useGetPlantHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPlantHistoryQuery, GetPlantHistoryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPlantHistoryQuery, GetPlantHistoryQueryVariables>(GetPlantHistoryDocument, options);
        }
export type GetPlantHistoryQueryHookResult = ReturnType<typeof useGetPlantHistoryQuery>;
export type GetPlantHistoryLazyQueryHookResult = ReturnType<typeof useGetPlantHistoryLazyQuery>;
export type GetPlantHistorySuspenseQueryHookResult = ReturnType<typeof useGetPlantHistorySuspenseQuery>;
export type GetPlantHistoryQueryResult = Apollo.QueryResult<GetPlantHistoryQuery, GetPlantHistoryQueryVariables>;
export function refetchGetPlantHistoryQuery(variables: GetPlantHistoryQueryVariables) {
      return { query: GetPlantHistoryDocument, variables: variables }
    }
export const CreatePlantHistoryDocument = gql`
    mutation CreatePlantHistory($plantId: ID!, $environmentId: ID!, $input: CreatePlantHistoryDto!) {
  createPlantHistory(
    plantId: $plantId
    environmentId: $environmentId
    input: $input
  ) {
    id
    plantId
    stage
    notes
    createdAt
  }
}
    `;
export type CreatePlantHistoryMutationFn = Apollo.MutationFunction<CreatePlantHistoryMutation, CreatePlantHistoryMutationVariables>;

/**
 * __useCreatePlantHistoryMutation__
 *
 * To run a mutation, you first call `useCreatePlantHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlantHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlantHistoryMutation, { data, loading, error }] = useCreatePlantHistoryMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      environmentId: // value for 'environmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlantHistoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlantHistoryMutation, CreatePlantHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePlantHistoryMutation, CreatePlantHistoryMutationVariables>(CreatePlantHistoryDocument, options);
      }
export type CreatePlantHistoryMutationHookResult = ReturnType<typeof useCreatePlantHistoryMutation>;
export type CreatePlantHistoryMutationResult = Apollo.MutationResult<CreatePlantHistoryMutation>;
export type CreatePlantHistoryMutationOptions = Apollo.BaseMutationOptions<CreatePlantHistoryMutation, CreatePlantHistoryMutationVariables>;