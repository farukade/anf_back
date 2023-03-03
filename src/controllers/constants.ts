import { Response } from 'express';

export const constants = {
  handleSuccess: (res: Response, data: any, mess: string, statusCode: number, meta: any) => {
    const code = statusCode ? statusCode : 200;
    const message = mess ? mess : undefined;
    const result = data ? data : undefined;
    const paging = meta ? meta : undefined;

    return res.status(code).send({
      success: true,
      message,
      paging,
      result,
    })
  },
  handleBadRequest: (res: Response, statusCode: number, mess: string) => {
    return res.status(statusCode).send({
      success: false,
      message: mess || "bad request",
    })
  },
  handleError: (res: Response, error: any) => {
    console.log(error.message || error);
    return res.status(400).send({
      success: false,
      message: error.message || "an error occurred"
    })
  }
}