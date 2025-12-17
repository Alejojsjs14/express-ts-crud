import type { RequestHandler } from "express";
import httpStatus from "http-status";

const DEFAULT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const DEFAULT_HEADERS = [
  "Content-Type",
  "Authorization",
  "Origin",
  "X-Requested-With",
  "Accept",
] as const;

/**
 * Convierte todos los valores del arreglo a mayúsculas y los une con comas.
 * @param values - Arreglo de valores que se deben convertir a mayúsculas.
 * @returns Cadena resultante con los valores en mayúscula separados por comas.
 * @example
 * parseHeader(['get', 'post']); // 'GET, POST'
 * @example
 * parseHeader(['Content-Type', 'Authorization']); // 'Content-Type, Authorization'
 */
const parseHeader = (values: string[]) => values.join(", ");

type Method = (typeof DEFAULT_METHODS)[number][];
type Headers = (typeof DEFAULT_HEADERS)[number][];
type Options = {
  origin?: string;
  methods?: Method;
  headers?: Headers;
};

/**
 * Middleware CORS para Express.
 *
 * Configura los encabezados necesarios para permitir solicitudes
 * desde otros orígenes (Cross-Origin Resource Sharing).
 * Soporta entornos de prueba (NODE_ENV='test') y solicitudes OPTIONS.
 * @param options Opciones de configuración.
 * @param options.origin Origen o lista de orígenes permitidos.
 * @param options.methods Métodos HTTP permitidos.
 * @param options.headers Encabezados permitidos.
 * @returns Middleware CORS.
 * @example
 * import express from 'express';
 * import { cors } from './middlewares/cors.js';
 * const app = express();
 * app.use(cors({ origin: 'https://miapp.com' }));
 * app.get('/api', (req, res) => res.json({ ok: true }));
 * // Resultado:
 * // Access-Control-Allow-Origin: https://miapp.com
 * // Access-Control-Allow-Methods: GET, POST, PUT, DELETE
 * // Access-Control-Allow-Headers: Content-Type, Authorization
 * @example
 * // En entorno de prueba (NODE_ENV='test'):
 * // Access-Control-Allow-Origin: *
 */
export const cors = ({
  origin,
  methods = [...DEFAULT_METHODS],
  headers = [...DEFAULT_HEADERS],
}: Partial<Options>): RequestHandler => {
  const { NODE_ENV } = process.env;
  const origins = origin?.split(",")?.map((item) => item.trim()) ?? [];
  return (req, res, next) => {
    if (!origin) return next();

    if (NODE_ENV === "test" || NODE_ENV === "development") {
      res.header("Access-Control-Allow-Origin", "*");
    }

    if (origins.includes(req.headers.origin ?? "")) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
    }

    res.header(
      "Access-Control-Allow-Methods",
      parseHeader(methods.map((value) => value.toUpperCase()))
    );
    res.header("Access-Control-Allow-Headers", parseHeader(headers));
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") return res.sendStatus(httpStatus.NO_CONTENT);
    return next();
  };
};
