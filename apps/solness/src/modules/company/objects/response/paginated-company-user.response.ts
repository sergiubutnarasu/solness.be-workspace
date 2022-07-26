import { ObjectType } from '@nestjs/graphql';
import { CompanyUser } from '@solness/company';
import { GraphQLPaginatedResponse } from '@solness/core';

@ObjectType()
export class PaginatedCompanyUserResponse extends GraphQLPaginatedResponse(
  CompanyUser,
) {}
