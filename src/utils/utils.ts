import { Response } from 'express';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { ToWords } from 'to-words';
import { PaginationQueryType, ResponseQueryType } from '../interfaces/query.interface';
import numeral from 'numeral';
import { logger } from './logger';
import { promisify } from 'util';
import { resolve } from 'path';
import { readFile } from 'fs';
import { compile } from 'handlebars';
import { execute } from '@getvim/execute';
import { randomBytes } from 'crypto';
import { launch } from 'puppeteer';

config();

export const prisma = new PrismaClient()
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 10;

export const generateClientId = () => randomBytes(32).toString("hex");

export const getPagination = (query: PaginationQueryType) => {
  const page = query?.page ? Math.abs(Number(query.page)) : DEFAULT_PAGE;
  const take = query?.limit ? Math.abs(Number(query.limit)) : DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * take;
  return {
    skip,
    take,
  };
};

export const getMeta = (query: PaginationQueryType, total: number) => {
  const { take } = getPagination(query);
  const page = query?.page ? Math.abs(Number(query.page)) : DEFAULT_PAGE;
  return {
    currentPage: page,
    totalItems: total,
    itemsPerPage: take,
    totalPages: Math.ceil(total / take)
  }
};

export const handleSuccess = (responseObject: ResponseQueryType) => {
  const { res, code, message, paging, result } = responseObject;
  const dataFound = result !== null || result?.length;
  return res.status(code || 200).json({
    success: dataFound ? true : false,
    message: dataFound ? (message || "Success") : message || "No data",
    paging,
    result
  });
}

export const handleBadRequest = (responseObject: ResponseQueryType) => {
  const { res, code, message, result } = responseObject;
  logger.error(message || "Unexpected error");
  return res.status(code || 400).json({
    success: false,
    message: message || "Failed",
    result
  });
}

export const handleError = (res: Response, error: any) => {
  logger.error(error?.message || "Unexpected error");
  return res.status(400).json({
    success: false,
    message: "Unexpected error"
  });
}

export const makePassword = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password;
}

export const toWords = new ToWords({
  localeCode: "en-US",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Dollar",
      plural: "Dollar",
      symbol: "$",
      fractionalUnit: {
        name: "Cent",
        plural: "Cent",
        symbol: "",
      },
    },
  },
});

export const formatCurrencyBare = (amount: number, abs: boolean = false) => {
  if (!amount) {
    return '0.00';
  }
  return `${numeral(abs ? Math.abs(amount) : amount).format('0,0.00')}`;
};

export const formatCurrency = (amount: number, abs: boolean = false) => {
  if (!amount) {
    return '₦0.0';
  }
  return `₦${numeral(abs ? Math.abs(amount) : amount).format('0,0.00')}`;
};

export const removeSpaces = (text: string) => {
  return text.split(" ").join("");
}

export const getPercentage = (num: number, perc: number) => {
  if (!num || isNaN(num)) {
    return 0;
  }
  if (isNaN(perc)) {
    return 0;
  }
  return (num / 100) * perc;
}

export const formatPhone = (num: string) => {
  if (num[0] === '+') {
    return num;
  } else if (num[0] === '2' && num[1] === '3' && num[2] === '4') {
    return `+${num}`;
  } else {
    let str = '+234';
    for (let i = 1; i < num.length; i++) {
      str += num[i];
    }
    return str;
  }
};

export const generatePDF = async (template: string, data: any) => {
  try {
    const readFileInstance = promisify(readFile);
    const filepath = resolve(
      __dirname,
      `../../views/pdf_templates/${template}.hbs`
    );
    const html = await readFileInstance(filepath, "utf-8");
    const content = compile(html)(data);

    let browser;
    const os = await execute('uname');
    switch (os) {
      case 'Linux':
        browser = await launch({
          executablePath: "/snap/bin/chromium",
          headless: "new",
          args: ['--no-sandbox'],
        });
        break;

      default:
        browser = await launch({
          headless: "new",
          args: ['--no-sandbox'],
        });
        break;
    }

    const page = await browser.newPage();
    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: data.filepath,
      format: 'a4',
      preferCSSPageSize: true,
    });
    await browser.close();
  } catch (error) {
    logger.error(error);
  }
}

export const getAllDatabaseTables = async (): Promise<string[]> => {
  try {
    const tables = await prisma.$queryRaw`
       SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `;

    const tableNames = Array.isArray(tables) ? tables.map((table) => table.table_name) : [];
    return tableNames;
  } catch (error) {
    console.error('Error fetching table names:', error);
  }
}
