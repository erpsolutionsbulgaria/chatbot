
import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a document in MongoDB.
export default interface IMessageObj extends Document {
  conversationId: string;
  role: string;
  message: string;
  actionTs: Date;
  createdAt: Date;
  updatedAt: Date;
}