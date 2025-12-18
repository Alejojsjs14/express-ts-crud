import {
  createFruits,
  deleteFruit,
  getFruits,
  updateFruits,
} from "#controllers/fruits";
import { validate } from "#middlewares/schema";
import { fruitSchema } from "#schemas/fruit";
import { idParamSchema } from "#schemas/params";
import { Router } from "express";

export const router = Router();

router.get("/", getFruits);
router.post("/", validate(fruitSchema), createFruits);
router.patch(
  "/:id",
  [
    validate(idParamSchema, { target: "params" }),
    validate(fruitSchema, { mode: "partial" }),
  ],
  updateFruits
);
router.delete(
  "/:id",
  validate(idParamSchema, { target: "params" }),
  deleteFruit
);
