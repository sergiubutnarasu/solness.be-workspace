import { Module } from '@nestjs/common';
import { CompanyModule } from '@solness/company';
import { UserModule } from '@solness/user';
import { CompanyResolver, CompanyUserResolver } from './resolvers';

@Module({
  imports: [CompanyModule, UserModule],
  providers: [CompanyUserResolver, CompanyResolver],
})
export class CompanyAppModule {}
