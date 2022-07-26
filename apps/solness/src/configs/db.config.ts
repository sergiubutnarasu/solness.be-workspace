import {
  AppConfigKey,
  AppHelper,
  CommonSubscriber,
  Environment,
} from '@solness/core';
import { DataSourceOptions } from 'typeorm';

export const DB_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: AppHelper.getConfig(AppConfigKey.DatabaseHost),
  database: AppHelper.getConfig(AppConfigKey.DatabaseName),
  username: AppHelper.getConfig(AppConfigKey.DatabaseUser),
  password: AppHelper.getConfig(AppConfigKey.DatabasePassword),
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/**/*.migration{.ts,.js}'],
  subscribers: [CommonSubscriber],
  logging: AppHelper.checkEnvironment(Environment.Development),
};
