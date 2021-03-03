import Answer from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function answerUpdateById(req, res) {
  const answerId = get(req, 'params.answerId');
  const userId = get(req, 'userData.userId');

  Answer.updateOne({ _id: answerId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Answer updated'));
      } else {
        res.status(400).json(message.fail('Answer not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ANSWER_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Answer',
        entityId: answerId,
        user: userId,
        controller: 'answerUpdateById',
      });

      res.status(400).json(message.fail('Answer update error', analyticsId));
    });
}
