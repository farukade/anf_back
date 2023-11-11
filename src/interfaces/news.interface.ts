import { ObjectId } from "mongoose";

export interface INews {
  subject: string;
  categoryId: number;
  isTopStory?: boolean;
  isEditorsPick?: boolean;
  isFeatured?: boolean;
  media?: string;
  content: string;
}