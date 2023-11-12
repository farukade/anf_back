import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authorize } from "../utils/middlewares";

const router = Router();

router.get('/', authorize([""]), UserController.get);
router.post('/', authorize([""]), UserController.create);
router.post('/login', UserController.login);
router.post('/verify/login', authorize([""]), UserController.verifyToken);
router.delete('/', authorize([""]), UserController.delete);
router.patch('/', UserController.update);

export default router;