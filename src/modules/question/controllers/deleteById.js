import Question from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const questionDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.questionId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Question.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Question deleted'));
      } else {
        res.status(400).json(message.fail('Question not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('QUESTION_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Question',
        entityId: _id,
        user: userId,
        controller: 'questionCreate',
      });

      res.status(400).json(message.fail('Question delete error', analyticsId));
    });
};

export default questionDeleteById;
