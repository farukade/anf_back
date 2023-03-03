import { Router } from "express";
import NewsController from "../controllers/news.controller";

const router = Router();

router.get('/', NewsController.get);
router.post('/', NewsController.create);

export default router;