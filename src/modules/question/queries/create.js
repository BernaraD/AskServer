import mongoose from 'mongoose';
import Question from '../Model';
import message from '../../utils/messages';

export default function createQuestionQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const question = new Question({
    _id,
    ...values,
  });

  return question
    .save()
    .then(() => {
      return message.success('Question created', _id);
    })
    .catch((err) => {
      return message.fail('Question create error', err);
    });
}
