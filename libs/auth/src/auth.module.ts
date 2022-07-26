import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppHelper } from '@solness/core';
import { CustomRepositoryModule } from '@solness/custom-repository';
import { EmailModule } from '@solness/email';
import { UserModule } from '@solness/user';
import { AuthKeys } from './objects';
import { AuthRepository } from './repositories';
import { AuthService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({
      secret: AppHelper.getConfig(AuthKeys.AuthSecret),
      signOptions: { expiresIn: '10m' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CustomRepositoryModule.forCustomRepository([AuthRepository]),
    UserModule,
    EmailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
