import Question from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const questionGetById = (req, res) => {
  const questionId = get(req, 'params.questionId');
  const userId = get(req, 'userData.userId');

  Question.findById(questionId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    // .populate({
    //   path: 'members',
    //   select: 'name links',
    // })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Question by id ok', doc));
      } else {
        res.status(404).json(message.fail('No question for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('QUESTION_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Question',
        user: userId,
        controller: 'questionGetById',
      });

      res.status(400).json(message.fail('Question get error', analyticsId));
    });
};

export default questionGetById;
