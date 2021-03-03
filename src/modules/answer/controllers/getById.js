import Answer from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const answerGetById = (req, res) => {
  const answerId = get(req, 'params.answerId');
  const userId = get(req, 'userData.userId');

  Answer.findById(answerId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    .populate({
      path: 'members',
      select: 'name links',
    })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Answer by id ok', doc));
      } else {
        res.status(404).json(message.fail('No answer for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ANSWER_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Answer',
        user: userId,
        controller: 'answerGetById',
      });

      res.status(400).json(message.fail('Answer get error', analyticsId));
    });
};

export default answerGetById;
