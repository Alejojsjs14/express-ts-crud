import { fruits } from "#database/database";
import httpStatus from "http-status";
import type { RequestHandler } from "express";
import { randomUUID } from "node:crypto";

/**
 * Obtiene todos los registros de el JSON
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Funcion para manejor de errores
 * @returns
 */
export const getFruits: RequestHandler = (_req, res, next) => {
  try {
    return res.status(httpStatus.OK).json({
      message: "Fruits retrieved successfully",
      success: true,
      fruits,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Crea un registro en el JSon
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Funcion para manejor de errores
 * @returns
 */
export const createFruits: RequestHandler = (req, res, next) => {
  try {
    const created = {
      id: randomUUID(),
      ...req.body,
    };
    fruits.push(created);
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Fruit created successfully",
      created,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Crea un actualiza un registro por su id
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Funcion para manejor de errores
 * @returns
 */
export const updateFruits: RequestHandler = (req, res, next) => {
  try {
    const { id } = req.params;
    const findFruit = fruits.findIndex((fruit) => fruit.id === Number(id));

    if (findFruit === -1) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Fruit not found",
      });
    }

    fruits[findFruit] = {
      ...fruits[findFruit],
      ...req.body,
    };

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Fruit updated successfully",
      fruit: fruits[findFruit],
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Elimina un registro por su id
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Funcion para manejor de errores
 * @returns
 */
export const deleteFruit: RequestHandler = (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = fruits.filter(fruit => fruit.id !== Number(id));

    return res.status(httpStatus.OK).json({
        success: true,
        message: "Fruit eliminated successfully",
        deleted
    })
  } catch (error) {
    return next(error);
  }
};

export const createAndGetByKey = <const T extends readonly string[]>
  (...keys: string[]): Record<T[number], string> =>
    Object.fromEntries(keys.map(key => [key, key])) as Record<T[number], string>

const {} = createAndGetByKey('level', 'id') // CTRL + SPACE
