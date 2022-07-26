import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { DB_CONFIG } from './configs/db.config';

export const AppDataSource = new DataSource(DB_CONFIG);
