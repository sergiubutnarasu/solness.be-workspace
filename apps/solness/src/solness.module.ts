import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigKey, AppHelper, Environment } from '@solness/core';
import { DataLoaderModule, DataLoaderService } from '@solness/data-loader';
import { DB_CONFIG } from './configs/db.config';
import { AuthAppModule } from './modules/auth';
import { CashRegisterAppModule } from './modules/cash-register';
import { CompanyAppModule } from './modules/company';
import { UserAppModule } from './modules/user';
import { ViewerAppModule } from './modules/viewer';
import { SolnessController } from './solness.controller';
import { SolnessResolver } from './solness.resolver';
import { SolnessService } from './solness.service';

const libsModules = [
  AuthAppModule,
  CashRegisterAppModule,
  CompanyAppModule,
  UserAppModule,
  ViewerAppModule,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      inject: [DataLoaderService],
      useFactory: (dataLoaderService: DataLoaderService) => {
        return {
          autoSchemaFile: 'schema.gql',
          context: ({ req }) => ({
            req,
            loaders: dataLoaderService.createLoaders(),
          }),
          cors: {
            origin: AppHelper.getConfig(AppConfigKey.DefaultLink),
            credentials: true,
          },
          debug: AppHelper.checkEnvironment(Environment.Development),
          playground: AppHelper.checkEnvironment(Environment.Development)
            ? { settings: { 'request.credentials': 'include' } }
            : false,
        };
      },
    }),
    ...libsModules,
  ],
  controllers: [SolnessController],
  providers: [SolnessService, SolnessResolver],
})
export class SolnessModule {}
