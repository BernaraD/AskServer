import mongoose from 'mongoose';
import Answer from '../Model';
import message from '../../utils/messages';

export default function createAnswerQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const answer = new Answer({
    _id,
    ...values,
  });

  return answer
    .save()
    .then(() => {
      return message.success('Answer created', _id);
    })
    .catch((err) => {
      return message.fail('Answer create error', err);
    });
}
