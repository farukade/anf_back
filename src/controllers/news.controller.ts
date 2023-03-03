import { Request, Response } from 'express';
import { News } from '../models/news.model';
import { INews } from '../types/news.interface';
import { constants } from './constants';
const { handleError, handleBadRequest, handleSuccess } = constants;

const NewsController = {
  get: async (req: Request, res: Response) => {
    try {
      const { id, categoryId, topStory, featured, editorsPick } = req.query;

      if (id && id !== "") {
        const result = await News.findById(id);
        if (result) return handleSuccess(res, result, "content found", 200, null);
        return handleBadRequest(res, 400, "content not found");
      } else if (categoryId && categoryId !== "") {
        const result = await News.find({ category: categoryId });
        if (result.length) return handleSuccess(res, result, "contents found", 200, null);
        return handleBadRequest(res, 400, "contents not found");
      } else if ((topStory && topStory !== "") || (featured && featured !== "") || (editorsPick && editorsPick !== "")) {
        const isTopStory = topStory === "1" ? true : undefined;
        const isFeatured = featured === "1" ? true : undefined;
        const isEditorsPick = editorsPick === "1" ? true : undefined;
        console.log(isTopStory, isEditorsPick, isFeatured);
        const result = await News.find({
          isTopStory,
          isFeatured,
          isEditorsPick
        });
        if (result.length) return handleSuccess(res, result, "contents found", 200, null);
        return handleBadRequest(res, 400, "contents not found");
      } else {
        const result = await News.find();
        if (result.length) return handleSuccess(res, result, "contents found", 200, null);
        return handleBadRequest(res, 400, "contents not found");
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const body: INews = req.body;
      const { subject, content, media, ...restBody }: INews = body;

      if (!subject || subject === "") return handleBadRequest(res, 400, "subject not in body");
      if (!content || content === "") return handleBadRequest(res, 400, "content not in body");
      if (!media || media === "") return handleBadRequest(res, 400, "media not in body");

      const news = new News({
        subject,
        content,
        media,
        ...restBody
      });
      await news.save();
      if (news)
        return handleSuccess(res, news, "news created", 201, null);
      return handleBadRequest(res, 500, "unexpected error");
    } catch (error) {
      return handleError(res, error);
    }
  },
}

export default NewsController;