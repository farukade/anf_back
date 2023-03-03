import { Request, Response } from 'express';
import { Category } from '../models/category.model';
import { ICategory } from '../types/category.interface';
import { constants } from './constants';
const { handleError, handleBadRequest, handleSuccess } = constants;

const CategoryComtroller = {
  get: async (req: Request, res: Response) => {
    try {
      const { id, name } = req.query;

      if (id && id !== "") {
        const result = await Category.findById(id);
        if (result) return handleSuccess(res, result, "category found", 200, null);
        return handleBadRequest(res, 400, "category not found");
      } else if (name && name !== "") {
        const result = await Category.find({ name });
        if (result.length) return handleSuccess(res, result, "category found", 200, null);
        return handleBadRequest(res, 400, "category not found");
      } else {
        const result = await Category.find();
        if (result.length) return handleSuccess(res, result, "category found", 200, null);
        return handleBadRequest(res, 400, "category not found");
      };
    } catch (error) {
      handleError(res, error);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const body: ICategory = req.body;
      const { name, description, image }: ICategory = body;

      const schedule = new Category({
        name: name.toLowerCase(),
        description: description?.toLowerCase(),
        image
      });
      await schedule.save();
      if (schedule)
        return handleSuccess(res, schedule, "schedule created", 201, null);
      return handleBadRequest(res, 500, "unexpected error");
    } catch (error) {
      return handleError(res, error);
    }
  },
}

export default CategoryComtroller;