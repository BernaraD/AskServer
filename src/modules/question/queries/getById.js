import Question from '../Model';
import message from '../../utils/messages';

const questionGetByIdQuery = (questionId) => {
  return (
    Question.findById(questionId)
      .populate({
        path: 'answer',
        select: 'name',
      })

      // .populate({
      //   path: 'answer',
      //   options: { sort: { answer: -1 } },
      // })
      .exec()
      .then((doc) => {
        if (doc) {
          return message.success('Question get by id OK', doc);
        } else {
          return message.fail('No Question for provided id');
        }
      })
      .catch((err) => {
        return message.fail('Get Question by id ERROR', err);
      })
  );
};

export default questionGetByIdQuery;
