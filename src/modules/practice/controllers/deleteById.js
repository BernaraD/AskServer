import Practice from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const practiceDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.practiceId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Practice.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Practice deleted'));
      } else {
        res.status(400).json(message.fail('Practice not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('PRACTICE_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Practice',
        entityId: _id,
        user: userId,
        controller: 'practiceCreate',
      });

      res.status(400).json(message.fail('Practice delete error', analyticsId));
    });
};

export default practiceDeleteById;
