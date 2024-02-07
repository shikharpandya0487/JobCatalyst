
// models/commentModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
        text: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        parentComment:{type:String, default:""},
        post:{type:String},
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },{ timestamps: true });


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
