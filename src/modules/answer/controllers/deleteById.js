import Answers from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const answersDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.answersId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Answers.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Answers deleted'));
      } else {
        res.status(400).json(message.fail('Answers not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('ANSWERS_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Answers',
        entityId: _id,
        user: userId,
        controller: 'answersCreate',
      });

      res.status(400).json(message.fail('Answers delete error', analyticsId));
    });
};

export default answersDeleteById;
