import { Module } from '@nestjs/common';
import { UserModule } from '@solness/user';
import { UserResolver } from './resolvers';

@Module({
  imports: [UserModule],
  providers: [UserResolver],
})
export class UserAppModule {}
