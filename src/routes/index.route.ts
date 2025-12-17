import { router as fruitRouter } from './fruits.route'
import { Router } from 'express'

export const router = Router()

router.use('/fruits', fruitRouter)
