import { config, createLogger, format, transports } from "winston";
const { combine, errors, json, prettyPrint, timestamp } = format;

/**
 * Logger global para la aplicación.
 * Utiliza Winston para el registro de logs en formato JSON.
 * Los niveles de log se basan en la configuración predeterminada de npm.
 * - error: 0 (más severo)
 * - warn: 1 (Advertencias)
 * - info: 2 (Información general)
 * - http: 3 (Logs HTTP)
 * - verbose: 4 (Detalles adicionales)
 * - debug: 5 (Depuración)
 * - silly: 6 (menos severo)
 * @example
 * logger.info('Mensaje de información');
 * logger.error('Mensaje de error');
 * logger.debug('Mensaje de depuración');
 * logger.warn('Mensaje de advertencia');
 * logger.http('Mensaje HTTP');
 * logger.verbose('Mensaje detallado');
 * logger.silly('Mensaje menos severo');
 */
export const logger = createLogger({
  levels: config.npm.levels,
  format: combine(json(), timestamp(), prettyPrint(), errors({ stack: true })),
  transports: [new transports.Console()],
});
