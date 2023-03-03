import { ObjectId } from "mongoose";

export interface INews {
  subject: string;
  category: ObjectId;
  isTopStory?: boolean;
  isEditorsPick?: boolean;
  isFeatured?: boolean;
  media?: string;
  content: string;
}