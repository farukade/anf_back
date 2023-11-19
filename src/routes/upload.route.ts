import { Response, Request, Router } from "express";
import { authorize, upload } from "../utils/middlewares";
import { handleBadRequest, handleError, handleSuccess } from "../utils/utils";
import { config } from 'dotenv';
config();

const serverDomain = process.env.SERVER_DOMAIN;
const uploadRouter = Router();

uploadRouter.post("/", authorize([""]), upload, (req: Request, res: Response) => {
  try {
    const files = req.files;

    if (files && files[0]?.filename) {
      return handleSuccess({ res, result: { url: `${serverDomain}/uploads/${files[0]?.filename}` } });
    } else {
      return handleBadRequest({ res, message: "Error: File | file name not found!" });
    }
  } catch (error) {
    return handleError(res, error);
  }
})

export default uploadRouter;