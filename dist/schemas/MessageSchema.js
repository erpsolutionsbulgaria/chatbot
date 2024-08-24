import mongoose, { Schema } from 'mongoose';
// Define the schema
const messageSchema = new Schema({
    _id: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
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
messageSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
// Create the model from the schema
const Post = mongoose.model('Message', messageSchema);
// Export the model
export default Post;
