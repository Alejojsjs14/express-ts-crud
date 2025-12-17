import fruits from '#jsons/fruits.json' with { type: "json" }
import httpStatus from 'http-status'
import { RequestHandler } from 'express'

export const getFruits : RequestHandler = (_req, res, next) => {
    try {
        return res.status(httpStatus.OK).json({
            message: "Fruits retrieved successfully",
            success: true,
            fruits
        })
    } catch (error) {
        return next(error)
    }
}