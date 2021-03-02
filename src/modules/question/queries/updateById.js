import Question from '../Model';
import message from '../../utils/messages';

const questionUpdateByIdQuery = ({ questionId, values }) => {
  return Question.updateOne({ _id: questionId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Question updated');
      } else {
        return message.fail('Question not found');
      }
    })
    .catch((error) => {
      return message.fail('Question update error', error);
    });
};

export default questionUpdateByIdQuery;
