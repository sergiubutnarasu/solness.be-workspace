import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '@solness/custom-repository';
import { EmailModule } from '@solness/email';
import { UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [
    EmailModule,
    CustomRepositoryModule.forCustomRepository([UserRepository]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
