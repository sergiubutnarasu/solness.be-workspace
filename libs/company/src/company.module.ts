import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '@solness/custom-repository';
import { UserModule } from '@solness/user';
import { CompanyRepository, CompanyUserRepository } from './repositories';
import { CompanyService, CompanyUserService } from './services';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      CompanyRepository,
      CompanyUserRepository,
    ]),
    UserModule,
  ],
  providers: [CompanyService, CompanyUserService],
  exports: [CompanyService, CompanyUserService],
})
export class CompanyModule {}
