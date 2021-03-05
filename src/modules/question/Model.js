import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: false,
    },

    telephone: {
      type: String,
      required: false,
    },

    notes: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },

    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
      required: false,
    },

    practice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Practice',
      required: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    resolved: {
      type: Boolean,
      required: false,
    },
    // tags: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tags',
    //     required: false,
    //   },
    // ],
  },
  { timestamps: {}, versionKey: false },
);

export default mongoose.model('Question', Schema);
