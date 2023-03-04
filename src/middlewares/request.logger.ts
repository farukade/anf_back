import { Request, Response } from 'express';

export const requsetLogger = (req: Request, res: Response, next: Function) => {
  const { method, originalUrl: url, ip, protocol } = req;

  res.on('finish', () => {
    const { statusCode } = res;
    let message = `${method} ${url} ${statusCode} - ${protocol} ${ip}`
    console.log(`\x1b[32m ${message} \x1b[0m`)
  });

  next();
}

export const logger = (color: string, message: any, bg = 'default') => {
  let textColor: string | undefined;
  let backgroundColor;

  switch (color) {
    case 'black': textColor = "\x1b[30m";
    case 'green': textColor = "\x1b[32m";
    case 'red': textColor = "\x1b[31m";
    case 'yellow': textColor = "\x1b[33m";
    case 'blue': textColor = "\x1b[34m";
    case 'magenta': textColor = "\x1b[30m";
    case 'cyan': textColor = "\x1b[36m";
    case 'white': textColor = "\x1b[37m";
    case 'gray': textColor = "\x1b[90m";
    case 'scarlet': textColor = "\x1b[38m";
  }

  switch (bg) {
    case 'black': backgroundColor = "\x1b[40m";
    case 'red': backgroundColor = "\x1b[41m";
    case 'green': backgroundColor = "\x1b[42m";
    case 'yellow': backgroundColor = "\x1b[43m";
    case 'blue': backgroundColor = "\x1b[44m";
    case 'magenta': backgroundColor = "\x1b[45m";
    case 'cyan': backgroundColor = "\x1b[46m";
    case 'white': backgroundColor = "\x1b[37m";
    case 'gray': backgroundColor = "\x1b[100m";
    case 'scarlet': backgroundColor = "\x1b[48m";
    case 'default': backgroundColor = "\x1b[0m";
  }
  console.log(`${textColor || "\x1b[0m"} ${message} \x1b[0m`);
}