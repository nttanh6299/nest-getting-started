import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
  })
  .required();

export type CreateCatDto = Required<z.infer<typeof createCatSchema>>;

export interface UpdateCatDto {
  name: string;
  age: number;
}

export interface ListAllEntities {
  page: number;
  size: number;
}
