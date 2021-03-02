import mongoose from 'mongoose';
//import Answers from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createAnswersQuery from '../queries/create';

export default async function answersCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createAnswersQueryResult = await createAnswersQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createAnswersQueryResult.success) {
    res.status(200).json(createAnswersQueryResult);
  } else {
    const analyticsId = analytics('ANSWERS_CREATE_ERROR', {
      error: createAnswersQueryResult.payload,
      body: req.body,
      entity: 'Answers',
      entityId: _id,
      user: userId,
      controller: 'answersCreate',
    });

    res.status(400).json(message.fail('Answers create error', analyticsId));
  }
}
