import { Module } from '@nestjs/common';
import { UserModule } from '@solness/user';
import { DataLoaderService, UsersLoader } from './services';

@Module({
  imports: [UserModule],
  providers: [DataLoaderService, UsersLoader],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
