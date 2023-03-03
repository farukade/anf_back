import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const router = Router();

router.get('/', CategoryController.get);
router.post('/', CategoryController.create);

export default router;