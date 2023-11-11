import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get('/', UserController.get);
router.post('/', UserController.create);
router.post('/login', UserController.login);
router.delete('/', UserController.delete);
router.patch('/login', UserController.update);

export default router;