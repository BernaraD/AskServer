import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import questionGetByIdQuery from '../queries/getById';

export default async function questionGetById(req, res) {
  const questionId = get(req, 'params.questionId');
  const userId = get(req, 'userData.userId');

  const questionGetByIdQueryResult = await questionGetByIdQuery(questionId);

  if (questionGetByIdQueryResult.success) {
    res.status(200).json(questionGetByIdQueryResult);
  } else {
    const analyticsId = analytics('QUESTION_GET_BY_ID_ERROR', {
      error: questionGetByIdQueryResult.payload,
      body: req.body,
      entity: 'Question',
      user: userId,
      controller: 'questionGetById',
    });
    res.status(400).json(message.fail('Question get error', analyticsId));
  }
}