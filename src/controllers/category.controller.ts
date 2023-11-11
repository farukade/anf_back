import { Request, Response } from 'express';
import { ICategory } from '../interfaces/category.interface';
import { handleBadRequest, handleError, handleSuccess, prisma } from '../utils/utils';

export const CategoryController = {
  get: async (req: Request, res: Response) => {
    try {
      const { id, name } = req.query;

      if (id && id !== "") {

        const result = await prisma.categories.findFirst({
          where: { id: Number(id) }
        });

        if (result) return handleSuccess({ res, result });

        return handleBadRequest({ res, message: "category not found" });

      } else if (name && name !== "") {

        const result = await prisma.categories.findMany({
          where: {
            name: String(name)
          }
        });

        if (result.length) return handleSuccess({ res, result });

        return handleBadRequest({ res, message: "category not found" });

      } else {

        const result = await prisma.categories.findMany();

        if (result.length) return handleSuccess({ res, result, message: "category found" });

        return handleBadRequest({ res, message: "category not found" });
      };
    } catch (error) {
      handleError(res, error);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const body: ICategory = req.body;
      const { name, description, image }: ICategory = body;

      if (!name) return handleBadRequest({ res, message: "name not in params" });

      const schedule = prisma.categories.create({
        data: {
          name: name.toLowerCase(),
          description: description?.toLowerCase() || name.toLowerCase(),
          image
        }
      });

      if (schedule)
        return handleSuccess({ res, result: schedule });
      return handleBadRequest({ res, message: "unexpected error" });
    } catch (error) {
      return handleError(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || !id.length) {
        return handleBadRequest({ res, message: "no id in req params" });
      }
      const result = await prisma.categories.update({
        where: { id: Number(id) },
        data: { status: false }
      });

      if (result)
        return handleSuccess({ res });

      return handleBadRequest({ res, message: "unexpected error, delete failed" });
    } catch (error) {
      return handleError(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id, ...restData } = req.body;
      if (!id || !restData) return handleBadRequest({ res, message: "req body incomplete" });

      const result = await prisma.categories.update({
        where: { id: Number(id) },
        data: { ...restData }
      });

      if (result) return handleSuccess({ res, result });
      return handleBadRequest({ res, message: "unexpected error, modification failed" });
    } catch (error) {
      return handleError(res, error);
    }
  }
}