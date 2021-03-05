import mongoose from 'mongoose';
import Practice from '../Model';
import message from '../../utils/messages';

export default function createPracticeQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const practice = new Practice({
    _id,
    ...values,
  });

  return practice
    .save()
    .then(() => {
      return message.success('Practice created', _id);
    })
    .catch((err) => {
      return message.fail('Practice create error', err);
    });
}
