import { CompanyRole } from '@solness/core';
import { UserActionType } from '../objects';

export const UserActionsMapping: Record<UserActionType, CompanyRole[]> = {
  view: [CompanyRole.Owner, CompanyRole.User],
  create: [],
  update: [],
  delete: [],
};
