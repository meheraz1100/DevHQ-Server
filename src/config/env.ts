import dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  NODE_ENV: getEnv('NODE_ENV'),
  PORT: Number(getEnv('PORT')),

  CLIENT_URL: getEnv('CLIENT_URL'),

  DATABASE_URL: getEnv('DATABASE_URL'),

  JWT_ACCESS_SECRET: getEnv('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),

  ACCESS_TOKEN_EXPIRES_IN: getEnv('ACCESS_TOKEN_EXPIRES_IN'),
  REFRESH_TOKEN_EXPIRES_IN: getEnv('REFRESH_TOKEN_EXPIRES_IN'),
};
