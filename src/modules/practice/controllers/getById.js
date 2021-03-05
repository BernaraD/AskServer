import Practice from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const practiceGetById = (req, res) => {
  const practiceId = get(req, 'params.practiceId');
  const userId = get(req, 'userData.userId');

  Practice.findById(practiceId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    .populate({
      path: 'practice',
      select: 'practice',
    })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Practice by id ok', doc));
      } else {
        res.status(404).json(message.fail('No practice for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('PRACTICE_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Practice',
        user: userId,
        controller: 'practiceGetById',
      });

      res.status(400).json(message.fail('Practice get error', analyticsId));
    });
};

export default practiceGetById;
