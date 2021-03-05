import Practice from '../Model';
import message from '../../utils/messages';

const practiceGetByIdQuery = (practiceId) => {
  return Practice.findById(practiceId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Practice get by id OK', doc);
      } else {
        return message.fail('No Practice for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Practice by id ERROR', err);
    });
};

export default practiceGetByIdQuery;
