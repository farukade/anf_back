import { Router } from "express";
import UserRouter from './user.route';
import CategoryRouter from './category.route';
import NewsRouter from './news.route';


const router = Router();
router.use('/users', UserRouter);
router.use('/categories', CategoryRouter);
router.use('/news', NewsRouter);

export default router;