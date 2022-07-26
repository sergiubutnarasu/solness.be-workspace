import { SetMetadata } from '@nestjs/common';
import { Role } from '@solness/core';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
