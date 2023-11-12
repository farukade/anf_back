import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authorize } from "../utils/middlewares";

const router = Router();

router.get('/', authorize([""]), CategoryController.get);
router.post('/', authorize([""]), CategoryController.create);
router.delete('/', authorize([""]), CategoryController.delete);
router.patch('/', authorize([""]), CategoryController.update);

export default router;