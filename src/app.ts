import express, { json, urlencoded } from "express";
import { NODE_ENV, PORT } from "#config/env";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { logger } from "#utils/logger";
import helmet from "helmet";
import { errorPath } from "#middlewares/path";
import { cors } from "#middlewares/cors";
import { errorHandler } from "#middlewares/error";
import { router } from "#routes/index.route";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(helmet());
app.use(cors({origin: '*'}))
app.use('/api/v1', router)
app.use(errorHandler)

/**
 * Middleware to log requests that hit the API.
 * This will log the HTTP method and URL of each request.
 */
app.use((req, _res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`)
  next()
})

/**
 * Health check endpoint.
 * This will return the health status of the API.
 * @example
 * GET /health
 */
app.get("/health", (_, res) => {
  res.send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use(errorPath);

if (
  basename(fileURLToPath(import.meta.url)) === basename(process.argv[1]) &&
  NODE_ENV !== "test"
) {
  app.listen(PORT, () => logger.info(`Server is running on port http://localhost:${PORT}`));
}
