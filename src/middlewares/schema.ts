import httpStatus from "http-status";
import { z } from "zod";
import type { Request, RequestHandler } from "express";

type Target = "headers" | "body" | "params" | "query" | "user";
type Mode = "full" | "partial";
type ZodParams = {
  object: Record<string, unknown>;
  schema: z.ZodSchema;
  mode: Mode;
};

/**
 * @param params - El objeto de parámetros.
 * @param params.object - El objeto a validar.
 * @param params.schema - El esquema zod contra el que validar.
 * @param params.mode - El tipo de validación a realizar ('full' o 'partial').
 * @returns - Una lista de mensajes de error si la validación falla, de lo contrario el objeto validado.
 */
const parseSchema = ({ object, schema, mode }: ZodParams) => {
  const parsed =
    mode === "partial" && schema instanceof z.ZodObject
      ? schema.partial().safeParse(object)
      : schema.safeParse(object);

  return parsed.success
    ? parsed.data
    : parsed.error.issues.map(
        (issue) => `${issue.path.join(".")} - ${issue.message}`
      );
};

type SchemaValidator = {
  target: keyof Pick<Request, Target>;
  mode: Mode;
};

/**
 * @param schema - El esquema zod para validar.
 * @param options - Opciones para la validación.
 * @returns - La función middleware.
 */
export const validate =
  (
    schema: z.ZodSchema,
    { target = "body", mode = "full" }: Partial<SchemaValidator> = {}
  ): RequestHandler =>
  (req, res, next) => {
    const result = parseSchema({ object: req[target], schema, mode });

    if (Array.isArray(result) && result.length > 0)
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        code: httpStatus.BAD_REQUEST,
        details: result,
      });

    if (target === "query") {
      Object.defineProperty(req, "query", {
        get: () => result,
        enumerable: true,
        configurable: true,
      });
    } else {
      req[target] = result;
    }

    return next();
  };
