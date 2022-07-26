import { ObjectType } from '@nestjs/graphql';
import { GraphQLPaginatedResponse } from '@solness/core';
import { User } from '@solness/user';

@ObjectType()
export class PaginatedUserResponse extends GraphQLPaginatedResponse(User) {}
