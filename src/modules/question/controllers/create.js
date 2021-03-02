import mongoose from 'mongoose';
//import Question from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createQuestionQuery from '../queries/create';

export default async function questionCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createQuestionQueryResult = await createQuestionQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createQuestionQueryResult.success) {
    res.status(200).json(createQuestionQueryResult);
  } else {
    const analyticsId = analytics('QUESTION_CREATE_ERROR', {
      error: createQuestionQueryResult.payload,
      body: req.body,
      entity: 'Question',
      entityId: _id,
      user: userId,
      controller: 'questionCreate',
    });

    res.status(400).json(message.fail('Question create error', analyticsId));
  }
}
