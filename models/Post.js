import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    link: {type: String, required: true},
    images: [{type: String}],
    category: {type: mongoose.Types.ObjectId, ref: 'Category'}
});

export const Post = models.Post || model('Post', PostSchema)