import { getFruits } from '#controllers/fruits'
import { Router } from 'express'

export const router = Router()

router.get('/', getFruits)
