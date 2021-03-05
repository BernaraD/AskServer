import Practice from '../Model';
import message from '../../utils/messages';

const practiceUpdateByIdQuery = ({ practiceId, values }) => {
  return Practice.updateOne({ _id: practiceId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Practice updated');
      } else {
        return message.fail('Practice not found');
      }
    })
    .catch((error) => {
      return message.fail('Practice update error', error);
    });
};

export default practiceUpdateByIdQuery;
