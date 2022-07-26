import { Injectable } from '@nestjs/common';
import {
  checkCompanyPageActions,
  checkDefaultPageActions,
} from '@solness/auth/helpers';
import { Page } from '@solness/auth/objects';
import { UserContext } from '@solness/core';
import { Permission } from '../objects';

@Injectable()
export class PermissionService {
  public compute(user: UserContext): Permission {
    const userActions = checkDefaultPageActions(user, Page.User);
    const companyActions = checkCompanyPageActions(user);
    const cashActions = checkDefaultPageActions(user, Page.Cash);
    const inventoryActions = checkDefaultPageActions(user, Page.Inventory);

    return {
      user: userActions,
      company: companyActions,
      cash: cashActions,
      inventory: inventoryActions,
    };
  }
}
