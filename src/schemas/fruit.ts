import { z } from "zod";

export const fruitSchema = z.object({
  nombre: z.string().min(3),
  precio: z.number().positive(),
  stock: z.number().positive().min(1).default(1),
  origen: z.string(),
  imagen: z.url(),
}).strict();

export type Fruit = z.infer<typeof fruitSchema>;
