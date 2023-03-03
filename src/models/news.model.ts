import { Schema, model, Types } from 'mongoose';
import { INews } from '../types/news.interface';

const newsSchema = new Schema<INews>({
  subject: {
    type: String, required: true
  },
  category: {
    type: Types.ObjectId, ref: "categories", required: true
  },
  isTopStory: {
    type: Boolean, default: false
  },
  isEditorsPick: {
    type: Boolean, default: false
  },
  isFeatured: {
    type: Boolean, default: false
  },
  media: {
    type: String
  },
  content: {
    type: String, required: true
  }
});

export const News = model<INews>('news', newsSchema);