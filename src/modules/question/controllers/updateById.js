import Question from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function questionUpdateById(req, res) {
  const questionId = get(req, 'params.questionId');
  const userId = get(req, 'userData.userId');

  Question.updateOne({ _id: questionId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Question updated'));
      } else {
        res.status(400).json(message.fail('Question not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('QUESTION_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Question',
        entityId: questionId,
        user: userId,
        controller: 'questionUpdateById',
      });

      res.status(400).json(message.fail('Question update error', analyticsId));
    });
}
