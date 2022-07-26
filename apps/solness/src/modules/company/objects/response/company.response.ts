import { ObjectType } from '@nestjs/graphql';
import { Company } from '@solness/company';
import { GraphQLGenericResponse } from '@solness/core';

@ObjectType()
export class CompanyResponse extends GraphQLGenericResponse(Company) {}
