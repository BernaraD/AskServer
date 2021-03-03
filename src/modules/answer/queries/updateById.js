import Answer from '../Model';
import message from '../../utils/messages';

const answerUpdateByIdQuery = ({ answerId, values }) => {
  return Answer.updateOne({ _id: answerId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Answer updated');
      } else {
        return message.fail('Answer not found');
      }
    })
    .catch((error) => {
      return message.fail('Answer update error', error);
    });
};

export default answerUpdateByIdQuery;
