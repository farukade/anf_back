import { Router } from "express";
import NewsController from "../controllers/news.controller";

const router = Router();

router.get('/', NewsController.get);
router.post('/', NewsController.create);
router.delete('/', NewsController.delete);
router.patch('/', NewsController.update);

export default router;