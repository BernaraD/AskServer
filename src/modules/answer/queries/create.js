import mongoose from 'mongoose';
import Answers from '../Model';
import message from '../../utils/messages';

export default function createAnswersQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const answers = new Answers({
    _id,
    ...values,
  });

  return answers
    .save()
    .then(() => {
      return message.success('Answers created', _id);
    })
    .catch((err) => {
      return message.fail('Answers create error', err);
    });
}
