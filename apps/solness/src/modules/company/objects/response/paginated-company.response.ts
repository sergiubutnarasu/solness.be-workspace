import { ObjectType } from '@nestjs/graphql';
import { Company } from '@solness/company';
import { GraphQLPaginatedResponse } from '@solness/core';

@ObjectType()
export class PaginatedCompanyResponse extends GraphQLPaginatedResponse(
  Company,
) {}
