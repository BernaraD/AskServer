import Answer from '../Model';
import message from '../../utils/messages';

const answerGetByIdQuery = (answerId) => {
  return Answer.findById(answerId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Answer get by id OK', doc);
      } else {
        return message.fail('No Answer for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Answer by id ERROR', err);
    });
};

export default answerGetByIdQuery;
