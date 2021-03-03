import Answer from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const answerDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.answerId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Answer.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Answer deleted'));
      } else {
        res.status(400).json(message.fail('Answer not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('ANSWER_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Answer',
        entityId: _id,
        user: userId,
        controller: 'answerCreate',
      });

      res.status(400).json(message.fail('Answer delete error', analyticsId));
    });
};

export default answerDeleteById;
