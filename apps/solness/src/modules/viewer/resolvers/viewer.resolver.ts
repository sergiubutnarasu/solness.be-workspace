import { UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@solness/auth/decorators';
import { GraphQlAuthGuard } from '@solness/auth/guards';
import { UserContext } from '@solness/core';
import { Permission, Viewer } from '@solness/viewer/objects';
import { PermissionService } from '@solness/viewer/services';

@UseGuards(GraphQlAuthGuard)
@Resolver(() => Viewer)
export class ViewerResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => Viewer)
  public viewer() {
    return {};
  }

  @ResolveField('permissions', () => Permission)
  public companyAction(@CurrentUser() user: UserContext): Permission {
    return this.permissionService.compute(user);
  }
}
