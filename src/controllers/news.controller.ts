import { Request, Response } from 'express';
import { INews } from '../interfaces/news.interface';
import { getMeta, getPagination, handleBadRequest, handleError, handleSuccess, prisma } from '../utils/utils';

export const NewsController = {
  get: async (req: Request, res: Response) => {
    try {
      const { id, categoryId, topStory, featured, editorsPick } = req.query;
      const { take, skip } = getPagination(req.query);

      if (id && id !== "") {

        const result = await prisma.news.findUnique({
          where: { id: Number(id) },
          include: {
            category: true
          }
        });

        if (result)
          return handleSuccess({ res, result });

        return handleBadRequest({ res, message: "content not found" });
      } else if (categoryId && categoryId !== "") {

        const result = await prisma.news.findMany({
          where: {
            categoryId: Number(categoryId)
          },
          include: {
            category: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take,
          skip
        });

        const aggregation = await prisma.news.aggregate({
          _count: {
            id: true
          },
          where: {
            categoryId: Number(categoryId)
          },
        });

        const paging = getMeta(req.query, aggregation._count.id);
        if (result.length)
          return handleSuccess({ res, result, paging });
        return handleBadRequest({ res, message: "contents not found" });

      } else if (
        (topStory && topStory !== "") ||
        (featured && featured !== "") ||
        (editorsPick && editorsPick !== "")
      ) {

        let query: any = {};

        const isTopStory = topStory === "1" ? true : undefined;
        const isFeatured = featured === "1" ? true : undefined;
        const isEditorsPick = editorsPick === "1" ? true : undefined;

        if (isTopStory) {
          query.isTopStory = true;
        }
        if (isEditorsPick) {
          query.isEditorsPick = true;
        }
        if (isFeatured) {
          query.isFeatured = true;
        }

        const result = await prisma.news.findMany({
          where: query,
          include: {
            category: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip,
          take
        });

        const aggregation = await prisma.news.aggregate({
          _count: {
            id: true
          },
          where: query,
        });

        const paging = getMeta(req.query, aggregation._count.id);
        if (result.length)
          return handleSuccess({ res, result, paging });

        return handleBadRequest({ res, message: "contents not found" });
      } else {
        const result = await prisma.news.findMany({
          include: {
            category: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take,
          skip
        });

        const aggregation = await prisma.news.aggregate({
          _count: {
            id: true
          },
        });

        const paging = getMeta(req.query, aggregation._count.id);

        if (result.length)
          return handleSuccess({ res, result, paging });
        return handleBadRequest({ res, message: "contents not found" });
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const body: INews = req.body;
      const { subject, content, media, ...restBody }: INews = body;

      if (!subject || subject === "")
        return handleBadRequest({ res, message: "subject not in body" });

      if (!content || content === "")
        return handleBadRequest({ res, message: "content not in body" });

      if (!media || media === "")
        return handleBadRequest({ res, message: "media not in body" });

      const result = await prisma.news.create({
        data: {
          subject,
          content,
          media,
          ...restBody
        }
      });

      if (result)
        return handleSuccess({ res, result });

      return handleBadRequest({ res, message: "unexpected error" });
    } catch (error) {
      return handleError(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || !id.length)
        return handleBadRequest({ res, message: "no id in req params" });

      const result = await prisma.news.update({
        where: { id: Number(id) },
        data: { status: true }
      });

      if (result)
        return handleSuccess({ res });

      handleBadRequest({ res, message: "unexpected error, delete failed" });
    } catch (error) {
      return handleError(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id, ...restData } = req.body;

      if (!id || !restData)
        return handleBadRequest({ res, message: "req body incomplete" });

      const result = await prisma.news.update({
        where: { id: id },
        data: restData
      });

      if (result)
        return handleSuccess({ res, result });
      handleBadRequest({ res, message: "unexpected error, modification failed" });
    } catch (error) {
      handleError(res, error);
    }
  }
}