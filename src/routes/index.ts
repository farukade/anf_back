import { Router } from "express";
import UserRouter from './user.route';
import CategoryRouter from './category.route';
import NewsRouter from './news.route';
import UploadRouter from './upload.route';


const router = Router();
router.use('/users', UserRouter);
router.use('/categories', CategoryRouter);
router.use('/news', NewsRouter);
router.use('/upload', UploadRouter);

export default router;