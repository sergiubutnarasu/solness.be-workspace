import { Module } from '@nestjs/common';
import { PermissionService } from './services';

@Module({ providers: [PermissionService], exports: [PermissionService] })
export class ViewerModule {}
