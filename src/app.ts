import express, { json, urlencoded } from 'express'
import { NODE_ENV, PORT } from '#config/env'
import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { logger } from '#utils/logger'
import helmet from 'helmet'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(helmet())

/**
 * Health check endpoint.
 * This will return the health status of the API.
 * @example
 * GET /health
 */
app.get('/health', (_, res) => {
  res.send({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
})

if (
  basename(fileURLToPath(import.meta.url)) === basename(process.argv[1]) &&
  NODE_ENV !== 'test'
) {
  app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`))
}
