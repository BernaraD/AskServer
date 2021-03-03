import Question from '../Model';
import message from '../../utils/messages';

export default function deleteQuestionByIdQuery(questionId) {
  return Question.deleteOne({ _id: questionId })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Question deleted', questionId);
      } else {
        return message.fail('Question not found', questionId);
      }
    })
    .catch((error) => {
      return message.fail('Question delete error', error);
    });
}
