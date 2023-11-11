import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get('/', CategoryController.get);
router.post('/', CategoryController.create);
router.delete('/', CategoryController.delete);
router.patch('/', CategoryController.update);

export default router;