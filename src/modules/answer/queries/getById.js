import Answers from '../Model';
import message from '../../utils/messages';

const answersGetByIdQuery = (answersId) => {
  return Answers.findById(answersId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Answers get by id OK', doc);
      } else {
        return message.fail('No Answers for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Answers by id ERROR', err);
    });
};

export default answersGetByIdQuery;
