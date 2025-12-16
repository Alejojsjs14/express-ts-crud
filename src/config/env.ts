import { envSchema } from '#schemas/env'
import { treeifyError } from 'zod'

const parsed = envSchema.safeParse(process.env)

if (!parsed?.success) {
    console.error(treeifyError(parsed.error)?.properties)
    throw new Error('Invalid environment variables')
}

export const {
    NODE_ENV,
    PORT,
    LIMIT
} = parsed.data
