import { Router } from "express";
import { NewsController } from "../controllers/news.controller";
import { authorize } from "../utils/middlewares";

const router = Router();

router.get('/', NewsController.get);
router.post('/', authorize([""]), NewsController.create);
router.delete('/', authorize([""]), NewsController.delete);
router.patch('/', authorize([""]), NewsController.update);

export default router;