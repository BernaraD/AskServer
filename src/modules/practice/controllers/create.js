import mongoose from 'mongoose';
//import Practice from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createPracticeQuery from '../queries/create';

export default async function practiceCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const practice = get(req, 'body.practice');


  const createPracticeQueryResult = await createPracticeQuery({
    _id,
    practice: practice,
    owner: userId,
  });

  if (createPracticeQueryResult.success) {
    res.status(200).json(createPracticeQueryResult);
  } else {
    const analyticsId = analytics('PRACTICE_CREATE_ERROR', {
      error: createPracticeQueryResult.payload,
      body: req.body,
      entity: 'Practice',
      entityId: _id,
      user: userId,
      controller: 'practiceCreate',
    });

    res.status(400).json(message.fail('Practice create error', analyticsId));
  }
}
