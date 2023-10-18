const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

commentSchema.set('toJSON', {
  transform: (docs, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

commentSchema.plugin(uniqueValidator);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
