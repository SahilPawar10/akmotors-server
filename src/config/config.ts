import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import Joi, { ObjectSchema } from "joi";

// Recreate __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use NODE_ENV or fallback to 'development'
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
// Use NODE_ENV or fallback to 'development'

dotenv.config({
  path: path.join(__dirname, `../../${envFile}`),
});

interface EnvVars {
  NODE_ENV: "development" | "production";
  PORT: number;
  MONGODB_URL: string;
  MONGODB_TEST_URL?: string;
  JWT_SECRET: string;
  JWT_ACCESS_EXPIRATION_MINUTES: number;
  JWT_REFRESH_EXPIRATION_DAYS: number;
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: number;
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: number;
  AUTHKEY?: string;
  TEMPLATEKEY?: string;
  SENDOTPURL?: string;
  URL?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USERNAME?: string;
  SMTP_PASSWORD?: string;
  EMAIL_FROM?: string;
}

// ✅ Explicit type annotation fixes ESLint
const envVarsSchema: ObjectSchema<EnvVars> = Joi.object<EnvVars>({
  NODE_ENV: Joi.string().valid("development", "test", "production").required(),
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().required(),
  MONGODB_TEST_URL: Joi.string().optional(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10),
  AUTHKEY: Joi.string().optional(),
  TEMPLATEKEY: Joi.string().optional(),
  SENDOTPURL: Joi.string().optional(),
  URL: Joi.string().optional(),
  SMTP_HOST: Joi.string().optional(),
  SMTP_PORT: Joi.number().optional(),
  SMTP_USERNAME: Joi.string().optional(),
  SMTP_PASSWORD: Joi.string().optional(),
  EMAIL_FROM: Joi.string().optional(),
}).unknown();

// Validate environment variables
const { value: env, error } = envVarsSchema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Explicit type annotation for config
const config: {
  env: EnvVars["NODE_ENV"];
  port: number;
  mongoose: { url: string; options: { useNewUrlParser: boolean; useUnifiedTopology: boolean } };
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
    resetPasswordExpirationMinutes: number;
    verifyEmailExpirationMinutes: number;
  };
  msg91: {
    authkey?: string;
    templatekey?: string;
    sendotpurl?: string;
    url?: string;
  };
  email: {
    smtp: { host?: string; port?: number; auth: { user?: string; pass?: string } };
    from?: string;
  };
} = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongoose: {
    url: env.NODE_ENV === "development" ? env.MONGODB_URL || "" : env.MONGODB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  msg91: {
    authkey: env.AUTHKEY,
    templatekey: env.TEMPLATEKEY,
    sendotpurl: env.SENDOTPURL,
    url: env.URL,
  },
  email: {
    smtp: {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: { user: env.SMTP_USERNAME, pass: env.SMTP_PASSWORD },
    },
    from: env.EMAIL_FROM,
  },
};

export default config;
export type Config = typeof config;
