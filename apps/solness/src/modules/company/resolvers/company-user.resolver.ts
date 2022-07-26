import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Access, CurrentUser } from '@solness/auth/decorators';
import { GraphQlAccessGuard, GraphQlAuthGuard } from '@solness/auth/guards';
import { Page } from '@solness/auth/objects';
import { CompanyUser } from '@solness/company';
import { InviteUserInput } from '@solness/company/objects';
import { CompanyUserService } from '@solness/company/services';
import { composeResult, SimpleResponse, UserContext } from '@solness/core';
import { User } from '@solness/user';

@UseGuards(GraphQlAuthGuard, GraphQlAccessGuard)
@Resolver(() => CompanyUser)
export class CompanyUserResolver {
  constructor(private readonly service: CompanyUserService) {}

  @Access({ page: Page.Company, action: 'view' })
  @Query(() => CompanyUser, { name: 'companyUser', nullable: true })
  public async get(
    @Args('id') id: number,
    @CurrentUser() user: UserContext,
  ): Promise<CompanyUser> {
    const model = await this.service.get(id, user);

    if (!model) {
      throw new NotFoundException('User not found.');
    }

    return model;
  }

  @Access({ page: Page.Company, action: 'inviteUser' })
  @Mutation(() => SimpleResponse, { name: 'inviteUser' })
  public async inviteUser(
    @Args({ name: 'model', type: () => InviteUserInput })
    model: InviteUserInput,
    @CurrentUser() user: UserContext,
  ): Promise<SimpleResponse> {
    if (!user.data.companyId) {
      throw new BadRequestException('Company ID is missing.');
    }

    const result = await this.service.inviteUser(model, user);

    if (result) {
      return composeResult();
    }

    return composeResult({ success: false });
  }

  @Access({ page: Page.Company, action: 'excludeUser' })
  @Mutation(() => SimpleResponse, { name: 'excludeUser' })
  public async excludeUser(
    @Args('userId') userId: number,
    @CurrentUser() user: UserContext,
  ): Promise<SimpleResponse> {
    if (!user.data.companyId) {
      throw new BadRequestException('Company ID is missing.');
    }

    await this.service.excludeUser(userId, user);

    return composeResult();
  }

  @Access({ page: Page.Company, action: 'view' })
  @ResolveField(() => User)
  public async user(
    @Parent() companyUser: CompanyUser,
    @Context() { loaders }: any,
  ) {
    const result = await loaders.usersLoader.load(companyUser.userId);

    return result;
  }
}
