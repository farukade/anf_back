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

      if (!name) return handleBadRequest(res, 400, "name not in params");

      const schedule = new Category({
        name: name.toLowerCase(),
        description: description?.toLowerCase() || name.toLowerCase(),
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
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      if (!id || !id.length) {
        return handleBadRequest(res, 400, "no id in req params");
      }
      const result = await Category.deleteOne({ _id: id });
      if (result.deletedCount) return handleSuccess(res, undefined, result.deletedCount + " category deleted", 200, undefined);
      handleBadRequest(res, 400, "unexpected error, delete failed");
    } catch (error) {
      return handleError(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id, ...restData } = req.body;
      if (!id || !restData) return handleBadRequest(res, 400, "req body incomplete");

      const result = await Category.updateOne({ _id: id }, restData);
      if (result.modifiedCount) return handleSuccess(res, undefined, result.modifiedCount + " category modified", 200, undefined);
      handleBadRequest(res, 400, "unexpected error, modification failed");
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default CategoryComtroller;