import { envSchema } from '#schemas/env'
import { logger } from '#utils/logger'
import { treeifyError } from 'zod'

const parsed = envSchema.safeParse(process.env)

if (!parsed?.success) {
    logger.info(treeifyError(parsed.error)?.properties)
    throw new Error('Invalid environment variables')
}

export const {
    NODE_ENV,
    PORT,
    LIMIT,
    ALLOWED_ORIGINS
} = parsed.data
