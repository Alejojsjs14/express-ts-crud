import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().positive().min(1024).max(65535).default(3000),
  LIMIT: z.coerce.number().positive().default(30),
  ALLOWED_ORIGINS: z.string()
});

export type Env = z.infer<typeof envSchema>;
