import { config } from 'dotenv';
import { Env } from '@constants';

config({ path: `.env.${process.env.NODE_ENV || Env.Development}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
