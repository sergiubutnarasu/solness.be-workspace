import { ObjectType } from '@nestjs/graphql';
import { GraphQLGenericResponse } from '@solness/core';
import { User } from '@solness/user';

@ObjectType()
export class UserResponse extends GraphQLGenericResponse(User) {}
