import { Module } from '@nestjs/common';
import { AuthModule } from '@solness/auth';
import { AuthResolver } from './resolvers';

@Module({
  imports: [AuthModule],
  providers: [AuthResolver],
})
export class AuthAppModule {}
