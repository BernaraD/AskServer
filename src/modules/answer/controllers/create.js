import mongoose from 'mongoose';
//import Answer from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createAnswerQuery from '../queries/create';

export default async function answerCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createAnswerQueryResult = await createAnswerQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createAnswerQueryResult.success) {
    res.status(200).json(createAnswerQueryResult);
  } else {
    const analyticsId = analytics('ANSWER_CREATE_ERROR', {
      error: createAnswerQueryResult.payload,
      body: req.body,
      entity: 'Answer',
      entityId: _id,
      user: userId,
      controller: 'answerCreate',
    });

    res.status(400).json(message.fail('Answer create error', analyticsId));
  }
}
