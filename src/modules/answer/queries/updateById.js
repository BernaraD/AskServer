import Answers from '../Model';
import message from '../../utils/messages';

const answersUpdateByIdQuery = ({ answersId, values }) => {
  return Answers.updateOne({ _id: answersId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Answers updated');
      } else {
        return message.fail('Answers not found');
      }
    })
    .catch((error) => {
      return message.fail('Answers update error', error);
    });
};

export default answersUpdateByIdQuery;
