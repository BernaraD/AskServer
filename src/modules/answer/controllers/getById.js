import Answers from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const answersGetById = (req, res) => {
  const answersId = get(req, 'params.answersId');
  const userId = get(req, 'userData.userId');

  Answers.findById(answersId)
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
        res.status(200).json(message.success('Get Answers by id ok', doc));
      } else {
        res.status(404).json(message.fail('No answers for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ANSWERS_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Answers',
        user: userId,
        controller: 'answersGetById',
      });

      res.status(400).json(message.fail('Answers get error', analyticsId));
    });
};

export default answersGetById;
