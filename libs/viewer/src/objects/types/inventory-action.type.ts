import { ObjectType } from '@nestjs/graphql';
import { BaseAction } from './base-action.type';

@ObjectType({ implements: () => [BaseAction] })
export class InventoryAction extends BaseAction {}
