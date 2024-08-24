import mongoose, { Schema } from 'mongoose';
import IMessageObj from '../interfaces/IMessageObj'

// Define the schema
const messageSchema: Schema = new Schema({
    conversationId: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    actionTs: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Pre-save hook to update the updatedAt field
  messageSchema.pre<IMessageObj>('save', function (next) {
    this.updatedAt = new Date();
    next();
  });
  
  // Create the model from the schema
  const Message = mongoose.model<IMessageObj>('Message', messageSchema);
  
  // Export the model
  export default Message;
  