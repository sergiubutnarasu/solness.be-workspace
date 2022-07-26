import { CompanyRole } from '@solness/core';
import { InventoryActionType } from '../objects';

export const InventoryActionsMapping: Record<
  InventoryActionType,
  CompanyRole[]
> = {
  view: [CompanyRole.Owner],
  create: [CompanyRole.Owner],
  update: [CompanyRole.Owner],
  delete: [CompanyRole.Owner],
};
