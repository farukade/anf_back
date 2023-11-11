import { Response } from "express"

export interface PaginationQueryType {
  page?: string | undefined,
  limit?: string | undefined,
}

export interface ResponseQueryType {
  res: Response,
  code?: number | undefined,
  message?: string | undefined,
  result?: any | undefined,
  paging?: any | undefined
}

export interface RequestQueryType {
  id?: string | undefined,
  query?: string | undefined,
  status?: string | undefined,
  key?: string | undefined,
  prod?: string | undefined,
}


