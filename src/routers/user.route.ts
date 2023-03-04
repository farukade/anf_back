import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get('/', UserController.get);
router.post('/', UserController.create);
router.post('/login', UserController.login);

export default router;