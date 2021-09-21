import mongoose from 'mongoose';
// import { String } from 'prop-types';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name:String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;